"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User } from "lucide-react"
import type { SimulationData } from "@/lib/simulations"
import Image from "next/image"

interface RegistrationFormProps {
  simulation: SimulationData
  onSubmit: (name: string, surname: string) => void
  onBack: () => void
}

export function RegistrationForm({ simulation, onSubmit, onBack }: RegistrationFormProps) {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && surname.trim()) {
      onSubmit(name.trim(), surname.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2744] to-[#0f172a] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1e293b] border-[#334155]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Shkolla Profesionale Elbasan"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-white text-2xl">{simulation.title}</CardTitle>
          <CardDescription className="text-[#94a3b8]">
            Plotesoni emrin per te marre certifikaten ne fund
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#94a3b8]">
                Emri
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Shkruani emrin tuaj"
                  className="pl-10 bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b] focus:border-[#22d3ee]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="surname" className="text-[#94a3b8]">
                Mbiemri
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                <Input
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Shkruani mbiemrin tuaj"
                  className="pl-10 bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b] focus:border-[#22d3ee]"
                  required
                />
              </div>
            </div>

            <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
              <h4 className="text-[#22d3ee] font-medium mb-2">Rreth Simulimit:</h4>
              <p className="text-[#94a3b8] text-sm">{simulation.context}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-[#334155] text-[#94a3b8] rounded">Faza 1: 10 Skenare</span>
                <span className="text-xs px-2 py-1 bg-[#334155] text-[#94a3b8] rounded">Faza 2: 10 Pyetje</span>
                <span className="text-xs px-2 py-1 bg-[#334155] text-[#94a3b8] rounded">Faza 3: Shtjellim</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 border-[#334155] text-[#94a3b8] hover:bg-[#334155] hover:text-white bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kthehu
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0f172a] font-semibold"
                disabled={!name.trim() || !surname.trim()}
              >
                Fillo Simulimin
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
