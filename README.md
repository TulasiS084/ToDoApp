# Todo MERN App

A complete, full-stack to-do list application built with the MERN stack (MongoDB, Express, React, Node.js). Manage your tasks efficiently with a modern, responsive UI.

## 🌟 Features

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Set task priority (Low, Medium, High)
- ✅ Add task descriptions and categories
- ✅ Set due dates for tasks
- ✅ View detailed task information

### Search & Filtering
- 🔍 Live search by title or description
- 🏷️ Filter by completion status (Active/Completed)
- 🎯 Filter by priority level
- 📂 Filter by category
- 📅 Sort by newest, oldest, or due date

### User Interface
- 🎨 Modern, responsive dashboard design
- 📱 Mobile-friendly layout
- ✨ Smooth animations and transitions
- 🎭 Glassmorphism styling
- 📊 Task statistics dashboard
- 🔔 Toast notifications for actions
- 🚀 Fast loading with optimized performance

### Advanced Features
- 📈 Task completion statistics
- ⚠️ Overdue task highlighting
- 🎨 Priority color indicators
- 📋 Task card with quick actions
- 🗑️ Confirmation modal before delete
- 🚀 Optimized search and filter

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** - Development server auto-reload

## 📂 Project Structure

```
todo-mern-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterSection.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ConfirmModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AddTask.jsx
│   │   │   ├── EditTask.jsx
│   │   │   └── TaskDetails.jsx
│   │   ├── context/
│   │   │   └── TaskContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .gitignore
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── middleware/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── .gitignore
│
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (MongoDB Atlas)

### Installation

#### 1. Clone or Extract Project
```bash
cd newprojectmern
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and add your MongoDB URI
# Edit .env and replace with your MongoDB connection string
nano .env
```

Update `.env` with your MongoDB Atlas connection string:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-mern-app?retryWrites=true&w=majority
NODE_ENV=development
```

**Start the backend server:**
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will open at `http://localhost:3000`

## 📖 Usage

### Creating a Task
1. Click "Add Task" button in the navbar
2. Fill in the task form:
   - **Title** (required)
   - Description (optional)
   - Priority (Low, Medium, High)
   - Category (optional)
   - Due Date (optional)
3. Click "Create Task"

### Searching Tasks
1. Use the search bar in the left sidebar
2. Search by task title or description
3. Results update in real-time

### Filtering Tasks
1. Use the filter panel on the left:
   - **Status**: All, Active, or Completed
   - **Priority**: All, Low, Medium, or High
   - **Sort**: Newest, Oldest, or Due Date
2. Click "Reset Filters" to clear all filters

### Editing a Task
1. Click the edit icon on any task card
2. Modify the task details
3. Click "Update Task"

### Deleting a Task
1. Click the delete icon on a task card
2. Confirm deletion in the modal
3. Task will be permanently deleted

### Marking Complete
1. Click the circle icon on a task card to mark complete
2. Completed tasks appear with strikethrough text
3. Click again to mark incomplete

### View Task Details
1. Click the eye icon or task title to view full details
2. See all information including timestamps
3. Edit or delete from this page

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Tasks
```
GET /tasks
Query Parameters:
  - search: Search by title/description
  - completed: true/false (filter by status)
  - priority: Low/Medium/High
  - category: Filter by category
  - sortBy: newest/oldest/dueDate
```

#### Get Single Task
```
GET /tasks/:id
```

#### Create Task
```
POST /tasks
Body:
{
  "title": "Task title",
  "description": "Task description",
  "priority": "Medium",
  "category": "Work",
  "dueDate": "2024-12-31"
}
```

#### Update Task
```
PUT /tasks/:id
Body: (all fields optional)
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "High",
  "category": "Personal",
  "dueDate": "2024-12-25",
  "completed": false
}
```

#### Toggle Task Completion
```
PATCH /tasks/:id/toggle
```

