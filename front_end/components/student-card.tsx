"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export interface Student {
  id: string
  name: string
  field: string
  university: string
  image: string
  fundingGoal: number
  fundingRaised: number
  gpa: number
  tags: string[]
  isNew?: boolean
}

export function StudentCard({ student }: { student: Student }) {
  const percentFunded = Math.round((student.fundingRaised / student.fundingGoal) * 100)

  return (
    <Link 
      href={`/student/${student.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={student.image}
          alt={student.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {student.isNew && (
          <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
            NEW
          </Badge>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-foreground">{student.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {student.field} · {student.university}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">${student.fundingRaised.toLocaleString()}</span>
            <span className="text-muted-foreground">{percentFunded}% funded</span>
          </div>
          <Progress value={percentFunded} className="h-1.5" />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">
            Goal: ${student.fundingGoal.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-foreground">
            {student.gpa.toFixed(2)} GPA
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {student.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
