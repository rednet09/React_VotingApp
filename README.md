# Voting Application

This project is a simple voting application with the following features:

1. **Login Page**: Allows users to log in.
2. **Register Page**: Allows new users to register.
3. **Voting Page**:
   - Accessible only after user login.
   - Users can select one candidate and vote.
   - Users cannot vote multiple times.
   - If a user has already voted, a message appears: “You already voted.”
   - Users can log out, and the session should expire.
4. **Admin Home Page**:
   - Accessible only after admin login.
   - Displays the vote count for each candidate.
   - Admin can log out.

## Features

- User authentication (login/register).
- Voting system with vote tracking.
- Session management to prevent multiple votes.
- Admin page to monitor vote counts.

## Technologies Used

- React for the frontend.
- Tailwind CSS for styling.
- Local Storage to Store Data
- In-memory data storage for simplicity (you can switch to a database like MongoDB or PostgreSQL as needed).

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rednet09/voting-app.git
   cd voting-app
   ```
