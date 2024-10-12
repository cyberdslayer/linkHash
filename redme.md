Overview

The URL Shortener Service is a web application designed to transform long URLs with UTM tracking into shortened, hash-based URLs. This service supports click tracking and manages single-use or limited-use URLs while ensuring that the integrity of the original URLs is preserved.
Table of Contents

    Technologies Used
    Architecture
    Installation
    API Endpoints
    Usage
    License

Technologies Used

    Node.js: Backend runtime for executing JavaScript server-side.
    Express: Web framework for building the API.
    MongoDB: NoSQL database for storing URL mappings and click data.
    Mongoose: ODM library for MongoDB, simplifying database interactions.
    Crypto: Built-in Node.js module for hashing URLs.

Architecture

The service is built using a layered architecture, promoting separation of concerns and maintainability. The architecture consists of the following components:

    API Layer:
        This layer handles incoming HTTP requests and routes them to appropriate handlers.
        It validates input and formats output responses.
        Uses Express to define routes for shortening URLs and redirecting hashed URLs.

    Service Layer:
        Implements the core business logic for URL hashing, click tracking, and expiration handling.
        Uses the crypto module to generate secure, hashed URLs.
        Interacts with the database to save and retrieve URL mappings.

    Database Layer:
        Uses MongoDB to persist data related to URLs.
        Stores the original URL, hashed URL, click count, and maximum click limit.
        The database schema is defined using Mongoose models, enabling easy data manipulation.

    Model Layer:
        Defines the structure of the data being stored in MongoDB.
        Each URL document includes fields for the original URL, hashed URL, click count, and expiration logic.

Data Flow

    A client sends a POST request to shorten a URL.
    The API Layer processes the request, validates input, and calls the Service Layer to create a hashed URL.
    The Service Layer checks the database for existing URLs and either saves a new mapping or returns the existing hash.
    The hashed URL is returned to the client.
    When a client accesses the hashed URL via a GET request, the API Layer fetches the corresponding original URL from the database.
    The click count is incremented, and the user is redirected to the original URL.

Installation

To run this project locally, follow these steps:

    Clone the Repository:

    bash

git clone 
cd url-shortener

Install Dependencies:

bash

npm install

Set Up MongoDB: Ensure MongoDB is installed and running on your local machine or connect to a remote MongoDB instance. Update the connection string in config/db.js if necessary.

Start the Server:

bash

    npm start

    The server will run on http://localhost:3001.

API Endpoints
1. Shorten URL

    Endpoint: POST /shorten
    Request Body:

    json

{
    "originalUrl": "https://example.com?utm_campaign=spring",
    "maxClicks": 5
}

Response:

json

    {
        "hashedUrl": "http://localhost:3001/abc123"
    }

2. Redirect to Original URL

    Endpoint: GET /:hash
    Response: Redirects to the original URL. If the URL is not found or has expired, returns an appropriate error message.

Usage

    Use the /shorten endpoint to create shortened URLs.
    Access the generated hashed URL to be redirected to the original URL while tracking clicks.