# VisualVerse - AI-Powered Image Search Platform

![VisualVerse](https://img.shields.io/badge/VisualVerse-Image%20Search-blue)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![OAuth](https://img.shields.io/badge/Auth-OAuth2.0-orange)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 📖 Project Overview

VisualVerse is a modern, full-stack image search application that allows users to discover and explore high-quality images from Unsplash. The platform provides a seamless experience with OAuth authentication, intelligent search capabilities, and personalized features.

### 🎯 Purpose
- Provide a beautiful, intuitive interface for image discovery
- Enable secure user authentication via multiple OAuth providers
- Offer personalized search history and trending insights
- Support multi-select functionality for image management

### ✨ Key Features
- **Multi-provider OAuth** (Google, Facebook, GitHub)
- **Real-time image search** powered by Unsplash API
- **Smart search suggestions** with trending terms
- **Personal search history** with timestamps
- **Multi-select image grid** with visual feedback
- **Responsive design** optimized for all devices
- **Top searches** across all users

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety & development |
| Tailwind CSS | Styling & responsive design |
| Vite | Build tool & development server |
| React Router | Navigation & routing |
| Axios | HTTP client for API calls |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| Passport.js | Authentication middleware |
| Express Sessions | Session management |
| CORS | Cross-origin resource sharing |

### Third-Party Services
| Service | Purpose |
|---------|---------|
| Unsplash API | Image search & retrieval |
| Google OAuth 2.0 | Authentication |
| Facebook Login | Authentication |
| GitHub OAuth | Authentication |

## 📁 Folder Structure
```
image-search/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ │ ├── ui/ # Base UI components (Button, Input, Card)
│ │ │ ├── layout/ # Layout components (Navbar, Footer)
│ │ │ ├── search/ # Search-related components
│ │ │ ├── auth/ # Authentication components
│ │ │ ├── history/ # Search history components
│ │ │ └── common/ # Shared components
│ │ ├── pages/ # Page components
│ │ ├── context/ # React Context providers
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API service layer
│ │ ├── types/ # TypeScript definitions
│ │ ├── utils/ # Utility functions
│ │ └── styles/ # Global styles
│ ├── public/ # Static assets
│ ├── package.json
│ ├── vite.config.ts
│ └── tailwind.config.js
├── server/ # Express Backend
│ ├── src/
│ │ ├── config/ # Configuration files
│ │ ├── controllers/ # Route controllers
│ │ ├── middleware/ # Custom middleware
│ │ ├── models/ # MongoDB models
│ │ ├── routes/ # API routes
│ │ └── utils/ # Utility functions
│ ├── package.json
│ ├── app.js
│ └── server.js
└── README.md
```


## ⚙️ Setup Instructions

### Prerequisites
- Node.js 16.0 or higher
- MongoDB 5.0 or higher
- Unsplash Developer Account
- OAuth App Credentials (Google, Facebook, GitHub)

### Backend Setup

1. **Navigate to server directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```
3. **Create environment file**

```bash
cp .env.example .env
```
4. **Configure environment variables (see Environment Variables section)**

- Start development server

```bash
npm run dev
```
- The backend will run on http://localhost:8000

5. **Frontend Setup**
Navigate to client directory

```bash
cd client
```
- Install dependencies

```bash
npm install
```
- Create environment file

```bash
cp .env.example .env
```
- Configure environment variables

```env
VITE_API_URL=http://localhost:8000
```
- Start development server

```bash
npm run dev
```
The frontend will run on http://localhost:3000

## 🚀 Deployment Guide
Frontend Deployment (Vercel)
Build the project

```bash
cd client
npm run build
```
Install Vercel CLI

```bash
npm i -g vercel
```
Deploy to Vercel

```bash
vercel --prod
```
Configure environment variables in Vercel dashboard

VITE_API_URL: Your backend API URL

## Backend Deployment (Render/Railway)
### Render.com
- Connect your GitHub repository to Render
- Create a new Web Service
- Set build command: npm install
- Set start command: npm start
- Add environment variables in Render dashboard
- Deploy

## 🔑 Environment Variables
Backend (.env)
env
## Server Configuration
```
PORT=8000
NODE_ENV=development
```
## Database
MONGODB_URI=```mongodb://localhost:27017/visualverse```

## Session Security
SESSION_SECRET=```your-super-secret-session-key```

## OAuth - Google
GOOGLE_CLIENT_ID=```your-google-client-id```
GOOGLE_CLIENT_SECRET=```your-google-client-secret```

## OAuth - Facebook
FACEBOOK_APP_ID=```your-facebook-app-id```
FACEBOOK_APP_SECRET=```your-facebook-app-secret```

## OAuth - GitHub
GITHUB_CLIENT_ID=```your-github-client-id```
GITHUB_CLIENT_SECRET=```your-github-client-secret```

## Unsplash API
UNSPLASH_ACCESS_KEY=```your-unsplash-access-key```

## Client URL for OAuth callbacks
CLIENT_URL=```http://localhost:3000```
Frontend (.env)
env
VITE_API_URL=```http://localhost:8000```

## 📡 API Documentation
Authentication Endpoints
GET /api/auth/status
Check authentication status.

Response:
```bash
json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "https://avatar.url",
      "provider": "google"
    }
  }
}
```
```bash
POST /api/auth/logout
```
Logout user.

Response:
```bash
json
{
  "success": true,
  "message": "Logged out successfully"
}
Search Endpoints
POST /api/search
Search for images.
```
Request:
```
json
{
  "term": "mountains"
}
```
Response:
```
json
{
  "success": true,
  "data": {
    "term": "mountains",
    "results": [
      {
        "id": "image_id",
        "urls": {
          "regular": "https://images.unsplash.com/photo-123",
          "small": "https://images.unsplash.com/photo-123",
          "thumb": "https://images.unsplash.com/photo-123"
        },
        "alt_description": "Beautiful mountain landscape",
        "description": "Snow covered mountains during sunset",
        "user": {
          "name": "Photographer Name"
        },
        "likes": 150,
        "color": "#4A5568"
      }
    ],
    "total": 1250
  }
}
```
GET /api/top-searches
Get top searches across all users.

Response:
```
json
{
  "success": true,
  "data": [
    {
      "_id": "nature",
      "count": 150
    },
    {
      "_id": "mountains", 
      "count": 120
    }
  ]
}
```
GET /api/history
Get user's search history.

Response:
```
json
{
  "success": true,
  "data": [
    {
      "_id": "history_id",
      "term": "beach",
      "timestamp": "2023-10-01T12:00:00.000Z"
    }
  ]
}
```
## 🎮 Usage
Authentication Flow
- Visit the application at your deployed URL
- Click "Login" to see OAuth options
- Choose your provider (Google, Facebook, or GitHub)
- Complete OAuth flow in the popup window
- You're logged in! Access personalized features
- Searching for Images
- Use the search bar at the top of the page
- Type your search term or click suggested terms
- View results in the responsive grid layout
- Select images by clicking the checkbox overlay
- Track selections with the live counter
- Managing Search History
- View recent searches in the sidebar
- Click any history item to search again
- Search history is automatically saved and personalized

## 🤝 Contributing
We welcome contributions! Please follow these steps:
- Fork the repository
- Create a feature branch

```bash
git checkout -b feature/amazing-feature
```
- Commit your changes
```bash
git commit -m 'Add some amazing feature'
```
- Push to the branch
```bash
git push origin feature/amazing-feature
```
- Open a Pull Request

## Development Guidelines
- Use TypeScript for type safety
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.


## MIT License

Copyright (c) 2023 VisualVerse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
🙏 Credits
External Services
Unsplash - High-quality image API

Google OAuth - Authentication
Facebook Login - Authentication
GitHub OAuth - Authentication

## Libraries & Tools
- React - UI framework
- Tailwind CSS - CSS framework
- Lucide Icons - Beautiful icons
- Vite - Build tool
- Express.js - Web framework
- MongoDB - Database
- Passport.js - Authentication

## Deployment Platforms
- Vercel - Frontend hosting
- Render - Backend hosting

## 📞 Support
If you encounter any issues or have questions:
Create an Issue on GitHub Issues
Check Documentation for common solutions
Review Demo Images for visual guidance


Built with ❤️ using the MERN Stack
<img width="1439" height="811" alt="Screenshot 2025-11-02 at 4 46 17 PM" src="https://github.com/user-attachments/assets/cdf22b81-2881-41f7-8f8b-6aacccd168a6" />
<img width="1439" height="811" alt="Screenshot 2025-11-02 at 4 46 45 PM" src="https://github.com/user-attachments/assets/be25f391-7bcd-4ff4-beb0-f277ad6dd659" />
<img width="1439" height="811" alt="Screenshot 2025-11-02 at 4 47 03 PM" src="https://github.com/user-attachments/assets/09a45710-7d76-4cbf-bdf0-e175f8da9185" />



