import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Users, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">{t('home.welcome')}</h1>
      <p className="text-xl mb-8">{t('home.description')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-semibold mb-2">{t('home.features.scheduleEvents')}</h2>
          <p>{t('home.features.scheduleEventsDesc')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-semibold mb-2">{t('home.features.inviteFriends')}</h2>
          <p>{t('home.features.inviteFriendsDesc')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookOpen className="mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-semibold mb-2">{t('home.features.exploreScenarios')}</h2>
          <p>{t('home.features.exploreScenariosDesc')}</p>
        </div>
      </div>

      {user ? (
        <Link to="/events/create" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
          {t('home.createEvent')}
        </Link>
      ) : (
        <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
          {t('home.login')}
        </Link>
      )}
    </div>
  )
}

export default Home