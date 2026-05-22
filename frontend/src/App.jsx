import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TaskProvider } from './context/TaskContext';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import TaskDetails from './pages/TaskDetails';
import './index.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Navbar />

          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/add' element={<AddTask />} />
              <Route path='/edit/:id' element={<EditTask />} />
              <Route path='/task/:id' element={<TaskDetails />} />
            </Routes>
          </main>

          <Footer />

          {/* Toast Notifications */}
          <Toaster
            position='bottom-right'
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
