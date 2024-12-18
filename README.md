# Wanderlust Listings

## Overview
Wanderlust Listings is a web application built with Node.js, Express, and MongoDB that allows users to view, create, edit, and delete real estate listings. The application uses a simple schema to store properties and offers features for managing and viewing listings.

## Features
- **View all listings**: Browse through available properties with details such as title, description, price, location, and an image.
- **Add new listings**: Create new property listings by filling out a form.
- **Edit existing listings**: Update details of an existing listing.
- **Delete listings**: Remove listings from the application.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing listings data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **EJS**: Templating engine for rendering dynamic HTML views.
- **method-override**: Middleware for supporting HTTP methods such as PUT and DELETE in places where they are not supported by default.

## Getting Started

### Prerequisites
- Node.js and npm installed on your local machine.
- MongoDB up and running on your local machine or a MongoDB cloud instance.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ashokpaudelapril/wanderlust-listings.git
    cd wanderlust-listings
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up the MongoDB connection: Open the `app.js` file and update the `MONGO_URL` variable to point to your MongoDB database URL.

4. Start the application:
    ```bash
    npm start
    ```
5. Access the application: Open your web browser and go to `http://localhost:8080`.

## Usage
- **Home Page**: Displays a welcome message.
- **View Listings**: Navigate to `/listing` to view all available properties.
- **Add New Listing**: Navigate to `/listing/new` to add a new property listing.
- **Edit Listing**: Click on a listing to view its details and edit it.
- **Delete Listing**: Click the delete button on a listing's details page to remove it from the database.

## Development
- The project uses EJS for views, allowing you to easily modify the appearance and layout of the application.
- The method-override middleware supports PUT and DELETE requests to manipulate listings.

## Issues and Contributions
- If you encounter any issues or bugs, feel free to open an issue on the project's GitHub page.
- Contributions are welcome! Fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

