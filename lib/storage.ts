import type { ParticipantResult } from "./types"

const PARTICIPANTS_KEY = "cyberaware_participants"
const COMPLETED_SIMULATIONS_KEY = "cyberaware_completed_simulations"

export function saveParticipantResult(result: ParticipantResult): void {
  const results = getParticipantResults()
  const existingIndex = results.findIndex((r) => r.id === result.id)

  if (existingIndex >= 0) {
    results[existingIndex] = result
  } else {
    results.push(result)
  }

  localStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(results))

  if (result.passed) {
    markSimulationCompleted(result.name, result.surname, result.simulationId)
  }
}

export function getParticipantResults(): ParticipantResult[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(PARTICIPANTS_KEY)
  return stored ? JSON.parse(stored) : []
}

export function getParticipantById(id: string): ParticipantResult | null {
  const results = getParticipantResults()
  return results.find((r) => r.id === id) || null
}

export function clearAllData(): void {
  localStorage.removeItem(PARTICIPANTS_KEY)
  localStorage.removeItem(COMPLETED_SIMULATIONS_KEY)
}

type CompletedSimulations = {
  [userKey: string]: number[] // array of simulation IDs
}

export function markSimulationCompleted(name: string, surname: string, simulationId: number): void {
  if (typeof window === "undefined") return
  const userKey = `${name.toLowerCase()}_${surname.toLowerCase()}`
  const completed = getCompletedSimulations()

  if (!completed[userKey]) {
    completed[userKey] = []
  }

  if (!completed[userKey].includes(simulationId)) {
    completed[userKey].push(simulationId)
  }

  localStorage.setItem(COMPLETED_SIMULATIONS_KEY, JSON.stringify(completed))
}

export function getCompletedSimulations(): CompletedSimulations {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(COMPLETED_SIMULATIONS_KEY)
  return stored ? JSON.parse(stored) : {}
}

export function getUserCompletedSimulations(name: string, surname: string): number[] {
  const userKey = `${name.toLowerCase()}_${surname.toLowerCase()}`
  const completed = getCompletedSimulations()
  return completed[userKey] || []
}

export function hasCompletedAllSimulations(name: string, surname: string): boolean {
  const completed = getUserCompletedSimulations(name, surname)
  return completed.length >= 7
}
