"use client"

import Image from "next/image"
import Link from "next/link"
import type { Student } from "./student-card"

interface StudentListItemProps {
  student: Student
  isSelected?: boolean
  onSelect?: () => void
}

export function StudentListItem({ student, isSelected, onSelect }: StudentListItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-4 border-b border-border p-4 text-left transition-colors hover:bg-muted/50 ${
        isSelected ? "bg-accent/10" : ""
      }`}
    >
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-muted">
        <Image
          src={student.image}
          alt={student.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-foreground">{student.name}</h3>
            <p className="text-sm text-accent">{student.field}</p>
          </div>
          <span className="flex-shrink-0 text-sm font-medium text-foreground">
            ${(student.fundingGoal / 1000).toFixed(0)}k
          </span>
        </div>
      </div>
    </button>
  )
}

export function StudentListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-border p-4">
      <div className="h-14 w-14 flex-shrink-0 animate-pulse rounded-full bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-4 w-12 animate-pulse rounded bg-muted" />
    </div>
  )
}
