Community Soccer Match Booking System

Overview:

This project started with the aim to find a nice and easy way for players to sign up for community soccer matches and to provide a solution for creating balanced teams. The application allows users to sign up for matches, and admins to manage users, matches, and bookings. It includes a feature to divide players into balanced teams based on their skill levels.

Technologies Used:
 - Backend: Node.js with Express, Apollo Server for GraphQL
 - Frontend: React
 - Database: PostgreSQL running in a Docker container
 - Other: JWT for authentication, bcrypt for password hashing, Redis for caching
Features

User Management:
 - Registration and Login: Users can sign up and log in to the system.
 - Role Management: Different roles for users (admin and player).
 - Password Hashing: Secure password storage using bcrypt.
 - JWT Authentication: Secure endpoints using JWT tokens.
 - Swagger Documentation: Comprehensive API documentation.


Match Management:
 - CRUD Operations: Create, read, update, and delete matches.
 - Booking System: Users can sign up for matches.
 - Constraints: Limit of 18 players per match and prevent duplicate bookings.


Team Assignment:
 - Balanced Teams: Automatically divide players into 3 balanced teams based on skill levels.
 - GraphQL Query: Fetch the teams using the divideTeams query.


Admin Panel:
 - User Management: Admins can manage user accounts.
 - Match Management: Admins can manage matches.
 - Booking Management: Admins can manage bookings.


Frontend:
 - React-based UI: Modern and responsive user interface.
 - Pagination and Filtering: Efficient data handling.
 - Error Handling: Proper loading and error states.


Contributing:
 - Contributions are welcome! Please open an issue or submit a pull request with your changes.
