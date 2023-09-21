# BCard - Business Card Directory App

BCard is a web application built with React that allows users to discover and list various businesses and services. Users can view business cards, mark their favorites, and more.

## Features

- Browse and search for different businesses and services.
- View detailed information about each business card.
- Mark favorite business cards.
- Users can register, log in, and manage their profile.
- Admin users have additional privileges.

## Installation

1. Clone the repository: `git clone https://github.com/noamkux/bcard`
2. Navigate to the project directory: `cd BCard`
3. Install dependencies: `npm install`

## Environment Variables

Before running the project, you need to set up your environment variables. Create a `.env` file in the root directory of the project and add the following lines:

REACT_APP_API=http://localhost:8000,

REACT_APP_GOOGLE_API_KEY=


## Usage

1. Start the local JSON server (assuming it's running on port 8000).
2. Start the React development server: `npm start`
3. Open your browser and go to `http://localhost:3000` to use the app.
4. Login with the Email : test@test.com and password : test1234

## Dependencies

- React and React Router for building the user interface.
- Axios for making API requests.
- Framer Motion for animations.
- React Google Maps API for displaying maps.
- React Toastify for displaying notifications.
- Bootstrap-React and Bootstrap for styling the web page.

## Styling

Styling is primarily done using Bootstrap and custom styles in `App.css`. Dark mode is managed by the class name `.dark`.

## Admin Privileges

Admin users have additional privileges:
- **Delete Cards**: Admin users can delete business cards from the directory.
- **Delete Users**: Admin users can delete other user accounts from the system.
- **Change User Roles**: Admin users can change the roles of other users, granting them admin or regular user privileges.

Please note that admin users cannot delete themselves.

## Project Structure

- `src/` contains the main source code.
  - `components/` contains all React components.
  - `interfaces/` contains TypeScript interfaces used in the project.
  - `services/` contains API service functions for user and card data.
  - `App.tsx` is the main application component.
  - `index.tsx` is the entry point of the application.

## Contributing

Contributions are welcome! If you find a bug or have an improvement idea, please open an issue or submit a pull request.

## Authors

Noam Kux

