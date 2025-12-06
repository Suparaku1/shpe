"use client"

import Image from "next/image"
import { staffMembers } from "@/lib/types"

export function Header() {
  const staffList = Object.values(staffMembers)

  return (
    <header className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] border-b border-[#334155]">
      {/* Top bar with logo */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#334155]/50">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#22d3ee] bg-white">
            <Image src="/images/logo.png" alt="Shkolla Profesionale Elbasan" fill className="object-contain p-1" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">CyberAware Training Platform</h1>
            <p className="text-xs text-[#64748b]">Shkolla Profesionale Elbasan</p>
          </div>
        </div>
      </div>

      {/* Staff members carousel */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          <span className="text-xs text-[#64748b] font-medium uppercase tracking-wider">Pjesëmarrësit:</span>
          {staffList.map((staff, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#334155] group-hover:border-[#22d3ee] transition-colors">
                <Image src={staff.photo || "/placeholder.svg"} alt={staff.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white font-medium leading-tight">{staff.name}</span>
                <span className="text-xs text-[#64748b] leading-tight">{staff.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
