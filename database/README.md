# Database Migrations

SQL migration files for Swami Narayan Builders Hub database.

## Setup Instructions

### 1. Create Database

```bash
creatdb swami_narayan_builders
```

### 2. Run Migrations

```bash
# Using psql
psql swami_narayan_builders < 001_init.sql

# Or from the root of the project
psql -U postgres -d swami_narayan_builders -f database/migrations/001_init.sql
```

### 3. Verify Setup

```bash
# Connect to database
psql swami_narayan_builders

# List all tables
\dt

# View projects table
\d projects
```

## Database Schema

### Tables

#### `user_roles`

Stores user roles and permissions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | User identifier |
| `role` | app_role | User role (admin, user) |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

#### `projects`

Building projects information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Project name |
| `location` | TEXT | Project location |
| `description` | TEXT | Project description |
| `status` | TEXT | Status (ongoing, completed, upcoming) |
| `images` | TEXT[] | Array of image URLs |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

#### `reviews`

Customer reviews.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Reviewer name |
| `email` | TEXT | Reviewer email |
| `rating` | INTEGER | Rating (1-5) |
| `message` | TEXT | Review message |
| `is_approved` | BOOLEAN | Approval status |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

#### `enquiries`

Customer enquiries/inquiries.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Enquirer name |
| `email` | TEXT | Enquirer email |
| `phone` | TEXT | Enquirer phone |
| `message` | TEXT | Enquiry message |
| `is_read` | BOOLEAN | Read status |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

#### `flats`

Property units/flats.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `project_id` | UUID | Reference to project |
| `flat_number` | TEXT | Unit number |
| `floor_number` | INTEGER | Floor number |
| `configuration` | TEXT | Unit type (1 BHK, 2 BHK, etc.) |
| `carpet_area` | DECIMAL | Area in sq ft |
| `price` | DECIMAL | Unit price |
| `status` | TEXT | Status (available, sold, reserved) |
| `amenities` | TEXT[] | Array of amenities |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

## Enums

### `app_role`

- `admin` - Administrator with full access
- `user` - Regular user with limited access

## Functions

### `has_role(_user_id UUID, _role app_role)`

Checks if a user has a specific role.

**Parameters:**
- `_user_id` - User ID
- `_role` - Role to check

**Returns:** BOOLEAN

### `update_updated_at_column()`

Automatic trigger function to update the `updated_at` timestamp.

## Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Public Access**: Projects, flats, and reviews (approved only) are viewable by everyone
- **Admin Only**: Create, update, delete operations require admin role
- **Anonymous Submission**: Reviews and enquiries can be submitted by anyone

## Backup & Restore

### Backup

```bash
pg_dump swami_narayan_builders > backup.sql
```

### Restore

```bash
psql swami_narayan_builders < backup.sql
```

## Troubleshooting

### Connection Error

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql
```

### Permission Denied

```bash
# Connect as superuser
psql -U postgres

# Create database
CREATE DATABASE swami_narayan_builders;
```

### Reset Database

```bash
# Drop and recreate
dropdb swami_narayan_builders
creatdb swami_narayan_builders
psql swami_narayan_builders < database/migrations/001_init.sql
```