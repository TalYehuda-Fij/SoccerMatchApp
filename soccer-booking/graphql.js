const { ApolloServer, gql } = require('apollo-server-express');
const pool = require('./db');

// Define type definitions
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    skill_level: Int!
  }

  type Match {
    id: ID!
    date: String!
    time: String!
    location: String!
    users: [User]
  }

  type Booking {
    id: ID!
    user_id: Int!
    match_id: Int!
    status: String!
  }

  type Query {
    users: [User]
    matches: [Match]
    bookings: [Booking]
    matchUsers(match_id: Int!): Match
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String!, skill_level: Int): User
    createMatch(date: String!, time: String!, location: String!): Match
    createBooking(user_id: Int!, match_id: Int!, status: String!): Booking
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    users: async () => {
      const result = await pool.query('SELECT * FROM users');
      return result.rows;
    },
    matches: async () => {
      const result = await pool.query('SELECT * FROM matches');
      return result.rows;
    },
    bookings: async () => {
      const result = await pool.query('SELECT * FROM bookings');
      return result.rows;
    },
    matchUsers: async (_, { match_id }) => {
      const matchResult = await pool.query(
        'SELECT * FROM matches WHERE id = $1',
        [match_id]
      );
      const match = matchResult.rows[0];

      if (!match) {
        throw new Error('Match not found');
      }

      const usersResult = await pool.query(
        `SELECT users.id, users.username, users.email, users.skill_level
         FROM users
         JOIN bookings ON users.id = bookings.user_id
         WHERE bookings.match_id = $1`,
        [match_id]
      );

      match.users = usersResult.rows;
      return match;
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password, role, skill_level }) => {
      const result = await pool.query(
        'INSERT INTO users (username, email, password, role, skill_level) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, email, password, role, skill_level || 0]
      );
      return result.rows[0];
    },
    createMatch: async (_, { date, time, location }) => {
      const result = await pool.query(
        'INSERT INTO matches (date, time, location) VALUES ($1, $2, $3) RETURNING *',
        [date, time, location]
      );
      return result.rows[0];
    },
    createBooking: async (_, { user_id, match_id, status }) => {
      // Check if the user is already booked for the match
      const existingBookingResult = await pool.query(
        'SELECT * FROM bookings WHERE user_id = $1 AND match_id = $2',
        [user_id, match_id]
      );

      if (existingBookingResult.rows.length > 0) {
        throw new Error('User is already booked for this match');
      }

      // Check the current number of bookings for the match
      const bookingCountResult = await pool.query(
        'SELECT COUNT(*) FROM bookings WHERE match_id = $1',
        [match_id]
      );
      const bookingCount = parseInt(bookingCountResult.rows[0].count, 10);

      if (bookingCount >= 18) {
        throw new Error('Maximum number of players for this match has been reached');
      }

      const result = await pool.query(
        'INSERT INTO bookings (user_id, match_id, status) VALUES ($1, $2, $3) RETURNING *',
        [user_id, match_id, status]
      );
      return result.rows[0];
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
