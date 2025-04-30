# React.js User Management Application

Overview
This is a responsive React.js application built with TypeScript that allows users to authenticate, view a list of users, and see detailed user information. The application leverages Redux Toolkit for efficient state management and includes unit testing to ensure code reliability.
________________________________________
🔐 Features
•	User Authentication:
Secure login screen where users must authenticate to access the app.
•	User List Page:
After logging in, users are redirected to a dynamic list displaying all users.
•	User Detail View:
Clicking on a user from the list navigates to a detailed view showing:
o	Full Name
o	Email Address
o	Phone Number
•	Email Interaction:
Clicking on the email address opens the default email client with a new message window (via mailto: link).
________________________________________
🧠 Tech Stack
•	React.js with TypeScript
•	Redux Toolkit – for centralized and scalable state management
•	React Router – for page navigation
•	Jest + React Testing Library – for unit testing components and logic
•	CSS Modules / Styled Components / Tailwind CSS (based on your design choice) – for responsive UI
•	Axios or Fetch API – for data fetching (optional)


📱 Responsive Design
The entire application is built with responsiveness in mind:
•	Mobile-first layout
•	Adaptive grid for user list
•	Smooth transitions between pages and views



🧪 Testing
•	Components and Redux slices are covered with unit tests
•	Testing utilities:
o	Jest for unit tests
o	React Testing Library for component rendering and behavior testing
•	Coverage includes:
o	Login logic
o	User list rendering
o	Detail view interaction (e.g., email click behavior)
________________________________________
🔧 Optional Enhancements
•	Role-based access control (e.g., admin vs regular user)
•	Search/filter functionality in the user list
•	Toast notifications for login status and errors

1. Get User List
Endpoint:
bash
Copy
Edit
GET /users
Example:
bash
Copy
Edit
GET https://gorest.co.in/public/v2/users
Response:
json
Copy
Edit
[
  {
    "id": 1234,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "gender": "male",
    "status": "active"
  },


2. Get User Details
Endpoint:
bash
Copy
Edit
GET /users/:id
Example:
bash
Copy
Edit
GET https://gorest.co.in/public/v2/users/1234
Response:
json
Copy
Edit
{
  "id": 1234,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "gender": "male",
  "status": "active"
}

  ...
]



