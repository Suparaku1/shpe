"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { allSimulations, type SimulationData } from "@/lib/simulations"
import { Mail, Shield, Wifi, Server, Users, Lock, FileWarning, LogOut, User, CheckCircle, Award } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getUserCompletedSimulations, hasCompletedAllSimulations } from "@/lib/storage"

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Wifi: <Wifi className="w-8 h-8" />,
  Server: <Server className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Lock: <Lock className="w-8 h-8" />,
  FileWarning: <FileWarning className="w-8 h-8" />,
}

interface SimulationSelectorProps {
  participantName: { name: string; surname: string }
  onSelect: (simulation: SimulationData) => void
  onLogout: () => void
}

export function SimulationSelector({ participantName, onSelect, onLogout }: SimulationSelectorProps) {
  const [completedSimulations, setCompletedSimulations] = useState<number[]>([])
  const [canGetMasterCertificate, setCanGetMasterCertificate] = useState(false)

  useEffect(() => {
    const completed = getUserCompletedSimulations(participantName.name, participantName.surname)
    setCompletedSimulations(completed)
    setCanGetMasterCertificate(hasCompletedAllSimulations(participantName.name, participantName.surname))
  }, [participantName])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a2744] to-[#0f172a]">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* User info bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#22d3ee] bg-white p-1">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CyberAware Training</h1>
                <p className="text-[#94a3b8]">Shkolla Profesionale Elbasan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] rounded-lg border border-[#334155]">
                <User className="w-4 h-4 text-[#22d3ee]" />
                <span className="text-white font-medium">
                  {participantName.name} {participantName.surname}
                </span>
              </div>
              <div className="px-3 py-2 bg-[#1e293b] rounded-lg border border-[#334155]">
                <span className="text-[#22d3ee] font-bold">{completedSimulations.length}/7</span>
                <span className="text-[#64748b] text-sm ml-1">përfunduar</span>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-[#334155] text-[#94a3b8] hover:bg-[#334155] hover:text-white bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Dil
              </Button>
            </div>
          </div>

          {/* Master Certificate Banner */}
          {canGetMasterCertificate && (
            <div className="mb-8 p-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl border-2 border-amber-500/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-400">Urime! Keni përfunduar të gjitha simulimet!</h3>
                  <p className="text-amber-300/70">Certifikata e Përgjithshme është e gatshme për shkarkim.</p>
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Zgjidhni Simulimin</h2>
            <p className="text-[#64748b]">7 simulime interaktive për trajnimin e sigurisë kibernetike</p>
          </div>

          {/* Simulation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSimulations.map((sim) => {
              const isCompleted = completedSimulations.includes(sim.id)
              return (
                <Card
                  key={sim.id}
                  className={`bg-[#1e293b] border-[#334155] hover:border-[#22d3ee] transition-all cursor-pointer hover:shadow-lg hover:shadow-[#22d3ee]/10 group relative ${isCompleted ? "border-green-500/50" : ""}`}
                  onClick={() => onSelect(sim)}
                >
                  {/* Completed badge */}
                  {isCompleted && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl ${isCompleted ? "bg-green-500/20 text-green-400" : "bg-[#22d3ee]/10 text-[#22d3ee]"} group-hover:bg-[#22d3ee]/20 transition-colors`}
                      >
                        {iconMap[sim.icon] || <Shield className="w-8 h-8" />}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg">{sim.title}</CardTitle>
                        <span className="text-xs text-[#64748b]">Simulimi {sim.id}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#94a3b8]">{sim.description}</CardDescription>
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#64748b]">
                      <span className="px-2 py-1 bg-[#334155] rounded">10 Skenare</span>
                      <span className="px-2 py-1 bg-[#334155] rounded">10 Pyetje</span>
                      <span className="px-2 py-1 bg-[#334155] rounded">1 Shtjellim</span>
                    </div>
                    {isCompleted && (
                      <div className="mt-3 text-xs text-green-400 font-medium">✓ Përfunduar me sukses</div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center text-[#64748b] text-sm">
            <p>Çdo simulim përfshin 3 faza: Skenare Interaktive, Test Final, dhe Pyetje Shtjellimi</p>
            <p className="mt-1">Certifikata gjenerohet vetëm për rezultate mbi 70%</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
