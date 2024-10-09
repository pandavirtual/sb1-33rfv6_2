import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext'
import { LogIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface GoogleUser {
  email: string
  name: string
  picture: string
}

const Login: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get<GoogleUser>(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        )

        const user = {
          id: userInfo.data.email,
          name: userInfo.data.name,
          email: userInfo.data.email,
          profilePicture: userInfo.data.picture,
          playedScenarios: [],
          friends: [],
        }

        login(user)
        navigate('/')
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    },
    onError: (error) => console.error('Login Failed:', error)
  })

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t('login.title')}
      </h2>
      <p className="text-center mb-6 text-gray-600">
        {t('login.description')}
      </p>
      <button
        onClick={() => handleGoogleLogin()}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-red-700 transition duration-300"
      >
        <LogIn className="mr-2" size={20} />
        {t('login.googleButton')}
      </button>
    </div>
  )
}

export default Login