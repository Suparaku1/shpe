// Tipet kryesore per aplikacionin

export type SimulationPhase = "registration" | "scenarios" | "test" | "elaboration" | "completed"

export type ParticipantResult = {
  id: string
  name: string
  surname: string
  simulationId: number
  simulationTitle: string
  startedAt: string
  completedAt?: string
  phase1Score: number
  phase2Score: number
  phase3Score: number
  totalScore: number
  passed: boolean
  phase1Answers: { stepId: number; answerId: number; correct: boolean }[]
  phase2Answers: { questionId: number; answerId: number; correct: boolean }[]
  phase3Response: string
  phase3Keywords: string[]
}

export type CertificateData = {
  participantName: string
  simulationTitle: string
  score: number
  date: string
  certificateId: string
}

export const staffMembers = {
  director: {
    name: "Leonidha Haxhinikolla",
    role: "Drejtor",
    photo: "/images/leonidha-20haxhinikolla.jpg",
  },
  viceDirector: {
    name: "Juljan Kasapi",
    role: "Nëndrejtor",
    photo: "/images/juljan-20kasapi.jpg",
  },
  professor: {
    name: "Prof. Esmerald Suparaku",
    role: "Profesor",
    photo: "/images/esmerald-20suparaku.jpg",
  },
  finance: {
    name: "Bukuroshe",
    role: "Financa",
    photo: "/professional-woman-finance.png",
  },
  psychologist: {
    name: "Majlinda",
    role: "Psikologe",
    photo: "/professional-woman-psychologist.png",
  },
  security: {
    name: "Bedriu",
    role: "Security",
    photo: "/security-guard-man-uniform.jpg",
  },
  serverRoom1: {
    name: "Entela Progri",
    role: "Dhoma e Server 1",
    photo: "/images/entela-20progri.jpg",
  },
  serverRoom2: {
    name: "Alda Jolldashi",
    role: "Dhoma e Server 2",
    photo: "/professional-development-for-women.jpg",
  },
  socialMedia: {
    name: "Behexhet Kafexhiu",
    role: "Menaxher Rrjeteve Sociale",
    photo: "/professional-development-for-men.jpg",
  },
}

export const partnerLogos = [
  {
    name: "Shkolla Profesionale Elbasan",
    logo: "/images/logo.png",
    isMain: true,
  },
  {
    name: "Elite Academy",
    logo: "/images/elite.png",
  },
  {
    name: "Switch Technologies",
    logo: "/images/switch.png",
  },
  {
    name: "Vodafone AL",
    logo: "/images/vodafone.png",
  },
  {
    name: "One Albania",
    logo: "/images/one.png",
  },
  {
    name: "Digispark",
    logo: "/images/digispark.jpg",
  },
  {
    name: "Web Master",
    logo: "/images/web.png",
  },
  {
    name: "Best Cable",
    logo: "/images/best.png",
  },
  {
    name: "Bashkia Elbasan",
    logo: "/images/elbasan.png",
  },
  {
    name: "Qendra Zëra Jetë",
    logo: "/images/zera.jpg",
  },
]

export const certificateSignatures = {
  director: { name: "Leonidha Haxhinikolla", title: "Drejtori i Shkollës" },
  supervisor: { name: "Juljan Kasapi", title: "Supervizor" },
  creator: { name: "Prof. Esmerald Suparaku", title: "Krijuesi i Projektit" },
}

export const simulationImages = {
  phishing: [
    "/phishing-email-warning-computer-screen.jpg",
    "/suspicious-email-attachment-warning.jpg",
    "/fake-login-page-scam.jpg",
  ],
  socialEngineering: [
    "/social-engineering-attack-phone-call.jpg",
    "/impersonation-attack-office.jpg",
    "/tailgating-security-breach.jpg",
  ],
  passwords: [
    "/strong-password-security-lock.jpg",
    "/password-manager-application.jpg",
    "/two-factor-authentication-phone.jpg",
  ],
  wifi: ["/public-wifi-danger-hacker.jpg", "/vpn-secure-connection.jpg", "/man-in-middle-attack-diagram.jpg"],
  serverRoom: [
    "/server-room-data-center-security.jpg",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ],
  malware: [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ],
  dataProtection: [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ],
}
