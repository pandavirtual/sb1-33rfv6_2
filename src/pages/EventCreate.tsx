import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEvents } from '../contexts/EventContext'
import { Calendar, MapPin, Users, BookOpen } from 'lucide-react'
import ScenarioSelector from '../components/ScenarioSelector'
import { Scenario } from '../types'

const EventCreate: React.FC = () => {
  const { user } = useAuth()
  const { addEvent } = useEvents()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [isOnline, setIsOnline] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [maxParticipants, setMaxParticipants] = useState(5)
  const [description, setDescription] = useState('')
  const [showScenarioSelector, setShowScenarioSelector] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user && selectedScenario) {
      const newEvent = {
        id: Date.now().toString(),
        title,
        date,
        location,
        isOnline,
        scenarioId: selectedScenario.id.toString(),
        maxParticipants,
        description,
        organizer: user.id,
        participants: [user.id],
        invitees: [],
      }
      addEvent(newEvent)
      navigate('/events')
    }
  }

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setShowScenarioSelector(false)
    setMaxParticipants(scenario.maxPlayerCount)
  }

  if (!user) {
    return <div>Please log in to create an event.</div>
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block mr-1" size={18} />
            Event Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block mr-1" size={18} />
            Date and Time
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline-block mr-1" size={18} />
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Online Event</span>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="scenario" className="block text-sm font-medium text-gray-700 mb-1">
            <BookOpen className="inline-block mr-1" size={18} />
            Scenario
          </label>
          {selectedScenario ? (
            <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
              <span>{selectedScenario.title}</span>
              <button
                type="button"
                onClick={() => setShowScenarioSelector(true)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Change
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowScenarioSelector(true)}
              className="w-full text-left px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              Select a scenario
            </button>
          )}
        </div>
        {showScenarioSelector && (
          <div className="mb-4">
            <ScenarioSelector onSelect={handleScenarioSelect} />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
            <Users className="inline-block mr-1" size={18} />
            Max Participants
          </label>
          <input
            type="number"
            id="maxParticipants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
            min={selectedScenario?.minPlayerCount || 2}
            max={selectedScenario?.maxPlayerCount}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Event Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          disabled={!selectedScenario}
        >
          Create Event
        </button>
      </form>
    </div>
  )
}

export default EventCreate