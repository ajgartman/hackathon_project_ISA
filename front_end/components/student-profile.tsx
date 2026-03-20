"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { InvestmentModal } from "./investment-modal"
import type { Student } from "./student-roster"

interface StudentProfileProps {
  student: {
    id: string
    name: string
    field: string
    university: string
    image: string
    fundingGoal: number
    fundingRaised: number
    gpa: number
    tags: string[]
    achievements: string[]
    bio: string
    research: string
    fundingBreakdown: string
  }
}

export function StudentProfile({ student }: StudentProfileProps) {
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showDonateModal, setShowDonateModal] = useState(false)

  const progress = Math.round((student.fundingRaised / student.fundingGoal) * 100)

  // Map to the Student type the modal expects
  const modalStudent: Student = {
    id: student.id,
    name: student.name,
    field: student.field,
    university: student.university,
    image: student.image,
    funding: student.fundingGoal,
    raised: student.fundingRaised,
    investors: 0,
    gpa: student.gpa,
    tags: student.tags,
    achievements: student.achievements,
    bio: student.bio,
  }

  return (
    <>
      <div>
        {/* Back link */}
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Discover
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-0 border border-foreground">
          {/* Left: Image + Bio */}
          <div>
            <div className="relative aspect-[16/9] overflow-hidden border-b border-foreground">
              <Image
                src={student.image}
                alt={student.name}
                fill
                className="object-cover grayscale-img"
              />
            </div>

            <div className="p-8">
              <h1 className="font-serif text-5xl lg:text-6xl mb-2">{student.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {student.field} · {student.university}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {student.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider border border-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed">
                <p className="mb-4">{student.bio}</p>
                <p className="mb-4">{student.research}</p>
                <p>{student.fundingBreakdown}</p>
              </div>
            </div>
          </div>

          {/* Right: Stats + Actions */}
          <div className="border-l border-foreground">
            {/* GPA */}
            <div className="p-6 border-b border-foreground">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-2 text-muted-foreground">
                Academic Index
              </div>
              <div className="font-serif text-4xl">
                {student.gpa.toFixed(2)} <span className="text-sm font-sans">GPA</span>
              </div>
            </div>

            {/* Funding */}
            <div className="p-6 border-b border-foreground">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                Funding Progress
              </div>
              <div className="font-serif text-4xl mb-4">
                ${student.fundingRaised.toLocaleString()}
                <span className="text-lg font-sans text-muted-foreground"> / ${student.fundingGoal.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted mb-2">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{progress}% funded</p>
            </div>

            {/* Achievements */}
            <div className="p-6 border-b border-foreground">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                Achievements <span className="text-accent">→</span>
              </div>
              <div className="space-y-2">
                {student.achievements.map((a, i) => (
                  <div key={i} className="text-sm heavy-underline">{a}</div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2">
              <button
                onClick={() => setShowDonateModal(true)}
                className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.05em] border-r border-foreground bg-neon text-neon-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
              >
                Donate →
              </button>
              <button
                onClick={() => setShowInvestModal(true)}
                className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.05em] bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
              >
                Invest →
              </button>
            </div>
          </div>
        </div>
      </div>

      {showInvestModal && (
        <InvestmentModal
          student={modalStudent}
          type="invest"
          onClose={() => setShowInvestModal(false)}
        />
      )}
      {showDonateModal && (
        <InvestmentModal
          student={modalStudent}
          type="donate"
          onClose={() => setShowDonateModal(false)}
        />
      )}
    </>
  )
}
