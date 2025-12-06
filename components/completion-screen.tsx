"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Award,
  CheckCircle,
  XCircle,
  Download,
  RotateCcw,
  AlertTriangle,
  Shield,
  Star,
  Zap,
  Trophy,
  Target,
} from "lucide-react"
import type { ParticipantResult } from "@/lib/types"
import { partnerLogos, certificateSignatures } from "@/lib/types"
import { hasCompletedAllSimulations, getUserCompletedSimulations } from "@/lib/storage"
import JsBarcode from "jsbarcode"

interface CompletionScreenProps {
  result: ParticipantResult
  onRestart: () => void
}

// Confetti Effect Component
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ["#22d3ee", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][
              Math.floor(Math.random() * 6)
            ],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

// Circular Progress Ring
function CircularProgress({
  percentage,
  size = 200,
  strokeWidth = 12,
  color,
}: { percentage: number; size?: number; strokeWidth?: number; color: string }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-[#e2e8f0]"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-4xl font-bold text-[#1e293b]">
          <AnimatedCounter value={percentage} suffix="%" />
        </span>
        <span className={`text-sm font-medium ${percentage >= 70 ? "text-green-600" : "text-red-600"}`}>
          {percentage >= 70 ? "KALUAR" : "NGELUR"}
        </span>
      </div>
    </div>
  )
}

export function CompletionScreen({ result, onRestart }: CompletionScreenProps) {
  const [generating, setGenerating] = useState(false)
  const [generatingMaster, setGeneratingMaster] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [canGetMasterCertificate, setCanGetMasterCertificate] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    if (result.passed) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
    setTimeout(() => setShowResults(true), 500)

    // Check for master certificate eligibility
    const completed = getUserCompletedSimulations(result.name, result.surname)
    setCompletedCount(completed.length)
    setCanGetMasterCertificate(hasCompletedAllSimulations(result.name, result.surname))
  }, [result])

  const formatDate = (dateStr: string) => {
    const months = [
      "Janar",
      "Shkurt",
      "Mars",
      "Prill",
      "Maj",
      "Qershor",
      "Korrik",
      "Gusht",
      "Shtator",
      "Tetor",
      "Nëntor",
      "Dhjetor",
    ]
    const date = new Date(dateStr)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Load image helper
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const generateCertificate = async () => {
    if (!result.passed) return
    setGenerating(true)

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // A4 landscape dimensions
      canvas.width = 1123
      canvas.height = 794

      ctx.fillStyle = "#f8fafc"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(226, 232, 240, 0.3)")
      gradient.addColorStop(1, "rgba(241, 245, 249, 0.3)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Border
      ctx.strokeStyle = "#1e3a5f"
      ctx.lineWidth = 3
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)

      // Inner border
      ctx.strokeStyle = "#cbd5e1"
      ctx.lineWidth = 1
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)

      // Load and draw main logo at TOP
      try {
        const mainLogo = await loadImage(partnerLogos[0].logo)
        ctx.drawImage(mainLogo, canvas.width / 2 - 50, 55, 100, 100)
      } catch {
        // Draw placeholder if logo fails
        ctx.fillStyle = "#1e3a5f"
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        ctx.fillText("SHKOLLA PROFESIONALE", canvas.width / 2, 90)
        ctx.fillText("ELBASAN", canvas.width / 2, 105)
      }

      // Certificate Title
      ctx.fillStyle = "#1e3a5f"
      ctx.font = "bold 48px Georgia"
      ctx.textAlign = "center"
      ctx.fillText("CERTIFIKATË", canvas.width / 2, 200)

      // Subtitle
      ctx.fillStyle = "#475569"
      ctx.font = "18px Arial"
      ctx.fillText("CyberAware Training Platform", canvas.width / 2, 235)
      ctx.fillText("Trajnim për Sigurinë Kibernetike", canvas.width / 2, 260)

      // Decorative line
      ctx.strokeStyle = "#1e3a5f"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 150, 280)
      ctx.lineTo(canvas.width / 2 + 150, 280)
      ctx.stroke()

      // Certificate text
      ctx.fillStyle = "#334155"
      ctx.font = "16px Arial"
      ctx.fillText("Kjo certifikatë i jepet", canvas.width / 2, 320)

      // Recipient name
      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 36px Georgia"
      ctx.fillText(`${result.name} ${result.surname}`, canvas.width / 2, 365)

      // Achievement text
      ctx.fillStyle = "#475569"
      ctx.font = "16px Arial"
      ctx.fillText("për përfundimin me sukses të simulimit:", canvas.width / 2, 405)

      ctx.fillStyle = "#1e3a5f"
      ctx.font = "bold 24px Arial"
      ctx.fillText(result.simulationTitle, canvas.width / 2, 440)

      // Score display
      ctx.fillStyle = "#059669"
      ctx.font = "bold 56px Arial"
      ctx.fillText(`${result.totalScore}%`, canvas.width / 2, 510)

      ctx.fillStyle = "#64748b"
      ctx.font = "14px Arial"
      ctx.fillText(
        `Faza 1: ${result.phase1Score}%  |  Faza 2: ${result.phase2Score}%  |  Faza 3: ${result.phase3Score}%`,
        canvas.width / 2,
        540,
      )

      // Date
      ctx.fillStyle = "#334155"
      ctx.font = "14px Arial"
      ctx.fillText(`Data: ${formatDate(result.completedAt || new Date().toISOString())}`, canvas.width / 2, 570)

      // Partner logos section
      ctx.fillStyle = "#64748b"
      ctx.font = "11px Arial"
      ctx.fillText("Mbështetur nga:", canvas.width / 2, 600)

      // Draw partner logos in a row
      const logoStartX = 100
      const logoY = 615
      const logoSize = 45
      const logoSpacing = (canvas.width - 200) / partnerLogos.length

      for (let i = 0; i < partnerLogos.length; i++) {
        try {
          const logo = await loadImage(partnerLogos[i].logo)
          const x = logoStartX + i * logoSpacing
          ctx.drawImage(logo, x, logoY, logoSize, logoSize)
        } catch {
          // Skip if logo fails to load
        }
      }

      // Signatures section
      const sigY = 700
      const sigSpacing = 280

      // Director signature
      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 13px Arial"
      ctx.fillText(certificateSignatures.director.name, canvas.width / 2 - sigSpacing, sigY)
      ctx.fillStyle = "#64748b"
      ctx.font = "11px Arial"
      ctx.fillText(certificateSignatures.director.title, canvas.width / 2 - sigSpacing, sigY + 18)

      // Supervisor signature
      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 13px Arial"
      ctx.fillText(certificateSignatures.supervisor.name, canvas.width / 2, sigY)
      ctx.fillStyle = "#64748b"
      ctx.font = "11px Arial"
      ctx.fillText(certificateSignatures.supervisor.title, canvas.width / 2, sigY + 18)

      // Creator signature
      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 13px Arial"
      ctx.fillText(certificateSignatures.creator.name, canvas.width / 2 + sigSpacing, sigY)
      ctx.fillStyle = "#64748b"
      ctx.font = "11px Arial"
      ctx.fillText(certificateSignatures.creator.title, canvas.width / 2 + sigSpacing, sigY + 18)

      // Generate barcode
      const barcodeCanvas = document.createElement("canvas")
      JsBarcode(barcodeCanvas, result.id.substring(0, 12), {
        format: "CODE128",
        width: 1,
        height: 35,
        displayValue: true,
        fontSize: 10,
        background: "transparent",
        lineColor: "#334155",
      })

      // Draw barcode
      ctx.drawImage(barcodeCanvas, canvas.width / 2 - 70, 735, 140, 50)

      // Certificate ID
      ctx.fillStyle = "#64748b"
      ctx.font = "9px Arial"
      ctx.fillText(`ID: ${result.id}`, canvas.width / 2, 775)

      // Download
      const link = document.createElement("a")
      link.download = `Certifikate_${result.name}_${result.surname}_${result.simulationTitle.replace(/\s+/g, "_")}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error generating certificate:", error)
    }

    setGenerating(false)
  }

  const generateMasterCertificate = async () => {
    setGeneratingMaster(true)

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // A4 landscape dimensions - larger for master certificate
      canvas.width = 1123
      canvas.height = 794

      // Gold/cream background for master certificate
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#fefce8")
      gradient.addColorStop(0.5, "#fef9c3")
      gradient.addColorStop(1, "#fefce8")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Gold border
      ctx.strokeStyle = "#b45309"
      ctx.lineWidth = 4
      ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50)

      // Inner decorative border
      ctx.strokeStyle = "#d97706"
      ctx.lineWidth = 2
      ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70)

      // Corner decorations
      const cornerSize = 30
      ctx.fillStyle = "#b45309"
      // Top left
      ctx.fillRect(25, 25, cornerSize, 4)
      ctx.fillRect(25, 25, 4, cornerSize)
      // Top right
      ctx.fillRect(canvas.width - 25 - cornerSize, 25, cornerSize, 4)
      ctx.fillRect(canvas.width - 29, 25, 4, cornerSize)
      // Bottom left
      ctx.fillRect(25, canvas.height - 29, cornerSize, 4)
      ctx.fillRect(25, canvas.height - 25 - cornerSize, 4, cornerSize)
      // Bottom right
      ctx.fillRect(canvas.width - 25 - cornerSize, canvas.height - 29, cornerSize, 4)
      ctx.fillRect(canvas.width - 29, canvas.height - 25 - cornerSize, 4, cornerSize)

      // Load and draw main logo at TOP
      try {
        const mainLogo = await loadImage(partnerLogos[0].logo)
        ctx.drawImage(mainLogo, canvas.width / 2 - 55, 50, 110, 110)
      } catch {
        ctx.fillStyle = "#78350f"
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        ctx.fillText("SHKOLLA PROFESIONALE ELBASAN", canvas.width / 2, 100)
      }

      // Master Certificate Title
      ctx.fillStyle = "#78350f"
      ctx.font = "bold 52px Georgia"
      ctx.textAlign = "center"
      ctx.fillText("CERTIFIKATË E PËRGJITHSHME", canvas.width / 2, 205)

      // Subtitle
      ctx.fillStyle = "#92400e"
      ctx.font = "20px Arial"
      ctx.fillText("CyberAware Training Platform", canvas.width / 2, 240)
      ctx.fillText("Trajnim i Plotë për Sigurinë Kibernetike", canvas.width / 2, 268)

      // Decorative line
      ctx.strokeStyle = "#b45309"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - 200, 290)
      ctx.lineTo(canvas.width / 2 + 200, 290)
      ctx.stroke()

      // Certificate text
      ctx.fillStyle = "#78350f"
      ctx.font = "18px Arial"
      ctx.fillText("Kjo certifikatë i jepet", canvas.width / 2, 330)

      // Recipient name - larger and more prominent
      ctx.fillStyle = "#451a03"
      ctx.font = "bold 42px Georgia"
      ctx.fillText(`${result.name} ${result.surname}`, canvas.width / 2, 380)

      // Achievement text
      ctx.fillStyle = "#78350f"
      ctx.font = "18px Arial"
      ctx.fillText("për përfundimin me sukses të të gjitha 7 simulimeve të sigurisë kibernetike", canvas.width / 2, 425)

      // 7 simulations badge
      ctx.fillStyle = "#b45309"
      ctx.font = "bold 72px Arial"
      ctx.fillText("7/7", canvas.width / 2, 500)
      ctx.fillStyle = "#92400e"
      ctx.font = "16px Arial"
      ctx.fillText("SIMULIME TË PËRFUNDUARA ME SUKSES", canvas.width / 2, 530)

      // Date
      ctx.fillStyle = "#78350f"
      ctx.font = "14px Arial"
      ctx.fillText(`Data: ${formatDate(new Date().toISOString())}`, canvas.width / 2, 565)

      // Partner logos section
      ctx.fillStyle = "#92400e"
      ctx.font = "11px Arial"
      ctx.fillText("Mbështetur nga:", canvas.width / 2, 595)

      // Draw partner logos
      const logoStartX = 100
      const logoY = 610
      const logoSize = 45
      const logoSpacing = (canvas.width - 200) / partnerLogos.length

      for (let i = 0; i < partnerLogos.length; i++) {
        try {
          const logo = await loadImage(partnerLogos[i].logo)
          const x = logoStartX + i * logoSpacing
          ctx.drawImage(logo, x, logoY, logoSize, logoSize)
        } catch {
          // Skip if logo fails
        }
      }

      // Signatures section
      const sigY = 695
      const sigSpacing = 280

      ctx.fillStyle = "#451a03"
      ctx.font = "bold 13px Arial"
      ctx.fillText(certificateSignatures.director.name, canvas.width / 2 - sigSpacing, sigY)
      ctx.fillStyle = "#78350f"
      ctx.font = "11px Arial"
      ctx.fillText(certificateSignatures.director.title, canvas.width / 2 - sigSpacing, sigY + 18)

      ctx.fillStyle = "#451a03"
      ctx.font = "bold 13px Arial"
      ctx.fillText(certificateSignatures.supervisor.name, canvas.width / 2, sigY)
      ctx.fillStyle = "#78350f"
      ctx.font = "11px Arial"
      ctx.fillText(certificateSignatures.supervisor.title, canvas.width / 2, sigY + 18)

      ctx.fillStyle = "#451a03"
      ctx.font = "bold 13px Arial"
      ctx.fillText(certificateSignatures.creator.name, canvas.width / 2 + sigSpacing, sigY)
      ctx.fillStyle = "#78350f"
      ctx.font = "11px Arial"
      ctx.fillText(certificateSignatures.creator.title, canvas.width / 2 + sigSpacing, sigY + 18)

      // Generate barcode
      const barcodeCanvas = document.createElement("canvas")
      const masterId = `MASTER-${result.name.substring(0, 3).toUpperCase()}${result.surname.substring(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
      JsBarcode(barcodeCanvas, masterId.substring(0, 15), {
        format: "CODE128",
        width: 1,
        height: 35,
        displayValue: true,
        fontSize: 10,
        background: "transparent",
        lineColor: "#78350f",
      })

      ctx.drawImage(barcodeCanvas, canvas.width / 2 - 80, 735, 160, 50)

      // Download
      const link = document.createElement("a")
      link.download = `Certifikate_Pergjithshme_${result.name}_${result.surname}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error generating master certificate:", error)
    }

    setGeneratingMaster(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-slate-300/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

      <Card
        className={`w-full max-w-3xl bg-white/90 backdrop-blur-xl border-slate-200 shadow-2xl transition-all duration-1000 ${showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <CardHeader className="text-center pb-4 border-b border-slate-200">
          {/* Trophy/Alert Animation */}
          <div className="flex justify-center mb-6">
            <div
              className={`relative w-28 h-28 rounded-full flex items-center justify-center ${result.passed ? "bg-gradient-to-br from-green-100 to-emerald-100" : "bg-gradient-to-br from-red-100 to-orange-100"}`}
            >
              <div
                className={`absolute inset-0 rounded-full animate-ping opacity-30 ${result.passed ? "bg-green-400" : "bg-red-400"}`}
              />
              {result.passed ? (
                <Trophy className="w-14 h-14 text-green-600 animate-bounce-slow relative z-10" />
              ) : (
                <AlertTriangle className="w-14 h-14 text-red-600 animate-shake relative z-10" />
              )}
            </div>
          </div>

          <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
            {result.passed ? "Urime! Keni kaluar me sukses!" : "Simulimi Përfundoi"}
          </CardTitle>
          <p className="text-slate-500">
            {result.name} {result.surname} • {result.simulationTitle}
          </p>

          {/* Progress towards master certificate */}
          <div className="mt-4 px-4 py-2 bg-slate-100 rounded-lg inline-block">
            <span className="text-sm text-slate-600">
              Simulime të përfunduara: <span className="font-bold text-slate-800">{completedCount}/7</span>
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-8">
          {/* Main Score Circle */}
          <div className="flex justify-center">
            <CircularProgress percentage={result.totalScore} color={result.passed ? "#059669" : "#dc2626"} />
          </div>

          {/* Phase Scores */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Faza 1", sublabel: "Skenare", score: result.phase1Score, icon: Target },
              { label: "Faza 2", sublabel: "Test", score: result.phase2Score, icon: Zap },
              { label: "Faza 3", sublabel: "Shtjellim", score: result.phase3Score, icon: Star },
            ].map((phase, i) => (
              <div
                key={i}
                className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-200 flex items-center justify-center">
                  <phase.icon className="w-6 h-6 text-slate-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  <AnimatedCounter value={phase.score} suffix="%" />
                </div>
                <div className="text-sm text-slate-700 font-medium">{phase.label}</div>
                <div className="text-xs text-slate-500">{phase.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 bg-green-50 rounded-xl border border-green-200">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700">
                  <AnimatedCounter
                    value={
                      result.phase1Answers.filter((a) => a.correct).length +
                      result.phase2Answers.filter((a) => a.correct).length
                    }
                  />
                </div>
                <div className="text-sm text-green-600">Përgjigje të sakta</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-red-50 rounded-xl border border-red-200">
              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-red-700">
                  <AnimatedCounter
                    value={
                      result.phase1Answers.filter((a) => !a.correct).length +
                      result.phase2Answers.filter((a) => !a.correct).length
                    }
                  />
                </div>
                <div className="text-sm text-red-600">Përgjigje të gabuara</div>
              </div>
            </div>
          </div>

          {/* Keywords Found */}
          {result.phase3Keywords.length > 0 && (
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-slate-700 font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Fjalë kyçe të gjetura në shtjellim:
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.phase3Keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-200 text-slate-700 text-sm rounded-lg">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certificate Messages */}
          {result.passed ? (
            <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-green-700 font-semibold">Urime! Ju keni fituar certifikatën!</p>
                  <p className="text-green-600 text-sm">Klikoni butonin më poshtë për ta shkarkuar.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-yellow-700 font-semibold">Rezultati juaj është nën 70%</p>
                  <p className="text-yellow-600 text-sm">Provoni përsëri për të marrë certifikatën.</p>
                </div>
              </div>
            </div>
          )}

          {/* Master Certificate Notification */}
          {canGetMasterCertificate && (
            <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-amber-700" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-800 font-bold text-lg">Urime! Keni përfunduar të gjitha 7 simulimet!</p>
                  <p className="text-amber-700 text-sm">Tani mund të shkarkoni Certifikatën e Përgjithshme.</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex gap-4">
              <Button
                onClick={onRestart}
                variant="outline"
                className="flex-1 h-14 border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-800 bg-white font-semibold text-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Fillo Përsëri
              </Button>
              {result.passed && (
                <Button
                  onClick={generateCertificate}
                  disabled={generating}
                  className="flex-1 h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {generating ? "Duke gjeneruar..." : "Shkarko Certifikatën"}
                </Button>
              )}
            </div>

            {canGetMasterCertificate && (
              <Button
                onClick={generateMasterCertificate}
                disabled={generatingMaster}
                className="w-full h-14 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg"
              >
                <Award className="w-5 h-5 mr-2" />
                {generatingMaster ? "Duke gjeneruar..." : "Shkarko Certifikatën e Përgjithshme (7/7)"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-confetti { animation: confetti 3s linear forwards; }
        .animate-float-particle { animation: float-particle 5s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
