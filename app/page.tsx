"use client"

import { useState } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { AdminDashboard } from "@/components/admin-dashboard"
import { SimulationSelector } from "@/components/simulation-selector"
import { SimulationRunner } from "@/components/simulation-runner"
import { CompletionScreen } from "@/components/completion-screen"
import type { SimulationData } from "@/lib/simulations"
import type { ParticipantResult } from "@/lib/types"

type AppState = "auth" | "admin" | "selection" | "simulation" | "completed"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("auth")
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationData | null>(null)
  const [participantName, setParticipantName] = useState({ name: "", surname: "" })
  const [result, setResult] = useState<ParticipantResult | null>(null)

  const handleLogin = () => {
    setAppState("admin")
  }

  const handleRegister = (name: string, surname: string) => {
    setParticipantName({ name, surname })
    setAppState("selection")
  }

  const handleSimulationSelect = (simulation: SimulationData) => {
    setSelectedSimulation(simulation)
    setAppState("simulation")
  }

  const handleSimulationComplete = (completedResult: ParticipantResult) => {
    setResult(completedResult)
    setAppState("completed")
  }

  const handleRestart = () => {
    setAppState("selection")
    setSelectedSimulation(null)
    setResult(null)
  }

  const handleLogout = () => {
    setAppState("auth")
    setParticipantName({ name: "", surname: "" })
    setSelectedSimulation(null)
    setResult(null)
  }

  if (appState === "auth") {
    return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />
  }

  if (appState === "admin") {
    return <AdminDashboard onLogout={handleLogout} />
  }

  if (appState === "selection") {
    return (
      <SimulationSelector participantName={participantName} onSelect={handleSimulationSelect} onLogout={handleLogout} />
    )
  }

  if (appState === "simulation" && selectedSimulation) {
    return (
      <SimulationRunner
        simulation={selectedSimulation}
        participantName={participantName}
        onComplete={handleSimulationComplete}
        onCancel={handleRestart}
      />
    )
  }

  if (appState === "completed" && result) {
    return <CompletionScreen result={result} onRestart={handleRestart} />
  }

  return null
}
