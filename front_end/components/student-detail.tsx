"use client"

import Image from "next/image"
import type { Student } from "./student-roster"

interface StudentDetailProps {
  student: Student | null
  onInvest: () => void
  onDonate: () => void
}

function StarburstBadge() {
  return (
    <svg 
      className="absolute -top-5 right-[10%] w-28 h-28 animate-rotate-slow" 
      viewBox="0 0 100 100"
    >
      <polygon 
        points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" 
        className="fill-neon stroke-foreground"
        strokeWidth="1"
      />
      <polygon 
        points="50,20 56,40 75,40 60,52 65,70 50,60 35,70 40,52 25,40 44,40" 
        fill="none"
        className="stroke-foreground"
        strokeWidth="0.5"
      />
    </svg>
  )
}

export function StudentDetail({ student, onInvest, onDonate }: StudentDetailProps) {
  if (!student) {
    return (
      <article className="flex flex-col items-center justify-center h-full bg-background p-8">
        <p className="text-muted-foreground text-sm">Select a student to view their profile</p>
      </article>
    )
  }

  const nameParts = student.name.split(" ")
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(" ")
  const progressPercent = Math.min((student.raised / student.funding) * 100, 100)

  return (
    <article className="flex flex-col overflow-y-auto relative">
      {/* Background Blob Shape */}
      <div 
        className="absolute top-[15%] -left-[10%] w-[55%] h-[50%] bg-accent blob-shape opacity-90 pointer-events-none z-0"
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Hero Section */}
        <header className="px-8 py-10 border-b border-foreground relative">
          <h1 className="font-serif huge-title mb-6 relative">
            {firstName}
            <br />
            {lastName}
            <StarburstBadge />
          </h1>
          <div className="heavy-underline text-lg inline-block">
            Currently →<br />
            {student.university}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 border-b border-foreground">
          <div className="p-6 border-r border-foreground border-b bg-background">
            <div className="text-[11px] font-medium uppercase tracking-[0.05em] mb-4 flex items-center gap-1">
              Academic Index <span className="text-accent">→</span>
            </div>
            <div className="font-serif text-4xl">
              {student.gpa.toFixed(2)} <span className="text-sm font-sans">GPA</span>
            </div>
          </div>
          <div className="p-6 border-b border-foreground bg-background">
            <div className="text-[11px] font-medium uppercase tracking-[0.05em] mb-4 flex items-center gap-1">
              Funding Goal <span className="text-accent">→</span>
            </div>
            <div className="font-serif text-4xl">
              ${student.funding.toLocaleString()}
            </div>
          </div>
          <div className="p-6 col-span-2 bg-background">
            <div className="text-[11px] font-medium uppercase tracking-[0.05em] mb-4 flex items-center gap-1">
              Achievements & Milestones <span className="text-accent">→</span>
            </div>
            <div className="space-y-1">
              {student.achievements.map((achievement, idx) => (
                <div key={idx} className="text-base heavy-underline">
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-8 text-base leading-relaxed bg-background flex-1 columns-1 md:columns-2 gap-10">
          <p>{student.bio}</p>
          <p className="mt-4">
            The required ${(student.funding / 1000).toFixed(0)}k funding will cover tuition, 
            research materials, and living expenses for the academic year. With {student.investors} investors 
            already committed, {"we're"} {progressPercent.toFixed(0)}% of the way to our goal.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="border-t border-foreground bg-background">
          <div className="h-2 bg-muted">
            <div 
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="px-8 py-4 flex justify-between text-sm">
            <span><strong>${student.raised.toLocaleString()}</strong> raised</span>
            <span><strong>{student.investors}</strong> investors</span>
            <span><strong>{progressPercent.toFixed(0)}%</strong> funded</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 border-t border-foreground">
          <button
            onClick={onDonate}
            className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.05em] border-r border-foreground bg-neon text-neon-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
          >
            Donate <span className="text-lg">→</span>
          </button>
          <button
            onClick={onInvest}
            className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.05em] bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
          >
            Invest <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </article>
  )
}
