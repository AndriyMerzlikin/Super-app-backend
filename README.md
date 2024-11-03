
# Hero API

This project is a simple API for managing heroes, built using Node.js, Express, and MongoDB. It allows for creating, reading, updating, and deleting hero profiles, including uploading and managing hero images. The images are stored locally in the `uploads` directory.

## Prerequisites

To run this project, you'll need to have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) or access to a MongoDB Atlas account
- [npm](https://www.npmjs.com/get-npm) (should be included with Node.js)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

- `git clone <repository-url>`
- `cd <repository-directory> `
### 2. Install Dependencies
- Install all required dependencies:

`npm install`
### 3. Set Up Environment Variables
- Create a `.env` file in the project root and add the following variables:

`PORT=3334
MONGO_URI=your_mongodb_connection_string`
- Replace your_mongodb_connection_string with your actual MongoDB URI. This can be either a local MongoDB URI (e.g., mongodb://localhost:27017/heroesdb) or a MongoDB Atlas connection string.

### 4. Create uploads Directory
#### Ensure there is an uploads directory in the root of the project. This directory is where all uploaded hero images will be stored.

If the directory does not exist, the code will automatically create it when uploading a file.

### 5. Run the Server
Start the server by running:

`npm run dev`
- The server should now be running on the specified PORT (default is 3334). You can verify by visiting http://localhost:3334 in your browser.

### 6. Test the API

You can test the following API endpoints using a tool like Postman or curl:

- **GET** `/api/hero`
    - Retrieve all heroes.

- **GET** `/api/hero/:id`
    - Retrieve a hero by ID.

- **POST** `/api/hero`
    - Add a new hero (including image upload).

- **PUT** `/api/hero/:id`
    - Replace an existing hero by ID (supports multiple image uploads).

- **PATCH** `/api/hero/:id`
    - Update specific hero fields.

- **DELETE** `/api/hero/:id`
    - Delete a hero by ID.

#### Example Postman Requests

**Creating a New Hero:**

- Use **POST** request on `http://localhost:3334/api/hero`.
- Set the body type to **form-data** and include the following fields:
    - `nickname`
    - `real_name`
    - `origin_description`
    - `superpowers`
    - `catch_phrase`

- **Image (optional)**:
    - Key: `images`
    - Value: [upload image file]

---

**Updating an Existing Hero's Images:**

- Use **PUT** request on `http://localhost:3334/api/hero/:id`.
- Set the body type to **form-data** and include any text fields you want to update.

- **Image (optional)**:
    - Key: `images`
    - Value: [upload new image file]
## Assumptions
### Image Storage: 
Images are stored locally in the uploads directory within the project. This is intended for development purposes. In production, consider using a cloud storage solution like AWS S3 or Cloudinary.
### Multer Configuration: 
The code uses Multer to handle image uploads. For the PUT endpoint, it accepts multiple images (up to 10). It’s assumed that this meets the application requirements.
### Static File Serving: 
Images can be accessed at `/uploads/filename`, assuming the server is running at `localhost:3334`.
### Database Schema: 
Assumes MongoDB is used with a schema for heroes that includes fields for name, description, and an array for image paths.
### Error Handling: 
Basic error handling is implemented to manage missing files, database connectivity issues, and invalid hero IDs.