#### Delete Task
```
DELETE /tasks/:id
```

#### Health Check
```
GET /health
```

## 🗄️ MongoDB Setup

### Using MongoDB Atlas (Cloud)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Cluster"
   - Choose free tier
   - Select region closest to you
   - Create cluster

3. **Create Database User**
   - Go to "Database Access"
   - Add new database user
   - Save username and password

4. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<database_name>`

5. **Add to .env**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-mern-app?retryWrites=true&w=majority
   ```

### Local MongoDB Setup (Optional)

1. **Install MongoDB Community Edition**
   - [Download MongoDB](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB Service**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Update .env**
   ```env
   MONGO_URI=mongodb://localhost:27017/todo-mern-app
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Port
PORT=5000

# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-mern-app?retryWrites=true&w=majority

# Environment
NODE_ENV=development
```

### Frontend (src/services/api.js)
The API base URL is configured in `src/services/api.js`:
```javascript
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});
```

## 🎨 Styling

The application uses **Tailwind CSS** with custom configurations:

- **Color Scheme**: Blue and purple gradients
- **Typography**: Modern, clean fonts
- **Spacing**: Consistent padding and margins
- **Responsive**: Mobile-first design approach
- **Components**: Reusable, modular components

### Custom Tailwind Classes
```css
.btn-primary - Primary action button
.btn-secondary - Secondary action button
.card - Card container
.card-hover - Card with hover effect
.text-gradient - Gradient text effect
```

## 🧠 State Management

### Context API Usage
The `TaskContext` provides global state management:

```javascript
import { useTask } from './context/TaskContext';

// Inside component:
const { 
  tasks, 
  loading, 
  getTasks, 
  addTask, 
  updateTaskData,
  deleteTask,
  toggleTaskStatus 
} = useTask();
```

## 🚀 Build for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Creates optimized build in `dist/` folder.

### Backend Deployment
Ready to deploy on services like:
- Heroku
- Railway
- Render
- Fly.io
- DigitalOcean

## 📝 Task Model

```javascript
{
  _id: ObjectId,
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  completed: Boolean (default: false),
  priority: String enum ['Low', 'Medium', 'High'] (default: 'Medium'),
  category: String,
  dueDate: Date,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
# Change PORT in .env
PORT=5001

# Make sure MongoDB URI is correct in .env
# Test connection with MongoDB Compass
```

### Frontend Won't Connect to Backend
```bash
# Check backend is running on port 5000
# Verify API base URL in src/services/api.js
# Check CORS is enabled in backend
```

### MongoDB Connection Error
```bash
# Verify connection string in .env
# Check MongoDB Atlas firewall settings
# Add your IP to IP Whitelist
# Check username and password are correct
```

### Port Already in Use
```bash
# Frontend (change in vite.config.js)
# Backend (change in .env)

# Or kill process using the port:
# Windows: netstat -ano | findstr :5000
# Linux/Mac: lsof -i :5000
```

## 🔄 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CORS Error | Backend must have `cors()` middleware |
| Tasks not loading | Check MongoDB connection |
| Can't create task | Verify required fields in form |
| Duplicate tasks | Check for double submission |
| Delete not working | Verify task ID exists |

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com)

## 🚀 Future Enhancements

- [ ] Dark mode toggle
- [ ] User authentication
- [ ] Task sharing and collaboration
- [ ] Due date reminders/notifications
- [ ] Recurring tasks
- [ ] Task subtasks
- [ ] Rich text editor for descriptions
- [ ] File attachments
- [ ] Task templates
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration
- [ ] Drag-and-drop ordering
- [ ] Keyboard shortcuts
- [ ] Voice input

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built with ❤️ as a complete MERN stack learning project.

## 💬 Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Review the API endpoints
3. Check MongoDB connection
4. Verify all dependencies are installed

---

**Happy Task Managing! 🚀**

Manage your tasks efficiently with our modern Todo MERN App.
