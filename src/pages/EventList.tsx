import React from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from '../contexts/EventContext'
import { Calendar, MapPin, Users } from 'lucide-react'

const EventList: React.FC = () => {
  const { events } = useEvents()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events scheduled. Why not create one?</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2" size={18} />
                <span>{new Date(event.date).toLocaleString()}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="mr-2" size={18} />
                <span>{event.location} ({event.isOnline ? 'Online' : 'In-person'})</span>
              </div>
              <div className="flex items-center mb-4">
                <Users className="mr-2" size={18} />
                <span>{event.participants.length} / {event.maxParticipants} participants</span>
              </div>
              <Link
                to={`/events/${event.id}`}
                className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link
          to="/events/create"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Create New Event
        </Link>
      </div>
    </div>
  )
}

export default EventList