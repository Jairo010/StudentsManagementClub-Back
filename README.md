# Backend API - Event Management System

## 📋 Description

This is a REST API developed in Node.js with Express for comprehensive management of events, clubs, universities and competitions. The system allows efficient administration of members, projects, tasks, talks and transactions.

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **Supabase** - Cloud PostgreSQL database
- **Jest** - Testing framework
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing middleware
- **Nodemon** - Development tool for automatic restart

## 📁 Project Structure

```
src/
├── __tests__/          # Unit tests organized by modules
├── app.js              # Main Express configuration
├── index.js            # Application entry point
├── config.js           # Environment variables configuration
├── DB/
│   └── postgresql.js   # Supabase configuration
├── middleware/
│   └── error.js        # Error handling middleware
├── modulos/            # Application modules
│   ├── auth/           # Authentication and authorization
│   ├── Clubs/          # Club management
│   ├── Competitions/   # Competition management
│   ├── events/         # Event management
│   ├── Groups/         # Group management
│   ├── Majors/         # Major/career management
│   ├── members/        # Member management
│   ├── Participants/   # Participant management
│   ├── Projects/       # Project management
│   ├── Roles/          # Role management
│   ├── Speakers/       # Speaker management
│   ├── Talks/          # Talk management
│   ├── Tasks/          # Task management
│   ├── Transactions/   # Transaction management
│   └── Universities/   # University management
└── red/
    ├── errors.js       # Centralized error handling
    └── respuestas.js   # HTTP response formatting
```

## 🚀 Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Supabase account

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd appBack-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   PORT=4000
   SUPABASEURL=your_supabase_url
   SUPABASEKEY=your_supabase_private_key
   SUPABASEKEYPUBLIC=your_supabase_public_key
   ```

4. **Start the server**
   
   **Development mode:**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/createUser` - Create new user
- `POST /api/auth/login` - User login
- `POST /api/auth/getResetToken` - Get password reset token
- `POST /api/auth/resetPassword` - Reset password

### Entity Management
- `GET/POST/PUT/DELETE /api/members` - Member management
- `GET/POST/PUT/DELETE /api/clubs` - Club management
- `GET/POST/PUT/DELETE /api/projects` - Project management
- `GET/POST/PUT/DELETE /api/tasks` - Task management
- `GET/POST/PUT/DELETE /api/majors` - Major/career management
- `GET/POST/PUT/DELETE /api/roles` - Role management
- `GET/POST/PUT/DELETE /api/events` - Event management
- `GET/POST/PUT/DELETE /api/participants` - Participant management
- `GET/POST/PUT/DELETE /api/universities` - University management
- `GET/POST/PUT/DELETE /api/groups` - Group management
- `GET/POST/PUT/DELETE /api/speakers` - Speaker management
- `GET/POST/PUT/DELETE /api/talks` - Talk management
- `GET/POST/PUT/DELETE /api/competitions` - Competition management
- `GET/POST/PUT/DELETE /api/transactions` - Transaction management

## 🧪 Testing

The project includes a complete test suite using Jest:

```bash
# Run all tests
npm test

# Run specific tests
npm test -- --testPathPattern=clubs
```

Tests are organized by modules in the `src/__tests__/` folder.

## 🏗️ Architecture

The project follows a modular architecture where each module has:

- **Controller** - Control logic and validation
- **Model** - Database interaction
- **Route** - Endpoint definitions

### Error Handling

- Centralized error handling middleware
- Standardized responses for all endpoints
- Error logging with Morgan

### Database

- Uses Supabase as PostgreSQL database service
- Centralized configuration in `src/DB/postgresql.js`

## 🔧 Available Scripts

- `npm run dev` - Start server in development mode with nodemon
- `npm test` - Run test suite with Jest

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 4000) | No |
| `SUPABASEURL` | Your Supabase project URL | Yes |
| `SUPABASEKEY` | Supabase private key | Yes |
| `SUPABASEKEYPUBLIC` | Supabase public key | Yes |

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request
## 📄 License

This project is under the ISC License.
  
## 📞 Support

To report bugs or request new features, please open an issue in the repository.

---

**Project Status:** Under active development 🚧 