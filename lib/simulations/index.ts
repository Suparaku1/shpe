import { simulation1 } from "./simulation-1"
import { simulation2 } from "./simulation-2"
import { simulation3 } from "./simulation-3"
import { simulation4 } from "./simulation-4"
import { simulation5 } from "./simulation-5"
import { simulation6 } from "./simulation-6"
import { simulation7 } from "./simulation-7"

export type ScenarioStep = {
  id: number
  type: "situate" | "ndodhi" | "pyetje" | "tekst" | "telefonata" | "mesazh"
  location: "laborator" | "security" | "ambjent" | "pajisje" | "mikrotik" | "serveroom"
  content: string
  question: string
  options: { id: number; text: string; correct: boolean }[]
  explanation: string
}

export type TestQuestion = {
  id: number
  question: string
  options: { id: number; text: string; correct: boolean }[]
}

export type ElaborationQuestion = {
  question: string
  keywords: string[]
}

export type SimulationData = {
  id: number
  title: string
  description: string
  icon: string
  context: string
  steps: ScenarioStep[]
  testQuestions: TestQuestion[]
  elaborationQuestion: ElaborationQuestion
}

export const allSimulations: SimulationData[] = [
  simulation1,
  simulation2,
  simulation3,
  simulation4,
  simulation5,
  simulation6,
  simulation7,
]

export function getSimulationById(id: number): SimulationData | undefined {
  return allSimulations.find((s) => s.id === id)
}
