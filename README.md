# Community App API Documentation

## Overview

The Community App backend is a RESTful API built with Express.js and TypeScript. It provides endpoints to manage user resources in a community application. The API uses Prisma ORM to interact with a PostgreSQL database.

## Base URL

All API endpoints are prefixed with `/api`.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests:

- `200 OK` - The request was successful
- `201 Created` - A new resource was successfully created
- `400 Bad Request` - The request was malformed or invalid
- `404 Not Found` - The requested resource was not found
- `500 Internal Server Error` - An error occurred on the server

All error responses include a JSON object with an error message.

## Data Models

### User

| Field      | Type     | Description                    | Required |
|------------|----------|--------------------------------|----------|
| id         | String   | Unique identifier (UUID)       | Auto-generated |
| name       | String   | User's full name               | Yes      |
| email      | String   | User's email address (unique)  | Yes      |
| bio        | String   | User's biography               | No       |
| avatarUrl  | String   | URL to user's avatar image     | No       |
| createdAt  | DateTime | When the user was created      | Auto-generated |
| updatedAt  | DateTime | When the user was last updated | Auto-updated   |

## API Endpoints

### Users

#### Get All Users

Retrieves a list of all users in the system.

- **URL**: `/api/users`
- **Method**: `GET`
- **URL Parameters**: None
- **Query Parameters**: None
- **Success Response**:
  - **Code**: 200
  - **Content Example**:
  ```json
  [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "bio": "Software developer with 5 years of experience",
      "avatarUrl": "https://example.com/avatars/johndoe.jpg",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2023-06-01T00:00:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "bio": "Product manager and UX enthusiast",
      "avatarUrl": "https://example.com/avatars/janesmith.jpg",
      "createdAt": "2023-06-02T00:00:00.000Z",
      "updatedAt": "2023-06-02T00:00:00.000Z"
    }
  ]
  ```
  
#### Get User by ID

Retrieves a specific user by their ID.

- **URL**: `/api/users/:id`
- **Method**: `GET`
- **URL Parameters**: 
  - `id`: The UUID of the user
- **Success Response**:
  - **Code**: 200
  - **Content Example**:
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "bio": "Software developer with 5 years of experience",
    "avatarUrl": "https://example.com/avatars/johndoe.jpg",
    "createdAt": "2023-06-01T00:00:00.000Z",
    "updatedAt": "2023-06-01T00:00:00.000Z"
  }
  ```

#### Create User

Creates a new user.

- **URL**: `/api/users`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Alice Williams",
    "email": "alice.williams@example.com",
    "bio": "Frontend developer passionate about UX",
    "avatarUrl": "https://example.com/avatars/alice.jpg"
  }
  ```
- **Validation**:
  - `name`: Required, 2-50 characters
  - `email`: Required, valid email format
  - `bio`: Optional, max 500 characters
  - `avatarUrl`: Optional, valid URL format
- **Success Response**:
  - **Code**: 201
  - **Content**: 
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "Alice Williams",
      "email": "alice.williams@example.com",
      "bio": "Frontend developer passionate about UX",
      "avatarUrl": "https://example.com/avatars/alice.jpg",
      "createdAt": "2023-06-03T00:00:00.000Z",
      "updatedAt": "2023-06-03T00:00:00.000Z"
    }
  }
  ```

#### Update User

Updates an existing user. Allows partial updates - you can include only the fields you want to change.

- **URL**: `/api/users/:id`
- **Method**: `PATCH`
- **URL Parameters**:
  - `id`: The UUID of the user
- **Headers**:
  - `Content-Type: application/json`
- **Request Body Example** (only include fields you want to update):
  ```json
  {
    "name": "Alice Johnson",
    "bio": "Frontend developer with a focus on accessibility"
  }
  ```
- **Validation**:
  - Fields sent will be validated using the same rules as creation
  - Only fields included in the request will be updated
- **Success Response**:
  - **Code**: 200
  - **Content**: 
  ```json
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Alice Johnson",
    "email": "alice.williams@example.com",
    "bio": "Frontend developer with a focus on accessibility",
    "avatarUrl": "https://example.com/avatars/alice.jpg",
    "createdAt": "2023-06-03T00:00:00.000Z",
    "updatedAt": "2023-06-04T00:00:00.000Z"
  }
  ```

## Development

### Environment Setup

The application requires the following environment variables:

- `DATABASE_URL`: Connection string for the PostgreSQL database
- `PORT`: (Optional) The port on which the server will run (default: 5000)
- `NODE_ENV`: The environment mode (development, production)

### Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Generate Prisma client:
   ```
   npx prisma generate
   ```

3. Run database migrations:
   ```
   npx prisma migrate dev
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   ```

6. Start production server:
   ```
   npm start
   ```
