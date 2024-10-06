# LinkHash

**LinkHash** is a URL hashing system designed to shorten long URLs, preserve query parameters (such as UTM tracking), and ensure privacy-aware hashed URLs. The system supports features like single-use or limited-use URLs and click-tracking functionality for marketing purposes.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)

## Features
- **URL Hashing**: Generates shortened URLs by hashing long URLs with query parameters (e.g., UTM tracking).
- **Click Tracking**: Tracks the number of times each URL is clicked.
- **Single-Use or Limited-Use URLs**: The option to limit the number of uses per shortened URL.
- **Query Parameter Preservation**: Retains UTM and other query parameters when shortening and redirecting.
- **Privacy Aware**: Ensures that sensitive data is not exposed during URL hashing and redirection.
- **Efficient & Scalable**: Capable of handling large-scale URL shortening and tracking in high-traffic scenarios.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for storing URLs, hash metadata, and click-tracking information)
- **Hashing**: Custom hashing logic for URL shortening

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/LinkHash.git
    cd LinkHash
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Run the server:
    ```bash
    npm start
    ```

## Usage

To start shortening URLs and tracking clicks, run the backend and use the API endpoints to generate and manage your shortened URLs.

You can use tools like Postman or cURL to test API endpoints. See [API Endpoints](#api-endpoints) for more details.

### Example Flow

1. **Shorten URL**:
    - Input: `https://www.example.com/?utm_source=google&utm_campaign=spring_sale`
    - Output: `https://linkhash.app/hash123`

2. **Track Clicks**: Each time `https://linkhash.app/hash123` is clicked, a count will be tracked in the database.

3. **Single or Limited Use**: Set URLs to expire after a single or limited number of uses.

## API Endpoints

### 1. **Shorten URL**
   - **POST** `/api/shorten`
   - **Description**: Shortens a long URL, preserving query parameters.
   - **Request Body**:
     ```json
     {
       "original_url": "https://www.example.com/?utm_source=google&utm_campaign=spring_sale",
       "usage_limit": 10  // optional, default is unlimited
     }
     ```
   - **Response**:
     ```json
     {
       "shortened_url": "https://linkhash.app/hash123",
       "expires_at": null // or timestamp if limited
     }
     ```

### 2. **Redirect to Original URL**
   - **GET** `/{hash}`
   - **Description**: Redirects the user to the original URL when the hashed URL is accessed.
   - **Response**: HTTP 301 Redirect

### 3. **Get Click Stats**
   - **GET** `/api/stats/{hash}`
   - **Description**: Retrieves the number of clicks for a specific shortened URL.
   - **Response**:
     ```json
     {
       "clicks": 42,
       "hash": "hash123",
       "original_url": "https://www.example.com"
     }
     ```

### 4. **Invalidate URL (Single-Use)**
   - **POST** `/api/invalidate/{hash}`
   - **Description**: Invalidates a single-use URL after it is clicked once.

## Environment Variables

Create a `.env` file in the root directory and define the following variables:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/linkhash
BASE_URL=https://linkhash.app
HASH_SECRET=your_hash_secret_key
```

## Testing

Run tests to ensure functionality:

```bash
npm test
```

You can implement unit and integration tests for the core functionalities like URL shortening, click tracking, and single-use URL invalidation.

## Contributing

Contributions are welcome! If you find bugs or want to add new features, feel free to fork the repository and create a pull request.
