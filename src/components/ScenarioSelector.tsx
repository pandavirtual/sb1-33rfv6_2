import React, { useState, useEffect } from 'react'
import { Scenario, Tag } from '../types'
import { getScenarios, getTags } from '../services/api'
import { Search, Users } from 'lucide-react'

interface ScenarioSelectorProps {
  onSelect: (scenario: Scenario) => void
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ onSelect }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [minPlayers, setMinPlayers] = useState<number | undefined>()
  const [maxPlayers, setMaxPlayers] = useState<number | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const [scenariosData, tagsData] = await Promise.all([
        getScenarios(),
        getTags()
      ])
      setScenarios(scenariosData)
      setTags(tagsData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchScenarios = async () => {
      const filteredScenarios = await getScenarios(search, minPlayers, maxPlayers, selectedTags)
      setScenarios(filteredScenarios)
    }
    fetchScenarios()
  }, [search, minPlayers, maxPlayers, selectedTags])

  const handleTagToggle = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Select a Scenario</h3>
      <div className="mb-4">
        <div className="flex items-center border rounded-md px-3 py-2">
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search scenarios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Player Count</h4>
        <div className="flex items-center space-x-2">
          <Users size={20} className="text-gray-400" />
          <input
            type="number"
            placeholder="Min"
            value={minPlayers || ''}
            onChange={(e) => setMinPlayers(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-20 border rounded-md px-2 py-1"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPlayers || ''}
            onChange={(e) => setMaxPlayers(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-20 border rounded-md px-2 py-1"
          />
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => handleTagToggle(tag.name)}
              className={`px-2 py-1 rounded-full text-sm ${
                selectedTags.includes(tag.name)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {scenarios.map(scenario => (
          <div key={scenario.id} className="border rounded-md p-4">
            <h4 className="font-semibold">{scenario.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Users size={16} className="mr-1" />
              <span>{scenario.minPlayerCount}-{scenario.maxPlayerCount} players</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {scenario.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => onSelect(scenario)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Select Scenario
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScenarioSelector