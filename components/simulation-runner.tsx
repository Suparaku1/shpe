"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  X,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  Server,
  Shield,
  PhoneCall,
  PhoneOff,
  Terminal,
  Zap,
  Cpu,
  Laptop,
  Router,
  Skull,
  ShieldCheck,
  Target,
  Activity,
  Fingerprint,
  MonitorSmartphone,
  KeyRound,
  FileWarning,
  Users,
} from "lucide-react"
import type { SimulationData } from "@/lib/simulations"
import type { ParticipantResult } from "@/lib/types"
import { saveParticipantResult } from "@/lib/storage"
import Image from "next/image"

interface SimulationRunnerProps {
  simulation: SimulationData
  participantName: { name: string; surname: string }
  onComplete: (result: ParticipantResult) => void
  onCancel: () => void
}

type Phase = "scenarios" | "test" | "elaboration"

const staffData: Record<string, { name: string; role: string; image: string }> = {
  leonidha: {
    name: "Leonidha Haxhinikolla",
    role: "Drejtor",
    image: "/images/leonidha-20haxhinikolla.jpg",
  },
  juljan: {
    name: "Juljan Kasapi",
    role: "Supervizor",
    image: "/images/juljan-20kasapi.jpg",
  },
  esmerald: {
    name: "Prof. Esmerald Suparaku",
    role: "Krijuesi i Projektit",
    image: "/images/esmerald-20suparaku.jpg",
  },
  entela: {
    name: "Entela Progri",
    role: "Server Room 1",
    image: "/images/entela-20progri.jpg",
  },
}

