export interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
  bio?: string
  playedScenarios: string[]
  friends: string[]
}

export interface Event {
  id: string
  title: string
  date: string
  location: string
  isOnline: boolean
  scenarioId: string
  maxParticipants: number
  description: string
  organizer: string
  participants: string[]
  invitees: string[]
}

export interface Scenario {
  id: number
  title: string
  minPlayerCount: number
  maxPlayerCount: number
  duration: string
  description: string
  gmRequired: string
  url: string
  creators: string[]
  tags: string[]
}

export interface Creator {
  id: number
  name: string
}

export interface Tag {
  id: number
  name: string
}