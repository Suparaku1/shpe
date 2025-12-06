"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, User, Lock, UserPlus, AlertCircle } from "lucide-react"
import Image from "next/image"

interface AuthScreenProps {
  onLogin: () => void
  onRegister: (name: string, surname: string) => void
}

export function AuthScreen({ onLogin, onRegister }: AuthScreenProps) {
  const [loginId, setLoginId] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerSurname, setRegisterSurname] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (loginId === "Esmerald" && loginPassword === "12345678") {
      onLogin()
    } else {
      setLoginError("ID ose fjalëkalimi i gabuar!")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")

    if (!registerName.trim() || !registerSurname.trim()) {
      setRegisterError("Ju lutem plotësoni emrin dhe mbiemrin!")
      return
    }

    onRegister(registerName.trim(), registerSurname.trim())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2744] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#22d3ee] bg-white p-2">
              <Image src="/images/logo.png" alt="Shkolla Profesionale Elbasan" fill className="object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CyberAware Training</h1>
          <p className="text-[#94a3b8]">Shkolla Profesionale Elbasan</p>
          <p className="text-[#64748b] text-sm mt-1">Platforma e Trajnimit për Sigurinë Kibernetike</p>
        </div>

        <Card className="bg-[#1e293b] border-[#334155]">
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="w-full bg-[#0f172a] border-b border-[#334155]">
              <TabsTrigger
                value="register"
                className="flex-1 data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0f172a]"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Regjistrim
              </TabsTrigger>
              <TabsTrigger
                value="login"
                className="flex-1 data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0f172a]"
              >
                <Lock className="w-4 h-4 mr-2" />
                Hyrje Admin
              </TabsTrigger>
            </TabsList>

            {/* Register Tab */}
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-[#22d3ee]" />
                  Regjistrohu për Simulim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#94a3b8]">
                      Emri
                    </Label>
                    <Input
                      id="name"
                      placeholder="Shkruaj emrin"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b] focus:border-[#22d3ee]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname" className="text-[#94a3b8]">
                      Mbiemri
                    </Label>
                    <Input
                      id="surname"
                      placeholder="Shkruaj mbiemrin"
                      value={registerSurname}
                      onChange={(e) => setRegisterSurname(e.target.value)}
                      className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b] focus:border-[#22d3ee]"
                    />
                  </div>

                  {registerError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {registerError}
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0f172a] font-semibold">
                    <Shield className="w-4 h-4 mr-2" />
                    Fillo Simulimet
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#22d3ee]" />
                  Hyrje Administrator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginId" className="text-[#94a3b8]">
                      ID
                    </Label>
                    <Input
                      id="loginId"
                      placeholder="Shkruaj ID"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b] focus:border-[#22d3ee]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword" className="text-[#94a3b8]">
                      Fjalëkalimi
                    </Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder="Shkruaj fjalëkalimin"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#64748b] focus:border-[#22d3ee]"
                    />
                  </div>

                  {loginError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {loginError}
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-[#22d3ee] hover:bg-[#06b6d4] text-[#0f172a] font-semibold">
                    <Lock className="w-4 h-4 mr-2" />
                    Hyr në Panel
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-[#64748b] text-xs">
          <p>Krijuar nga Prof. Esmerald Suparaku</p>
          <p className="mt-1">© 2025 Shkolla Profesionale Elbasan</p>
        </div>
      </div>
    </div>
  )
}
