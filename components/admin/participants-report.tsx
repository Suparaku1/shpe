"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle, XCircle, Download, TrendingUp, Trash2 } from "lucide-react"
import { getParticipantResults, clearAllData } from "@/lib/storage"
import type { ParticipantResult } from "@/lib/types"

export function ParticipantsReport() {
  const [participants, setParticipants] = useState<ParticipantResult[]>([])

  useEffect(() => {
    setParticipants(getParticipantResults())
  }, [])

  const passedParticipants = participants.filter((p) => p.passed)
  const averageScore =
    participants.length > 0
      ? Math.round(participants.reduce((sum, p) => sum + p.totalScore, 0) / participants.length)
      : 0

  const handleExportCSV = () => {
    const headers = ["Emri", "Mbiemri", "Simulimi", "Faza 1 %", "Faza 2 %", "Faza 3 %", "Total %", "Kaluar", "Data"]
    const rows = participants.map((p) => [
      p.name,
      p.surname,
      p.simulationTitle,
      p.phase1Score.toString(),
      p.phase2Score.toString(),
      p.phase3Score.toString(),
      p.totalScore.toString(),
      p.passed ? "Po" : "Jo",
      p.completedAt ? new Date(p.completedAt).toLocaleDateString("sq-AL") : "-",
    ])

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `raport-simulimi-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const handleClearData = () => {
    if (confirm("Jeni të sigurt që doni të fshini të gjitha të dhënat?")) {
      clearAllData()
      setParticipants([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{participants.length}</p>
                <p className="text-sm text-[#64748b]">Gjithsej</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{passedParticipants.length}</p>
                <p className="text-sm text-[#64748b]">Kaluar (70%+)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{participants.length - passedParticipants.length}</p>
                <p className="text-sm text-[#64748b]">Ngelur</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-[#334155]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#22d3ee]/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#22d3ee]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{averageScore}%</p>
                <p className="text-sm text-[#64748b]">Mesatarja</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participants Table */}
      <Card className="bg-[#1e293b] border-[#334155]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Lista e Pjesëmarrësve</CardTitle>
              <CardDescription className="text-[#64748b]">Të gjithë pjesëmarrësit në simulime</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleExportCSV}
                disabled={participants.length === 0}
                className="border-[#334155] text-[#94a3b8] hover:bg-[#334155] hover:text-white bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Eksporto CSV
              </Button>
              <Button
                variant="outline"
                onClick={handleClearData}
                disabled={participants.length === 0}
                className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Fshi të Gjitha
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {participants.length === 0 ? (
            <p className="text-center text-[#64748b] py-8">
              Ende nuk ka pjesëmarrës. Zgjidhni një simulim për të filluar.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left py-3 px-4 font-semibold text-[#94a3b8]">Emri</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#94a3b8]">Simulimi</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#94a3b8]">Faza 1</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#94a3b8]">Faza 2</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#94a3b8]">Faza 3</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#94a3b8]">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#94a3b8]">Statusi</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p) => (
                    <tr key={p.id} className="border-b border-[#334155] hover:bg-[#334155]/30">
                      <td className="py-3 px-4 text-white">
                        {p.name} {p.surname}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#94a3b8] text-sm">{p.simulationTitle}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#22d3ee]">{p.phase1Score}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#22d3ee]">{p.phase2Score}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#22d3ee]">{p.phase3Score}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${p.totalScore >= 70 ? "text-green-400" : "text-red-400"}`}>
                          {p.totalScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {p.passed ? (
                          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Kaluar</Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">Ngelur</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
