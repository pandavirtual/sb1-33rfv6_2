import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EventCreate from './pages/EventCreate'
import EventList from './pages/EventList'
import { AuthProvider } from './contexts/AuthContext'
import { EventProvider } from './contexts/EventContext'

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events/create" element={<EventCreate />} />
                <Route path="/events" element={<EventList />} />
              </Routes>
            </main>
          </div>
        </Router>
      </EventProvider>
    </AuthProvider>
  )
}

export default App