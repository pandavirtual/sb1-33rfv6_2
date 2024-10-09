import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Edit2 } from 'lucide-react'

const Profile: React.FC = () => {
  const { user, login } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const updatedUser = { ...user, name, bio }
      login(updatedUser) // Update user in context
      setIsEditing(false)
    }
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <Edit2 className="mr-1" size={18} />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-20 h-20 rounded-full mr-4"
              />
            ) : (
              <User className="w-20 h-20 text-gray-400 mr-4" />
            )}
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          {user.bio && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Bio</h4>
              <p>{user.bio}</p>
            </div>
          )}
          <div>
            <h4 className="text-lg font-semibold mb-2">Played Scenarios</h4>
            {user.playedScenarios.length > 0 ? (
              <ul className="list-disc list-inside">
                {user.playedScenarios.map((scenario, index) => (
                  <li key={index}>{scenario}</li>
                ))}
              </ul>
            ) : (
              <p>No scenarios played yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile