import { Scenario, Creator, Tag } from '../types'

// Mock data
const scenarios: Scenario[] = [
  {
    id: 1,
    title: "The Haunted Mansion",
    minPlayerCount: 4,
    maxPlayerCount: 8,
    duration: "2-3 hours",
    description: "A spooky adventure in a haunted mansion.",
    gmRequired: "No",
    url: "https://example.com/haunted-mansion",
    creators: ["Jane Doe"],
    tags: ["Horror", "Beginner-friendly"]
  },
  {
    id: 2,
    title: "The Spy Network",
    minPlayerCount: 6,
    maxPlayerCount: 12,
    duration: "3-4 hours",
    description: "Uncover a network of spies in this thrilling mystery.",
    gmRequired: "Yes",
    url: "https://example.com/spy-network",
    creators: ["John Smith", "Alice Johnson"],
    tags: ["Espionage", "Advanced"]
  },
  // Add more mock scenarios here
]

const creators: Creator[] = [
  { id: 1, name: "Jane Doe" },
  { id: 2, name: "John Smith" },
  { id: 3, name: "Alice Johnson" },
]

const tags: Tag[] = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Beginner-friendly" },
  { id: 3, name: "Espionage" },
  { id: 4, name: "Advanced" },
]

export const getScenarios = async (
  search: string = '',
  minPlayers?: number,
  maxPlayers?: number,
  tags: string[] = []
): Promise<Scenario[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return scenarios.filter(scenario => {
    const matchesSearch = scenario.title.toLowerCase().includes(search.toLowerCase()) ||
      scenario.description.toLowerCase().includes(search.toLowerCase())
    const matchesPlayerCount = (minPlayers === undefined || scenario.maxPlayerCount >= minPlayers) &&
      (maxPlayers === undefined || scenario.minPlayerCount <= maxPlayers)
    const matchesTags = tags.length === 0 || tags.every(tag => scenario.tags.includes(tag))

    return matchesSearch && matchesPlayerCount && matchesTags
  })
}

export const getCreators = async (): Promise<Creator[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return creators
}

export const getTags = async (): Promise<Tag[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return tags
}