"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Eye } from "lucide-react"
import { getParticipantResults } from "@/lib/storage"
import type { ParticipantResult } from "@/lib/types"
import { partnerLogos, certificateSignatures } from "@/lib/types"
import JsBarcode from "jsbarcode"

export function CertificateGenerator() {
  const [participants, setParticipants] = useState<ParticipantResult[]>([])
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantResult | null>(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    const allParticipants = getParticipantResults()
    // Only show participants who passed (70%+)
    setParticipants(allParticipants.filter((p) => p.passed))
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("sq-AL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const generateCertificatePNG = async (participant: ParticipantResult) => {
    setGenerating(true)

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setGenerating(false)
      return
    }

    // A4 landscape dimensions (at 96 DPI - higher resolution)
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

    // Corner decorations
    const cornerSize = 30
    ctx.fillStyle = "#22d3ee"
    // Top left
    ctx.fillRect(20, 20, cornerSize, 4)
    ctx.fillRect(20, 20, 4, cornerSize)
    // Top right
    ctx.fillRect(canvas.width - 20 - cornerSize, 20, cornerSize, 4)
    ctx.fillRect(canvas.width - 24, 20, 4, cornerSize)
    // Bottom left
    ctx.fillRect(20, canvas.height - 24, cornerSize, 4)
    ctx.fillRect(20, canvas.height - 20 - cornerSize, 4, cornerSize)
    // Bottom right
    ctx.fillRect(canvas.width - 20 - cornerSize, canvas.height - 24, cornerSize, 4)
    ctx.fillRect(canvas.width - 24, canvas.height - 20 - cornerSize, 4, cornerSize)

    // Header - Title
    ctx.fillStyle = "#22d3ee"
    ctx.font = "bold 42px Arial"
    ctx.textAlign = "center"
    ctx.fillText("CERTIFIKATË", canvas.width / 2, 85)

    ctx.fillStyle = "#94a3b8"
    ctx.font = "20px Arial"
    ctx.fillText("Shkolla Profesionale Elbasan", canvas.width / 2, 115)

    // Subtitle
    ctx.fillStyle = "#e2e8f0"
    ctx.font = "16px Arial"
    ctx.fillText("CyberAware Training Platform - Trajnim për Sigurinë Kibernetike", canvas.width / 2, 145)

    // Decorative line
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(200, 165)
    ctx.lineTo(canvas.width - 200, 165)
    ctx.stroke()

    // Recipient name
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 32px Arial"
    ctx.fillText(`${participant.name} ${participant.surname}`, canvas.width / 2, 210)

    // Achievement text
    ctx.fillStyle = "#94a3b8"
    ctx.font = "18px Arial"
    ctx.fillText("ka përfunduar me sukses simulimin:", canvas.width / 2, 245)

    ctx.fillStyle = "#22d3ee"
    ctx.font = "bold 24px Arial"
    ctx.fillText(participant.simulationTitle, canvas.width / 2, 280)

    // Score display
    ctx.fillStyle = "#10b981"
    ctx.font = "bold 56px Arial"
    ctx.fillText(`${participant.totalScore}%`, canvas.width / 2, 350)

    ctx.fillStyle = "#94a3b8"
    ctx.font = "14px Arial"
    ctx.fillText(
      `Faza 1: ${participant.phase1Score}%  |  Faza 2: ${participant.phase2Score}%  |  Faza 3: ${participant.phase3Score}%`,
      canvas.width / 2,
      380,
    )

    // Date
    ctx.fillStyle = "#e2e8f0"
    ctx.font = "16px Arial"
    ctx.fillText(`Data: ${formatDate(participant.completedAt || new Date().toISOString())}`, canvas.width / 2, 415)

    // Partner logos section header
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Arial"
    ctx.fillText("Mbështetur nga:", canvas.width / 2, 450)

    // Partner names in two rows
    ctx.fillStyle = "#94a3b8"
    ctx.font = "11px Arial"
    const row1 = partnerLogos
      .slice(0, 6)
      .map((p) => p.name)
      .join("  •  ")
    const row2 = partnerLogos
      .slice(6)
      .map((p) => p.name)
      .join("  •  ")
    ctx.fillText(row1, canvas.width / 2, 475)
    ctx.fillText(row2, canvas.width / 2, 495)

    // Signatures section - three signatures
    const sigY = 560

    // Director - Left
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.fillText(certificateSignatures.director.name, 200, sigY)
    ctx.strokeStyle = "#334155"
    ctx.beginPath()
    ctx.moveTo(120, sigY + 10)
    ctx.lineTo(280, sigY + 10)
    ctx.stroke()
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Arial"
    ctx.fillText(certificateSignatures.director.title, 200, sigY + 30)

    // Supervisor - Center
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.fillText(certificateSignatures.supervisor.name, canvas.width / 2, sigY)
    ctx.strokeStyle = "#334155"
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 80, sigY + 10)
    ctx.lineTo(canvas.width / 2 + 80, sigY + 10)
    ctx.stroke()
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Arial"
    ctx.fillText(certificateSignatures.supervisor.title, canvas.width / 2, sigY + 30)

    // Creator - Right
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.fillText(certificateSignatures.creator.name, canvas.width - 200, sigY)
    ctx.strokeStyle = "#334155"
    ctx.beginPath()
    ctx.moveTo(canvas.width - 280, sigY + 10)
    ctx.lineTo(canvas.width - 120, sigY + 10)
    ctx.stroke()
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Arial"
    ctx.fillText(certificateSignatures.creator.title, canvas.width - 200, sigY + 30)

    // Generate barcode
    const barcodeCanvas = document.createElement("canvas")
    JsBarcode(barcodeCanvas, participant.id.substring(0, 14).toUpperCase(), {
      format: "CODE128",
      width: 1.5,
      height: 50,
      displayValue: true,
      fontSize: 12,
      background: "transparent",
      lineColor: "#94a3b8",
      margin: 0,
    })

    // Draw barcode at bottom center
    ctx.drawImage(barcodeCanvas, canvas.width / 2 - 100, 670, 200, 70)

    // Certificate ID
    ctx.fillStyle = "#64748b"
    ctx.font = "10px Arial"
    ctx.fillText(`ID: ${participant.id}`, canvas.width / 2, 760)

    // Download
    const link = document.createElement("a")
    link.download = `Certifikate_${participant.name}_${participant.surname}_${participant.simulationTitle.replace(/\s+/g, "_")}.png`
    link.href = canvas.toDataURL("image/png", 1.0)
    link.click()

    setGenerating(false)
  }

  const handleDownloadAll = async () => {
    for (const p of participants) {
      await generateCertificatePNG(p)
      // Small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-[#1e293b] border-[#334155]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-[#22d3ee]" />
                Gjenerimi i Certifikatave
              </CardTitle>
              <CardDescription className="text-[#64748b]">
                Gjeneroni certifikata PNG për pjesëmarrësit që kanë kaluar (70%+)
              </CardDescription>
            </div>
            {participants.length > 0 && (
              <Button
                onClick={handleDownloadAll}
                className="bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0f172a]"
                disabled={generating}
              >
                <Download className="w-4 h-4 mr-2" />
                Shkarko të Gjitha
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Preview */}
      {selectedParticipant && (
        <Card className="bg-[#1e293b] border-[#334155]">
          <CardHeader>
            <CardTitle className="text-white">Paraparje e Certifikatës</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[297/210] bg-gradient-to-br from-[#1a2744] to-[#0f172a] rounded-lg p-4 border-2 border-[#22d3ee]">
              <div className="w-full h-full border border-[#334155] rounded-lg p-6 flex flex-col items-center justify-between">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#22d3ee] mb-1">CERTIFIKATË</h2>
                  <p className="text-[#94a3b8] text-sm">Shkolla Profesionale Elbasan</p>
                </div>

                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-2">
                    {selectedParticipant.name} {selectedParticipant.surname}
                  </p>
                  <p className="text-[#94a3b8] text-sm mb-2">ka përfunduar me sukses:</p>
                  <p className="text-[#22d3ee] font-semibold">{selectedParticipant.simulationTitle}</p>
                  <p className="text-3xl font-bold text-green-400 mt-3">{selectedParticipant.totalScore}%</p>
                </div>

                <div className="flex justify-between w-full px-8 text-center">
                  <div>
                    <p className="font-semibold text-white text-sm">{certificateSignatures.director.name}</p>
                    <p className="text-xs text-[#64748b]">{certificateSignatures.director.title}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{certificateSignatures.supervisor.name}</p>
                    <p className="text-xs text-[#64748b]">{certificateSignatures.supervisor.title}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{certificateSignatures.creator.name}</p>
                    <p className="text-xs text-[#64748b]">{certificateSignatures.creator.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Participants List */}
      <Card className="bg-[#1e293b] border-[#334155]">
        <CardHeader>
          <CardTitle className="text-white">Pjesëmarrësit e Kualifikuar ({participants.length})</CardTitle>
          <CardDescription className="text-[#64748b]">
            Vetëm pjesëmarrësit me rezultat mbi 70% mund të marrin certifikatë
          </CardDescription>
        </CardHeader>
        <CardContent>
          {participants.length === 0 ? (
            <p className="text-center text-[#64748b] py-8">
              Ende nuk ka pjesëmarrës të kualifikuar për certifikatë (duhet mbi 70%).
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-[#0f172a] rounded-lg border border-[#334155]"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {p.name} {p.surname}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#94a3b8] text-xs">{p.simulationTitle}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-500/20 text-green-400">{p.totalScore}%</Badge>
                      <span className="text-[#64748b] text-xs">{p.completedAt ? formatDate(p.completedAt) : ""}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedParticipant(p)}
                      className="border-[#334155] text-[#94a3b8] hover:bg-[#334155] hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => generateCertificatePNG(p)}
                      disabled={generating}
                      className="bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0f172a]"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
