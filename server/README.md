# Swami Narayan Builders - Backend API

Backend server for the Swami Narayan Builders Hub website. Built with Node.js and Express.js.

## Features

- ✅ Projects Management (CRUD)
- ✅ Reviews Management (CRUD with approval)
- ✅ Enquiries Management (CRUD)
- ✅ Flats/Units Management (CRUD)
- ✅ Authentication & Authorization
- ✅ PostgreSQL Database
- ✅ JWT Token-based Auth
- ✅ CORS Enabled
- ✅ Error Handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: CORS, bcryptjs

## Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd server
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/swami_narayan_builders
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

4. **Setup Database**

Create a PostgreSQL database and run migrations:

```bash
# Create database
creatdb swami_narayan_builders

# Run migrations (see database/migrations folder)
psql swami_narayan_builders < ../database/migrations/init.sql
```

5. **Start the server**

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Health Check

```
GET /api/health
```

### Authentication

#### Sign In

```
POST /api/auth/signin
Content-Type: application/json

{
  "email": "admin@swami.com",
  "password": "password123"
}
```

Response:

```json
{
  "user": {
    "id": "user-123",
    "email": "admin@swami.com",
    "isAdmin": true
  },
  "session": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  },
  "error": null
}
```

#### Sign Up

```
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Session

```
GET /api/auth/session
Authorization: Bearer <token>
```

#### Sign Out

```
POST /api/auth/signout
```

### Projects

#### Get All Projects

```
GET /api/projects
```

#### Get Project by ID

```
GET /api/projects/:id
```

#### Create Project (Admin Only)

```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Project Name",
  "location": "Location",
  "description": "Description",
  "status": "ongoing",
  "images": []
}
```

#### Update Project (Admin Only)

```
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "location": "Updated Location",
  "description": "Updated Description",
  "status": "completed",
  "images": []
}
```

#### Delete Project (Admin Only)

```
DELETE /api/projects/:id
Authorization: Bearer <token>
```

### Reviews

#### Get Approved Reviews

```
GET /api/reviews?approved=true
```

#### Get All Reviews (Admin Only)

```
GET /api/reviews
Authorization: Bearer <token>
```

#### Submit Review

```
POST /api/reviews
Content-Type: application/json

{
  "name": "Customer Name",
  "email": "customer@example.com",
  "rating": 5,
  "message": "Great service!"
}
```

#### Approve Review (Admin Only)

```
PATCH /api/reviews/:id/approve
Authorization: Bearer <token>
```

#### Delete Review (Admin Only)

```
DELETE /api/reviews/:id
Authorization: Bearer <token>
```

### Enquiries

#### Submit Enquiry

```
POST /api/enquiries
Content-Type: application/json

{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "+91-9876543210",
  "message": "I'm interested in your projects"
}
```

#### Get All Enquiries (Admin Only)

```
GET /api/enquiries
Authorization: Bearer <token>
```

#### Mark Enquiry as Read (Admin Only)

```
PATCH /api/enquiries/:id/read
Authorization: Bearer <token>
```

#### Delete Enquiry (Admin Only)

```
DELETE /api/enquiries/:id
Authorization: Bearer <token>
```

### Flats

#### Get Flats by Project

```
GET /api/projects/:projectId/flats
```

#### Get All Flats

```
GET /api/flats
```

#### Get Flat by ID

```
GET /api/flats/:id
```

#### Create Flat (Admin Only)

```
POST /api/flats
Authorization: Bearer <token>
Content-Type: application/json

{
  "project_id": "project-uuid",
  "flat_number": "A1",
  "floor_number": 1,
  "configuration": "2 BHK",
  "carpet_area": 1200,
  "price": 5000000,
  "status": "available",
  "amenities": ["Balcony", "Kitchen"]
}
```

#### Update Flat (Admin Only)

```
PUT /api/flats/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Flat (Admin Only)

```
DELETE /api/flats/:id
Authorization: Bearer <token>
```

## Database Schema

See `../database/migrations/` for SQL schema files.

### Tables

- `user_roles` - User authentication and roles
- `projects` - Construction projects
- `reviews` - Customer reviews
- `enquiries` - Customer enquiries/inquiries
- `flats` - Flat/unit listings

## Environment Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost/dbname` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-key` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:5173` |

## Authentication

The API uses JWT tokens for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Default Admin Credentials (Development)

Email: `admin@swami.com`
Password: `admin123`

⚠️ **Important**: Change these credentials in production!

## Error Handling

All errors return appropriate HTTP status codes:

- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error response format:

```json
{
  "error": "Error message",
  "status": 400
}
```

## Development

### Running in Development Mode

```bash
npm run dev
```

Uses `nodemon` for automatic restart on file changes.

### Project Structure

```
server/
├── config/
│   └── database.js        # Database configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── routes/
│   ├── projects.js        # Projects endpoints
│   ├── reviews.js         # Reviews endpoints
│   ├── enquiries.js       # Enquiries endpoints
│   ├── flats.js           # Flats endpoints
│   └── auth.js            # Authentication endpoints
├── server.js              # Main server file
├── .env.example           # Environment variables template
├── package.json           # Dependencies
└── README.md              # This file
```

## Production Deployment

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "swami-narayan-api"

# View logs
pm2 logs swami-narayan-api

# Restart
pm2 restart swami-narayan-api
```

### Using Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

## Security Considerations

1. ✅ Change `JWT_SECRET` in production
2. ✅ Use HTTPS in production
3. ✅ Enable CORS only for trusted origins
4. ✅ Hash passwords before storing
5. ✅ Validate all inputs
6. ✅ Use environment variables for sensitive data
7. ✅ Keep dependencies updated

## Contributing

Feel free to submit issues and enhancement requests!

## Support

For support, email admin@swami.com or create an issue in the repository.

## License

MIT License - see LICENSE file for details
