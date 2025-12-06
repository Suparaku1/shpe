"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, User, Briefcase, Calendar } from "lucide-react"
import type { Participant } from "@/app/page"
import type { AccessLink } from "@/lib/link-manager"

type Props = {
  accessLink: AccessLink
  onComplete: (participant: Participant) => void
}

export function ParticipantForm({ accessLink, onComplete }: Props) {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [position, setPosition] = useState<"nxenes" | "mesues">("nxenes")
  const [age, setAge] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !surname.trim() || !age) {
      setError("Ju lutem plotësoni të gjitha fushat")
      return
    }

    const ageNum = Number.parseInt(age)
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 80) {
      setError("Mosha duhet të jetë ndërmjet 10 dhe 80 vjeç")
      return
    }

    const participant: Participant = {
      id: crypto.randomUUID(),
      name: name.trim(),
      surname: surname.trim(),
      position,
      age: ageNum,
      linkId: accessLink.id,
      startedAt: new Date().toISOString(),
    }

    onComplete(participant)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2744] to-[#0f172a] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur border-0 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#1a2744] flex items-center justify-center">
              <Shield className="w-10 h-10 text-[#4fd1c5]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#1a2744]">Simulimi i Sigurisë Kibernetike</CardTitle>
          <CardDescription className="text-[#64748b]">Shkolla Profesionale Elbasan</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-[#1a2744]">
                <User className="w-4 h-4" />
                Emri
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Shkruaj emrin"
                className="border-[#e2e8f0] focus:border-[#4fd1c5] focus:ring-[#4fd1c5]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="surname" className="flex items-center gap-2 text-[#1a2744]">
                <User className="w-4 h-4" />
                Mbiemri
              </Label>
              <Input
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Shkruaj mbiemrin"
                className="border-[#e2e8f0] focus:border-[#4fd1c5] focus:ring-[#4fd1c5]"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-[#1a2744]">
                <Briefcase className="w-4 h-4" />
                Pozicioni
              </Label>
              <RadioGroup
                value={position}
                onValueChange={(v) => setPosition(v as "nxenes" | "mesues")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nxenes" id="nxenes" />
                  <Label htmlFor="nxenes" className="cursor-pointer">
                    Nxënës
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mesues" id="mesues" />
                  <Label htmlFor="mesues" className="cursor-pointer">
                    Mësues
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-[#1a2744]">
                <Calendar className="w-4 h-4" />
                Mosha
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Shkruaj moshën"
                min={10}
                max={80}
                className="border-[#e2e8f0] focus:border-[#4fd1c5] focus:ring-[#4fd1c5]"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#1a2744] hover:bg-[#243656] text-white py-6 text-lg font-semibold"
            >
              Fillo Simulimin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