function CyberBackground() {
  const columns = useMemo(
    () =>
      [...Array(30)].map((_, i) => ({
        id: i,
        left: `${(i / 30) * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${8 + Math.random() * 8}s`,
        chars: [...Array(25)].map(() => String.fromCharCode(0x30a0 + Math.random() * 96)),
      })),
    [],
  )

  const particles = useMemo(
    () =>
      [...Array(40)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 10}s`,
        size: Math.random() > 0.5 ? "w-1 h-1" : "w-2 h-2",
      })),
    [],
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Matrix Rain */}
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute text-[#00f0ff]/10 text-xs font-mono animate-matrix-fall"
          style={{
            left: col.left,
            animationDelay: col.delay,
            animationDuration: col.duration,
          }}
        >
          {col.chars.map((char, j) => (
            <div key={j} className="my-1 transition-colors hover:text-[#00f0ff]/40">
              {char}
            </div>
          ))}
        </div>
      ))}

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.size} rounded-full animate-float-particle`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: `radial-gradient(circle, #00f0ff 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#aa00ff]/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}

function GlitchText({
  children,
  className = "",
  intensity = "medium",
}: { children: React.ReactNode; className?: string; intensity?: "low" | "medium" | "high" }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitching(true)
        setTimeout(() => setGlitching(false), 200)
      },
      intensity === "high" ? 2000 : intensity === "medium" ? 4000 : 6000,
    )
    return () => clearInterval(interval)
  }, [intensity])

  return (
    <div className={`relative ${className}`}>
      <span className={`relative inline-block ${glitching ? "animate-glitch-1" : ""}`}>{children}</span>
      {glitching && (
        <>
          <span className="absolute top-0 left-0 text-[#ff0055] animate-glitch-2 clip-glitch" aria-hidden="true">
            {children}
          </span>
          <span className="absolute top-0 left-0 text-[#00ff88] animate-glitch-3 clip-glitch" aria-hidden="true">
            {children}
          </span>
        </>
      )}
    </div>
  )
}

function PhoneCallOverlay({
  caller,
  callerImage,
  onAnswer,
  onDecline,
}: {
  caller: string
  callerImage?: string
  onAnswer: () => void
  onDecline: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      {/* Ripple Effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full border-2 border-[#00ff88]/30 animate-ripple" />
        <div
          className="absolute w-64 h-64 rounded-full border-2 border-[#00ff88]/20 animate-ripple"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute w-64 h-64 rounded-full border-2 border-[#00ff88]/10 animate-ripple"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative glass rounded-3xl p-8 max-w-sm w-full mx-4 animate-slide-up">
        {/* Phone Icon Animation */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#00ff88] rounded-full flex items-center justify-center animate-pulse">
          <Phone className="w-4 h-4 text-black" />
        </div>

        <div className="text-center pt-4">
          {/* Caller Avatar */}
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00ff88] animate-spin-reverse opacity-50 blur-sm" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#00ff88] animate-bounce-slow">
              {callerImage ? (
                <Image src={callerImage || "/placeholder.svg"} alt={caller} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1a1b26] to-[#12131a] flex items-center justify-center">
                  <Users className="w-12 h-12 text-[#00f0ff]" />
                </div>
              )}
            </div>
          </div>

          <p className="text-[#64748b] text-sm mb-1 font-mono tracking-wider">THIRRJE HYRËSE</p>
          <h3 className="text-white text-2xl font-bold mb-1 neon-text-cyan">{caller}</h3>
          <p className="text-[#00ff88] text-sm mb-8 flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 animate-pulse" />
            Duke thirrur...
          </p>

          {/* Answer/Decline Buttons */}
          <div className="flex gap-6 justify-center">
            <button
              onClick={onDecline}
              className="group relative w-16 h-16 rounded-full flex items-center justify-center transition-all"
            >
              <div className="absolute inset-0 bg-[#ff0055] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-1 bg-gradient-to-br from-[#ff0055] to-[#cc0044] rounded-full shadow-lg neon-red group-hover:scale-110 transition-transform flex items-center justify-center">
                <PhoneOff className="w-7 h-7 text-white" />
              </div>
            </button>

            <button
              onClick={onAnswer}
              className="group relative w-16 h-16 rounded-full flex items-center justify-center transition-all animate-pulse"
            >
              <div className="absolute inset-0 bg-[#00ff88] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-1 bg-gradient-to-br from-[#00ff88] to-[#00cc6a] rounded-full shadow-lg neon-green group-hover:scale-110 transition-transform flex items-center justify-center">
                <PhoneCall className="w-7 h-7 text-white animate-shake" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailPopup({
  sender,
  subject,
  preview,
  senderImage,
  onClose,
}: {
  sender: string
  subject: string
  preview: string
  senderImage?: string
  onClose: () => void
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="w-96 glass rounded-2xl overflow-hidden shadow-2xl border border-[#00f0ff]/20">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#00f0ff]/10 to-transparent border-b border-[#2a2b3d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00f0ff]">
                {senderImage ? (
                  <Image
                    src={senderImage || "/placeholder.svg"}
                    alt={sender}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1a1b26] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#00f0ff]" />
                  </div>
                )}
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00ff88] rounded-full flex items-center justify-center">
                <span className="text-[8px] text-black font-bold">1</span>
              </div>
            </div>
            <div>
              <p className="text-[#00f0ff] font-semibold text-sm">Email i Ri</p>
              <p className="text-[#64748b] text-xs font-mono">Tani</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2b3d] flex items-center justify-center hover:bg-[#3a3b4d] transition-colors"
          >
            <X className="w-4 h-4 text-[#64748b]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-white font-bold mb-1">{sender}</p>
          <p className="text-[#00f0ff] text-sm font-medium mb-2">{subject}</p>
          <p className="text-[#94a3b8] text-sm line-clamp-2">{preview}</p>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 flex gap-2">
          <button className="flex-1 py-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] text-sm font-medium hover:bg-[#00f0ff]/20 transition-colors">
            Shiko
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-[#2a2b3d] text-[#94a3b8] text-sm font-medium hover:bg-[#3a3b4d] transition-colors"
          >
            Më vonë
          </button>
        </div>
      </div>
    </div>
  )
}

function CyberTerminal({
  lines,
  isTyping,
  title = "terminal@cyberaware",
}: {
  lines: string[]
  isTyping: boolean
  title?: string
}) {
  return (
    <div className="glass rounded-xl overflow-hidden border border-[#2a2b3d]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-[#2a2b3d]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[#64748b] text-xs font-mono">{title}</span>
        </div>
        <Terminal className="w-4 h-4 text-[#64748b]" />
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm bg-[#0a0a0f]/50 min-h-[120px] max-h-[200px] overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className="mb-1 flex items-start gap-2">
            <span className="text-[#00ff88] select-none">❯</span>
            <span className="text-[#e2e8f0] break-all">{line}</span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <span className="text-[#00ff88]">❯</span>
            <span className="w-2 h-5 bg-[#00f0ff] animate-blink" />
          </div>
        )}
      </div>
    </div>
  )
}

function CyberAlertBanner({
  type,
  message,
  onClose,
}: {
  type: "warning" | "danger" | "success" | "info"
  message: string
  onClose: () => void
}) {
  const config = {
    warning: {
      bg: "from-[#ffaa00]/20 to-[#ff8800]/20",
      border: "border-[#ffaa00]",
      text: "text-[#ffaa00]",
      icon: <AlertTriangle className="w-6 h-6" />,
      label: "PARALAJMËRIM",
    },
    danger: {
      bg: "from-[#ff0055]/20 to-[#cc0044]/20",
      border: "border-[#ff0055]",
      text: "text-[#ff0055]",
      icon: <Skull className="w-6 h-6" />,
      label: "RREZIK",
    },
    success: {
      bg: "from-[#00ff88]/20 to-[#00cc6a]/20",
      border: "border-[#00ff88]",
      text: "text-[#00ff88]",
      icon: <ShieldCheck className="w-6 h-6" />,
      label: "SUKSES",
    },
    info: {
      bg: "from-[#00f0ff]/20 to-[#00a0aa]/20",
      border: "border-[#00f0ff]",
      text: "text-[#00f0ff]",
      icon: <Shield className="w-6 h-6" />,
      label: "INFO",
    },
  }

  const c = config[type]

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div
        className={`glass bg-gradient-to-r ${c.bg} ${c.border} border-2 rounded-xl px-6 py-4 flex items-center gap-4 shadow-2xl animate-alert-pulse`}
      >
        <div className={`${c.text} animate-pulse`}>{c.icon}</div>
        <div>
          <p className={`${c.text} font-bold uppercase tracking-wider text-xs font-mono`}>{c.label}</p>
          <p className="text-white text-sm mt-0.5">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-[#64748b] hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function ScanningOverlay({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
      <div className="text-center">
        {/* Animated Scanner */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#00f0ff]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00f0ff] animate-spin" />

          {/* Middle Ring */}
          <div className="absolute inset-4 rounded-full border-4 border-[#00ff88]/20" />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-b-[#00ff88] animate-spin-reverse" />

          {/* Inner Ring */}
          <div className="absolute inset-8 rounded-full border-4 border-[#aa00ff]/20" />
          <div
            className="absolute inset-8 rounded-full border-4 border-transparent border-t-[#aa00ff] animate-spin"
            style={{ animationDuration: "2s" }}
          />

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-12 h-12 text-[#00f0ff] animate-pulse" />
          </div>

          {/* Radar Sweep */}
          <div className="absolute inset-0 animate-radar-sweep origin-center">
            <div className="w-1/2 h-0.5 bg-gradient-to-r from-[#00f0ff] to-transparent absolute top-1/2 left-1/2" />
          </div>
        </div>

        <GlitchText className="text-[#00f0ff] text-2xl font-bold mb-4 font-mono">{text}</GlitchText>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00f0ff] loading-dot-1" />
          <div className="w-3 h-3 rounded-full bg-[#00ff88] loading-dot-2" />
          <div className="w-3 h-3 rounded-full bg-[#aa00ff] loading-dot-3" />
        </div>
      </div>
    </div>
  )
}

function LocationVisual({ location, type }: { location: string; type: string }) {
  const locationConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bgGradient: string }> = {
    laborator: {
      icon: <Laptop className="w-16 h-16" />,
      label: "Laboratori i Shkollës",
      color: "#00f0ff",
      bgGradient: "from-[#00f0ff]/10 via-transparent to-[#00f0ff]/5",
    },
    security: {
      icon: <Shield className="w-16 h-16" />,
      label: "Zona e Sigurisë",
      color: "#00ff88",
      bgGradient: "from-[#00ff88]/10 via-transparent to-[#00ff88]/5",
    },
    serveroom: {
      icon: <Server className="w-16 h-16" />,
      label: "Server Room",
      color: "#aa00ff",
      bgGradient: "from-[#aa00ff]/10 via-transparent to-[#aa00ff]/5",
    },
    mikrotik: {
      icon: <Router className="w-16 h-16" />,
      label: "Dhoma MikroTik",
      color: "#ffaa00",
      bgGradient: "from-[#ffaa00]/10 via-transparent to-[#ffaa00]/5",
    },
    pajisje: {
      icon: <Cpu className="w-16 h-16" />,
      label: "Zona e Pajisjeve",
      color: "#ff0055",
      bgGradient: "from-[#ff0055]/10 via-transparent to-[#ff0055]/5",
    },
    ambjent: {
      icon: <MonitorSmartphone className="w-16 h-16" />,
      label: "Ambjenti i Punës",
      color: "#00f0ff",
      bgGradient: "from-[#00f0ff]/10 via-transparent to-[#00f0ff]/5",
    },
  }

  const typeAnimation: Record<string, string> = {
    telefonata: "animate-shake",
    mesazh: "animate-bounce-slow",
    ndodhi: "animate-pulse",
    situate: "animate-float",
    tekst: "animate-bounce-slow",
    pyetje: "animate-pulse",
  }

  const config = locationConfig[location] || locationConfig.laborator
  const animation = typeAnimation[type] || "animate-float"

  return (
    <div className={`relative w-full h-56 glass rounded-2xl overflow-hidden bg-gradient-to-br ${config.bgGradient}`}>
      {/* Animated Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />

      {/* Scan Line */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent animate-scan-line opacity-50"
          style={{ color: config.color }}
        />
      </div>

      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${animation}`} style={{ color: config.color }}>
          {config.icon}
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: config.color }} />
      <div className="absolute top-3 right-3 w-10 h-10 border-r-2 border-t-2" style={{ borderColor: config.color }} />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2" style={{ borderColor: config.color }} />
      <div
        className="absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2"
        style={{ borderColor: config.color }}
      />

      {/* Status Indicators */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
        <span className="text-xs font-mono" style={{ color: config.color }}>
          LIVE
        </span>
      </div>

      {/* Location Label */}
      <div className="absolute bottom-4 left-4">
        <Badge
          variant="outline"
          className="border-current font-mono text-xs"
          style={{ borderColor: config.color, color: config.color }}
        >
          {config.label}
        </Badge>
      </div>

      {/* Data Stream Effect */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full animate-wave"
            style={{
              backgroundColor: config.color,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
}: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#2a2b3d" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#aa00ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white font-mono">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}

const typeConfigs: Record<string, { icon: React.ReactNode; color: string; label: string; bgColor: string }> = {
  situate: {
    icon: <AlertCircle className="w-4 h-4" />,
    color: "#ffaa00",
    label: "Situatë",
    bgColor: "bg-[#ffaa00]/10",
  },
  ndodhi: { icon: <Zap className="w-4 h-4" />, color: "#ff0055", label: "Ngjarje", bgColor: "bg-[#ff0055]/10" },
  pyetje: {
    icon: <MessageSquare className="w-4 h-4" />,
    color: "#00f0ff",
    label: "Pyetje",
    bgColor: "bg-[#00f0ff]/10",
  },
  tekst: { icon: <MessageSquare className="w-4 h-4" />, color: "#00ff88", label: "SMS", bgColor: "bg-[#00ff88]/10" },
  telefonata: {
    icon: <Phone className="w-4 h-4" />,
    color: "#aa00ff",
    label: "Telefonatë",
    bgColor: "bg-[#aa00ff]/10",
  },
  mesazh: { icon: <Mail className="w-4 h-4" />, color: "#00f0ff", label: "Email", bgColor: "bg-[#00f0ff]/10" },
}

export function SimulationRunner({ simulation, participantName, onComplete, onCancel }: SimulationRunnerProps) {
  const [phase, setPhase] = useState<Phase>("scenarios")
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [phase1Answers, setPhase1Answers] = useState<{ stepId: number; answerId: number; correct: boolean }[]>([])
  const [phase2Answers, setPhase2Answers] = useState<{ questionId: number; answerId: number; correct: boolean }[]>([])
  const [elaborationResponse, setElaborationResponse] = useState("")
  const [startTime] = useState(new Date().toISOString())

  // Animation States
  const [showPhoneCall, setShowPhoneCall] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<{ type: "warning" | "danger" | "success" | "info"; message: string }>({
    type: "info",
    message: "",
  })
  const [showScanning, setShowScanning] = useState(false)
  const [scanText, setScanText] = useState("")
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [phoneAnswered, setPhoneAnswered] = useState(false)

  const totalPhase1Steps = simulation.steps.length
  const totalPhase2Questions = simulation.testQuestions.length

  // Show intro animation on phase change
  useEffect(() => {
    if (phase === "scenarios" && currentStep === 0) {
      setShowScanning(true)
      setScanText("Duke ngarkuar skenarin...")
      setTimeout(() => setShowScanning(false), 2000)
    } else if (phase === "test" && currentStep === 0) {
      setShowScanning(true)
      setScanText("Duke filluar testin final...")
      setTimeout(() => setShowScanning(false), 2000)
    } else if (phase === "elaboration") {
      setShowScanning(true)
      setScanText("Faza e fundit...")
      setTimeout(() => setShowScanning(false), 1500)
    }
  }, [phase, currentStep])

  // Trigger animations based on step type
  useEffect(() => {
    if (phase === "scenarios") {
      const step = simulation.steps[currentStep]

      if (step.type === "telefonata" && !phoneAnswered) {
        setTimeout(() => setShowPhoneCall(true), 800)
      } else if (step.type === "mesazh") {
        setTimeout(() => setShowEmail(true), 800)
      } else if (step.type === "ndodhi") {
        setAlertData({ type: "danger", message: "Ngjarje e papritur në sistem!" })
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
      }

      // Terminal animation
      setTerminalLines([])
      setIsTyping(true)
      const lines = [
        `[${new Date().toLocaleTimeString()}] Skenari ${currentStep + 1}/${totalPhase1Steps}`,
        `Vendndodhja: ${step.location}`,
        `Tipi: ${step.type}`,
        "Duke analizuar situatën...",
      ]

      lines.forEach((line, i) => {
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, line])
          if (i === lines.length - 1) setIsTyping(false)
        }, i * 300)
      })
    }
  }, [currentStep, phase, simulation.steps, phoneAnswered, totalPhase1Steps])

  const handleAnswerSelect = (answerId: number) => {
    if (showFeedback) return
    setSelectedAnswer(answerId)
  }

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return

    if (phase === "scenarios") {
      const step = simulation.steps[currentStep]
      const correct = step.options.find((o) => o.id === selectedAnswer)?.correct || false
      setPhase1Answers([...phase1Answers, { stepId: step.id, answerId: selectedAnswer, correct }])
      setShowFeedback(true)

      setAlertData({
        type: correct ? "success" : "danger",
        message: correct ? "Përgjigje e saktë!" : "Përgjigje e gabuar!",
      })
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
    } else if (phase === "test") {
      const question = simulation.testQuestions[currentStep]
      const correct = question.options.find((o) => o.id === selectedAnswer)?.correct || false
      setPhase2Answers([...phase2Answers, { questionId: question.id, answerId: selectedAnswer, correct }])
      setShowFeedback(true)

      setAlertData({
        type: correct ? "success" : "danger",
        message: correct ? "Saktë!" : "Gabim!",
      })
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setShowFeedback(false)
    setPhoneAnswered(false)

    if (phase === "scenarios") {
      if (currentStep < totalPhase1Steps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setPhase("test")
        setCurrentStep(0)
      }
    } else if (phase === "test") {
      if (currentStep < totalPhase2Questions - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setPhase("elaboration")
      }
    }
  }

  const calculateKeywordScore = (response: string, keywords: string[]): { score: number; found: string[] } => {
    const lowerResponse = response.toLowerCase()
    const found = keywords.filter((kw) => lowerResponse.includes(kw.toLowerCase()))
    const score = Math.min(10, Math.round((found.length / keywords.length) * 10))
    return { score, found }
  }

  const handleSubmitElaboration = () => {
    const { score: phase3Score, found: foundKeywords } = calculateKeywordScore(
      elaborationResponse,
      simulation.elaborationQuestion.keywords,
    )

    const phase1Score = Math.round((phase1Answers.filter((a) => a.correct).length / totalPhase1Steps) * 100)
    const phase2Score = Math.round((phase2Answers.filter((a) => a.correct).length / totalPhase2Questions) * 100)
    const phase3Percent = phase3Score * 10

    const totalScore = Math.round(phase1Score * 0.4 + phase2Score * 0.4 + phase3Percent * 0.2)
    const passed = totalScore >= 70

    const result: ParticipantResult = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: participantName.name,
      surname: participantName.surname,
      simulationId: simulation.id,
      simulationTitle: simulation.title,
      startedAt: startTime,
      completedAt: new Date().toISOString(),
      phase1Score,
      phase2Score,
      phase3Score: phase3Percent,
      totalScore,
      passed,
      phase1Answers,
      phase2Answers,
      phase3Response: elaborationResponse,
      phase3Keywords: foundKeywords,
    }

    saveParticipantResult(result)
    onComplete(result)
  }

  const getCurrentProgress = () => {
    if (phase === "scenarios") return ((currentStep + 1) / totalPhase1Steps) * 100
    if (phase === "test") return ((currentStep + 1) / totalPhase2Questions) * 100
    return 100
  }

  // Render Scenario Phase
  const renderScenarioPhase = () => {
    const step = simulation.steps[currentStep]
    const selectedOption = step.options.find((o) => o.id === selectedAnswer)
    const correctOption = step.options.find((o) => o.correct)
    const typeConfig = typeConfigs[step.type] || typeConfigs.situate

    return (
      <div className="space-y-6">
        {/* Location Visual */}
        <LocationVisual location={step.location} type={step.type} />

        {/* Terminal Output */}
        <CyberTerminal lines={terminalLines} isTyping={isTyping} />

        {/* Scenario Card */}
        <Card className="glass border-[#2a2b3d] overflow-hidden">
          <div className="p-6">
            {/* Type Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Badge
                className={`${typeConfig.bgColor} border-current font-mono`}
                style={{ borderColor: typeConfig.color, color: typeConfig.color }}
              >
                {typeConfig.icon}
                <span className="ml-2">{typeConfig.label}</span>
              </Badge>
              <Badge variant="outline" className="border-[#2a2b3d] text-[#64748b] font-mono">
                Hapi {currentStep + 1}/{totalPhase1Steps}
              </Badge>
            </div>

            {/* Scenario Content */}
            <div className="mb-6">
              <p className="text-[#e2e8f0] text-lg leading-relaxed">{step.content}</p>
            </div>

            {/* Question */}
            <div className="mb-6 p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/20">
              <p className="text-[#00f0ff] font-semibold flex items-center gap-2">
                <Target className="w-5 h-5" />
                {step.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {step.options.map((option, index) => {
                const isSelected = selectedAnswer === option.id
                const isCorrect = option.correct
                const showResult = showFeedback

                let optionClass = "glass border-[#2a2b3d] hover:border-[#00f0ff]/50"
                if (isSelected && !showResult) {
                  optionClass = "glass border-[#00f0ff] neon-cyan"
                } else if (showResult && isCorrect) {
                  optionClass = "glass border-[#00ff88] bg-[#00ff88]/10 neon-green"
                } else if (showResult && isSelected && !isCorrect) {
                  optionClass = "glass border-[#ff0055] bg-[#ff0055]/10 neon-red"
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass} ${!showFeedback ? "cyber-button" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono ${
                          isSelected && !showResult
                            ? "bg-[#00f0ff] text-black"
                            : showResult && isCorrect
                              ? "bg-[#00ff88] text-black"
                              : showResult && isSelected
                                ? "bg-[#ff0055] text-white"
                                : "bg-[#2a2b3d] text-[#64748b]"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span
                        className={`flex-1 ${
                          showResult && isCorrect
                            ? "text-[#00ff88]"
                            : showResult && isSelected && !isCorrect
                              ? "text-[#ff0055]"
                              : "text-[#e2e8f0]"
                        }`}
                      >
                        {option.text}
                      </span>
                      {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-[#00ff88]" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-[#ff0055]" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showFeedback && (
              <div className="mt-6 p-4 rounded-xl bg-[#1a1b26] border border-[#2a2b3d] animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 text-[#00f0ff]" />
                  </div>
                  <div>
                    <p className="text-[#00f0ff] font-semibold mb-1">Shpjegimi</p>
                    <p className="text-[#94a3b8]">{step.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    )
  }

  // Render Test Phase
  const renderTestPhase = () => {
    const question = simulation.testQuestions[currentStep]
    const selectedOption = question.options.find((o) => o.id === selectedAnswer)
    const correctOption = question.options.find((o) => o.correct)

    return (
      <div className="space-y-6">
        {/* Test Header */}
        <Card className="glass border-[#2a2b3d] overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#aa00ff]/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#aa00ff]/20 flex items-center justify-center">
                  <FileWarning className="w-7 h-7 text-[#aa00ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Testi Final</h3>
                  <p className="text-[#64748b] font-mono">
                    Pyetja {currentStep + 1} nga {totalPhase2Questions}
                  </p>
                </div>
              </div>
              <ProgressRing progress={getCurrentProgress()} size={80} strokeWidth={6} />
            </div>
          </div>
        </Card>

        {/* Question Card */}
        <Card className="glass border-[#2a2b3d]">
          <div className="p-6">
            <div className="mb-6 p-4 rounded-xl bg-[#aa00ff]/5 border border-[#aa00ff]/20">
              <p className="text-white text-lg font-medium">{question.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option.id
                const isCorrect = option.correct
                const showResult = showFeedback

                let optionClass = "glass border-[#2a2b3d] hover:border-[#aa00ff]/50"
                if (isSelected && !showResult) {
                  optionClass = "glass border-[#aa00ff] shadow-lg shadow-[#aa00ff]/20"
                } else if (showResult && isCorrect) {
                  optionClass = "glass border-[#00ff88] bg-[#00ff88]/10"
                } else if (showResult && isSelected && !isCorrect) {
                  optionClass = "glass border-[#ff0055] bg-[#ff0055]/10"
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass} ${!showFeedback ? "cyber-button" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono ${
                          isSelected && !showResult
                            ? "bg-[#aa00ff] text-white"
                            : showResult && isCorrect
                              ? "bg-[#00ff88] text-black"
                              : showResult && isSelected
                                ? "bg-[#ff0055] text-white"
                                : "bg-[#2a2b3d] text-[#64748b]"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span
                        className={`flex-1 ${
                          showResult && isCorrect
                            ? "text-[#00ff88]"
                            : showResult && isSelected && !isCorrect
                              ? "text-[#ff0055]"
                              : "text-[#e2e8f0]"
                        }`}
                      >
                        {option.text}
                      </span>
                      {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-[#00ff88]" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-[#ff0055]" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Render Elaboration Phase
  const renderElaborationPhase = () => {
    return (
      <div className="space-y-6">
        {/* Elaboration Header */}
        <Card className="glass border-[#2a2b3d] overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#00ff88]/10 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#00ff88]/20 flex items-center justify-center">
                <KeyRound className="w-7 h-7 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Faza e Shtjellimit</h3>
                <p className="text-[#64748b]">Shkruaj përgjigjen tënde të detajuar</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Question Card */}
        <Card className="glass border-[#2a2b3d]">
          <div className="p-6">
            <div className="mb-6 p-4 rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/20">
              <p className="text-white text-lg leading-relaxed">{simulation.elaborationQuestion.question}</p>
            </div>

            <div className="mb-4">
              <p className="text-[#64748b] text-sm mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Përdor fjalë kyçe për rezultat më të mirë
              </p>
              <Textarea
                value={elaborationResponse}
                onChange={(e) => setElaborationResponse(e.target.value)}
                placeholder="Shkruaj përgjigjen tënde këtu..."
                className="min-h-[200px] bg-[#0a0a0f] border-[#2a2b3d] text-white placeholder:text-[#64748b] focus:border-[#00ff88] resize-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#64748b]">Karaktere: {elaborationResponse.length}</span>
              <span className="text-[#00ff88]">Minimumi i rekomanduar: 100 karaktere</span>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmitElaboration}
          disabled={elaborationResponse.length < 20}
          className="w-full h-14 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] hover:from-[#00cc6a] hover:to-[#00ff88] text-black font-bold text-lg cyber-button disabled:opacity-50"
        >
          <Send className="w-5 h-5 mr-2" />
          Përfundo Simulimin
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <CyberBackground />

      {/* Overlays */}
      {showScanning && <ScanningOverlay text={scanText} />}
      {showAlert && (
        <CyberAlertBanner type={alertData.type} message={alertData.message} onClose={() => setShowAlert(false)} />
      )}
      {showPhoneCall && (
        <PhoneCallOverlay
          caller={
            simulation.steps[currentStep]?.content.includes("Ministria") ? "Ministria e Arsimit" : "Numër i Panjohur"
          }
          onAnswer={() => {
            setShowPhoneCall(false)
            setPhoneAnswered(true)
          }}
          onDecline={() => setShowPhoneCall(false)}
        />
      )}
      {showEmail && (
        <EmailPopup
          sender="security@alert.com"
          subject="Alarm Sigurie"
          preview={simulation.steps[currentStep]?.content.slice(0, 100) + "..."}
          onClose={() => setShowEmail(false)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#00f0ff]">
              <Image src="/images/logo.png" alt="Logo" width={48} height={48} className="object-contain bg-white p-1" />
            </div>
            <div>
              <GlitchText className="text-xl font-bold text-white">{simulation.title}</GlitchText>
              <p className="text-[#64748b] text-sm font-mono">
                {participantName.name} {participantName.surname}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-[#ff0055]/50 text-[#ff0055] hover:bg-[#ff0055]/10 bg-transparent"
          >
            <X className="w-4 h-4 mr-2" />
            Ndalo
          </Button>
        </div>

        {/* Phase Indicator */}
        <div className="flex items-center gap-4 mb-8">
          {["scenarios", "test", "elaboration"].map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono transition-all ${
                  phase === p
                    ? "bg-[#00f0ff] text-black neon-cyan"
                    : i < ["scenarios", "test", "elaboration"].indexOf(phase)
                      ? "bg-[#00ff88] text-black"
                      : "bg-[#2a2b3d] text-[#64748b]"
                }`}
              >
                {i + 1}
              </div>
              <span className={`hidden sm:block text-sm ${phase === p ? "text-[#00f0ff]" : "text-[#64748b]"}`}>
                {p === "scenarios" ? "Skenarë" : p === "test" ? "Test" : "Shtjellim"}
              </span>
              {i < 2 && <div className="w-8 h-0.5 bg-[#2a2b3d] hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-[#2a2b3d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f0ff] via-[#00ff88] to-[#aa00ff] transition-all duration-500 progress-glow"
              style={{ width: `${getCurrentProgress()}%` }}
            />
          </div>
        </div>

        {/* Content */}
        {phase === "scenarios" && renderScenarioPhase()}
        {phase === "test" && renderTestPhase()}
        {phase === "elaboration" && renderElaborationPhase()}

        {/* Action Button */}
        {phase !== "elaboration" && (
          <div className="mt-8">
            {!showFeedback ? (
              <Button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
                className="w-full h-14 bg-gradient-to-r from-[#00f0ff] to-[#00a0aa] hover:from-[#00a0aa] hover:to-[#00f0ff] text-black font-bold text-lg cyber-button disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Konfirmo Përgjigjen
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="w-full h-14 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] hover:from-[#00cc6a] hover:to-[#00ff88] text-black font-bold text-lg cyber-button"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                {phase === "scenarios" && currentStep < totalPhase1Steps - 1
                  ? "Skenari Tjetër"
                  : phase === "scenarios"
                    ? "Fillo Testin"
                    : currentStep < totalPhase2Questions - 1
                      ? "Pyetja Tjetër"
                      : "Vazhdo me Shtjellimin"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
