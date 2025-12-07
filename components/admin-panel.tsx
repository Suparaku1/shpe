"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import { ParticipantsReport } from "@/components/admin/participants-report"
import { CertificateGenerator } from "@/components/admin/certificate-generator"
import Image from "next/image"

interface AdminPanelProps {
  onBack: () => void
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("reports")

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="bg-[#1e293b] text-white py-4 px-6 border-b border-[#334155]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-[#94a3b8] hover:text-white hover:bg-[#334155]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Image
              src="/images/logo.png"
              alt="Shkolla Profesionale Elbasan"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold">CyberAware Training</h1>
              <p className="text-[#94a3b8] text-sm">Paneli Administrativ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#22d3ee]" />
            <span className="text-sm text-[#94a3b8]">Administrator</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 bg-[#1e293b] border border-[#334155]">
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0f172a] text-[#94a3b8]"
            >
              Raportet e Pjesëmarrësve
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0f172a] text-[#94a3b8]"
            >
              Gjenerimi i Certifikatave
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <ParticipantsReport />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificateGenerator />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e293b] text-white py-6 px-6 mt-8 border-t border-[#334155]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/leonidha-20haxhinikolla.jpg"
                alt="Leonidha Haxhinikolla"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">Leonidha Haxhinikolla</p>
                <p className="text-[#64748b]">Drejtori i Shkollës</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/juljan-20kasapi.jpg"
                alt="Juljan Kasapi"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">Juljan Kasapi</p>
                <p className="text-[#64748b]">Supervizor</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/esmerald-20suparaku.jpg"
                alt="Prof. Esmerald Suparaku"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">Prof. Esmerald Suparaku</p>
                <p className="text-[#64748b]">Krijuesi i Projektit</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
