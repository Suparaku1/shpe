"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, Award, Users, Download, Search, CheckCircle, XCircle, FileText, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { getParticipantResults, type ParticipantResult } from "@/lib/storage"
import Image from "next/image"
import JsBarcode from "jsbarcode"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [results, setResults] = useState<ParticipantResult[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [generating, setGenerating] = useState<string | null>(null)

  useEffect(() => {
    setResults(getParticipantResults())
  }, [])

  const filteredResults = results.filter(
    (r) =>
      `${r.name} ${r.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.simulationTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const passedResults = results.filter((r) => r.passed)
  const totalCertificates = passedResults.length

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("sq-AL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const generateCertificate = async (result: ParticipantResult) => {
    if (!result.passed) return
    setGenerating(result.id)

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // A4 landscape dimensions
    canvas.width = 1123
    canvas.height = 794

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#1a2744")
    gradient.addColorStop(1, "#0f172a")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Decorative border
    ctx.strokeStyle = "#22d3ee"
    ctx.lineWidth = 4
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 2
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)

    // Draw Shkolla Profesionale Elbasan logo at the very top
    const logoImg = new window.Image()
    logoImg.crossOrigin = "anonymous"
    logoImg.src = "/images/logo.png"

    await new Promise((resolve) => {
      logoImg.onload = resolve
      logoImg.onerror = resolve
    })

    // Draw main school logo centered at top
    ctx.drawImage(logoImg, canvas.width / 2 - 50, 40, 100, 100)

    // School name under logo
    ctx.fillStyle = "#22d3ee"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText("SHKOLLA PROFESIONALE ELBASAN", canvas.width / 2, 165)

    // Certificate title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 36px Arial"
    ctx.fillText("CERTIFIKATË", canvas.width / 2, 210)

    ctx.fillStyle = "#94a3b8"
    ctx.font = "16px Arial"
    ctx.fillText("CyberAware Training Platform - Trajnim për Sigurinë Kibernetike", canvas.width / 2, 240)

    // Recipient name
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 28px Arial"
    ctx.fillText(`${result.name} ${result.surname}`, canvas.width / 2, 300)

    ctx.fillStyle = "#94a3b8"
    ctx.font = "16px Arial"
    ctx.fillText("ka përfunduar me sukses simulimin:", canvas.width / 2, 330)

    ctx.fillStyle = "#22d3ee"
    ctx.font = "bold 20px Arial"
    ctx.fillText(result.simulationTitle, canvas.width / 2, 360)

    // Score
    ctx.fillStyle = "#10b981"
    ctx.font = "bold 42px Arial"
    ctx.fillText(`${result.totalScore}%`, canvas.width / 2, 420)

    ctx.fillStyle = "#94a3b8"
    ctx.font = "14px Arial"
    ctx.fillText(
      `Faza 1: ${result.phase1Score}% | Faza 2: ${result.phase2Score}% | Faza 3: ${result.phase3Score}%`,
      canvas.width / 2,
      445,
    )

    // Date
    const today = new Date().toLocaleDateString("sq-AL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    ctx.fillStyle = "#e2e8f0"
    ctx.font = "14px Arial"
    ctx.fillText(`Data: ${today}`, canvas.width / 2, 475)

    // Partner logos section
    ctx.fillStyle = "#64748b"
    ctx.font = "11px Arial"
    ctx.fillText("Mbështetur nga:", canvas.width / 2, 510)

    const partnerNames = [
      "Elite Academy",
      "Switch Technologies",
      "Vodafone AL",
      "One Albania",
      "Digispark",
      "Web Master",
      "Best Cable",
      "Bashkia Elbasan",
      "Qendra për Fëmijët me Aftësi Ndryshe",
      "Qendra Zëra Jetë",
    ]

    ctx.fillStyle = "#94a3b8"
    ctx.font = "9px Arial"
    const partnersPerRow = 5
    for (let i = 0; i < partnerNames.length; i++) {
      const row = Math.floor(i / partnersPerRow)
      const col = i % partnersPerRow
      const x = 120 + col * 180
      const y = 535 + row * 20
      ctx.fillText(partnerNames[i], x, y)
    }

    // Signatures section
    const sigY = 620
    const sigSpacing = 280

    // Drejtori
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 13px Arial"
    ctx.fillText("Leonidha Haxhinikolla", canvas.width / 2 - sigSpacing, sigY)
    ctx.fillStyle = "#64748b"
    ctx.font = "11px Arial"
    ctx.fillText("Drejtori i Shkollës", canvas.width / 2 - sigSpacing, sigY + 18)

    // Supervizor
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 13px Arial"
    ctx.fillText("Juljan Kasapi", canvas.width / 2, sigY)
    ctx.fillStyle = "#64748b"
    ctx.font = "11px Arial"
    ctx.fillText("Supervizor", canvas.width / 2, sigY + 18)

    // Krijuesi
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 13px Arial"
    ctx.fillText("Prof. Esmerald Suparaku", canvas.width / 2 + sigSpacing, sigY)
    ctx.fillStyle = "#64748b"
    ctx.font = "11px Arial"
    ctx.fillText("Krijuesi i Projektit", canvas.width / 2 + sigSpacing, sigY + 18)

    // Barcode
    const barcodeCanvas = document.createElement("canvas")
    JsBarcode(barcodeCanvas, result.id.substring(0, 12), {
      format: "CODE128",
      width: 1,
      height: 35,
      displayValue: true,
      fontSize: 9,
      background: "transparent",
      lineColor: "#94a3b8",
    })
    ctx.drawImage(barcodeCanvas, canvas.width / 2 - 70, 700, 140, 55)

    // Certificate ID
    ctx.fillStyle = "#64748b"
    ctx.font = "9px Arial"
    ctx.fillText(`ID: ${result.id}`, canvas.width / 2, 770)

    // Download
    const link = document.createElement("a")
    link.download = `Certifikate_${result.name}_${result.surname}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()

    setGenerating(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2744] to-[#0f172a] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#22d3ee] bg-white p-1">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Paneli i Administratorit</h1>
              <p className="text-[#94a3b8]">Prof. Esmerald Suparaku</p>
            </div>
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#1e293b] border-[#334155]">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{results.length}</div>
                <div className="text-[#94a3b8] text-sm">Total Pjesëmarrës</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e293b] border-[#334155]">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{totalCertificates}</div>
                <div className="text-[#94a3b8] text-sm">Certifikata të Gjeneruara</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e293b] border-[#334155]">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#22d3ee]/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#22d3ee]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {results.length > 0 ? Math.round((passedResults.length / results.length) * 100) : 0}%
                </div>
                <div className="text-[#94a3b8] text-sm">Shkalla e Kalimit</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748b]" />
            <Input
              placeholder="Kërko sipas emrit ose simulimit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b] focus:border-[#22d3ee]"
            />
          </div>
        </div>

        {/* Results Table */}
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#22d3ee]" />
              Certifikatat e Gjeneruara ({totalCertificates})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredResults.length === 0 ? (
              <div className="text-center py-12 text-[#64748b]">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nuk ka rezultate ende</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-[#334155] hover:border-[#22d3ee]/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          result.passed ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {result.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {result.name} {result.surname}
                        </div>
                        <div className="text-[#64748b] text-sm">{result.simulationTitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${result.passed ? "text-green-400" : "text-red-400"}`}>
                          {result.totalScore}%
                        </div>
                        <div className="text-[#64748b] text-xs">Rezultati</div>
                      </div>

                      <Badge
                        className={
                          result.passed
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {result.passed ? "KALUAR" : "NGELUR"}
                      </Badge>

                      <div className="flex items-center gap-2 text-[#64748b] text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(result.completedAt || result.startedAt)}
                      </div>

                      {result.passed && (
                        <Button
                          size="sm"
                          onClick={() => generateCertificate(result)}
                          disabled={generating === result.id}
                          className="bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0f172a]"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {generating === result.id ? "..." : "Shkarko"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
