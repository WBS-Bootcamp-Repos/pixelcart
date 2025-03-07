# eCommerce API

This project is a comprehensive backend application designed to manage an eCommerce platform. It facilitates operations such as listing products, managing categories, and processing user orders.

## Features

- **Database**: Utilizes PostgreSQL with Sequelize ORM for data management.
- **Validation**: Implements request body validation using JOI.
- **Directory Structure**: Organized as follows:

  ```
  express-api/
  ├── db/
  │   └── index.js
  ├── controllers/
  │   └── users.js
  ├── middleware/
  │   └── somemiddleware.js
  ├── models/
  │   └── User.js
  ├── routers/
  │   └── userRouter.js
  ├── schemas/
  │   └── userSchemas.js
  └── index.js
  ```

- **CRUD Operations**: Supports Create, Read, Update, and Delete functionalities for users, products, categories, and orders.
- **Associations**:
  - Products are linked to categories; a product cannot be created without an existing category.
  - Orders are associated with users and products; an order cannot be created without existing user and product records.
- **Postman Collection**: Includes sample requests and responses for testing and demonstration purposes.

## Endpoints

### User

- `GET /users`: Retrieve a list of users.
- `POST /users`: Create a new user.
- `GET /users/{id}`: Retrieve a specific user by ID.
- `PUT /users/{id}`: Update a specific user by ID.
- `DELETE /users/{id}`: Delete a specific user by ID.

### Product

- `GET /products`: Retrieve a list of products, optionally filtered by category ID.
- `POST /products`: Create a new product.
- `GET /products/{id}`: Retrieve a specific product by ID.
- `PUT /products/{id}`: Update a specific product by ID.
- `DELETE /products/{id}`: Delete a specific product by ID.

### Category

- `GET /categories`: Retrieve a list of categories.
- `POST /categories`: Create a new category.
- `GET /categories/{id}`: Retrieve a specific category by ID.
- `PUT /categories/{id}`: Update a specific category by ID.
- `DELETE /categories/{id}`: Delete a specific category by ID.

### Order

- `GET /orders`: Retrieve a list of orders.
- `POST /orders`: Create a new order.
- `GET /orders/{id}`: Retrieve a specific order by ID.
- `PUT /orders/{id}`: Update a specific order by ID.
- `DELETE /orders/{id}`: Delete a specific order by ID.

## Data Models

### User

- `id`: Integer
- `name`: String
- `email`: String
- `password`: String

### Product

- `id`: Integer
- `name`: String
- `description`: String
- `price`: Float
- `categoryId`: Integer

### Category

- `id`: Integer
- `name`: String

### Order

- `id`: Integer
- `userId`: Integer
- `products`: Array of objects containing `productId` (Integer) and `quantity` (Integer)
- `total`: Float

## Planning and Collaboration

- **Database Design**: Collaboratively discuss and plan the database schema before implementation.
- **Daily Stand-ups**: Conduct regular meetings to address blockers and share progress.
- **Organization**: Utilize tools like Trello for task management and team coordination.
- **Assistance**: Seek help promptly if challenges persist beyond 30 minutes.
