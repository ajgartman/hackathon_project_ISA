"use client"

import Image from "next/image"

export interface Student {
  id: string
  name: string
  field: string
  funding: number
  image: string
  gpa: number
  university: string
  achievements: string[]
  bio: string
  raised: number
  investors: number
  tags: string[]
}

interface StudentRosterProps {
  students: Student[]
  selectedId: string | null
  onSelect: (student: Student) => void
}

export function StudentRoster({ students, selectedId, onSelect }: StudentRosterProps) {
  return (
    <section className="border-r border-foreground flex flex-col bg-background overflow-y-auto">
      {students.map((student) => {
        const isActive = selectedId === student.id
        return (
          <div
            key={student.id}
            className={`grid grid-cols-[60px_1fr] border-b border-foreground cursor-pointer transition-colors ${
              isActive 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => onSelect(student)}
          >
            <div className={`border-r aspect-square overflow-hidden ${isActive ? "border-accent-foreground/30" : "border-foreground"}`}>
              <Image
                src={student.image}
                alt={student.name}
                width={60}
                height={60}
                className={`w-full h-full object-cover grayscale contrast-110 ${
                  isActive ? "brightness-75" : ""
                }`}
              />
            </div>
            <div className="p-3 flex flex-col justify-between min-h-[60px]">
              <div className="font-serif text-xl leading-none">{student.name}</div>
              <div className="flex justify-between items-end text-xs mt-1">
                <span className={`heavy-underline ${isActive ? "decoration-accent-foreground/50" : ""}`}>
                  {student.field}
                </span>
                <span className="font-medium">${(student.funding / 1000).toFixed(0)}k</span>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
