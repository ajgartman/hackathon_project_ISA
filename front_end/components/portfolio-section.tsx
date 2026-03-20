"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, TrendingUp, Heart, ArrowRight } from "lucide-react"
import Image from "next/image"

const portfolioStudents = [
  {
    id: "1",
    name: "Marcus Chen",
    field: "Machine Learning",
    university: "MIT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    invested: 2500,
    type: "invest" as const,
    returnRate: 14.2,
    status: "Active"
  },
  {
    id: "2",
    name: "Sarah Williams",
    field: "Biomedical Eng.",
    university: "Stanford",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    invested: 1000,
    type: "donate" as const,
    status: "Graduated"
  },
]

export function PortfolioSection() {
  const [filter, setFilter] = useState<"all" | "invest" | "donate">("all")

  const filteredStudents = portfolioStudents.filter(
    (s) => filter === "all" || s.type === filter
  )

  const totalInvested = portfolioStudents
    .filter((s) => s.type === "invest")
    .reduce((acc, s) => acc + s.invested, 0)

  const totalDonated = portfolioStudents
    .filter((s) => s.type === "donate")
    .reduce((acc, s) => acc + s.invested, 0)

  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-foreground" />
            <h2 className="text-2xl font-semibold text-foreground">Your Portfolio</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={filter === "invest" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("invest")}
              className="rounded-full"
            >
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
              Investments
            </Button>
            <Button
              variant={filter === "donate" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("donate")}
              className="rounded-full"
            >
              <Heart className="mr-1.5 h-3.5 w-3.5" />
              Donations
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total Invested</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              ${totalInvested.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total Donated</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              ${totalDonated.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Portfolio Return</p>
            <p className="mt-1 text-2xl font-semibold text-accent">+12.4%</p>
          </div>
        </div>

        {/* Student list */}
        <div className="mt-8 space-y-3">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {student.field} · {student.university}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    ${student.invested.toLocaleString()}
                  </p>
                  {student.type === "invest" && student.returnRate && (
                    <p className="text-sm text-accent">+{student.returnRate}%</p>
                  )}
                </div>
                <Badge
                  variant={student.type === "invest" ? "default" : "secondary"}
                  className={
                    student.type === "invest"
                      ? "bg-accent/10 text-accent hover:bg-accent/20"
                      : "bg-donate/10 text-donate hover:bg-donate/20"
                  }
                >
                  {student.type === "invest" ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <Heart className="mr-1 h-3 w-3" />
                  )}
                  {student.type === "invest" ? "Investment" : "Donation"}
                </Badge>
                <Badge variant="outline">{student.status}</Badge>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">No {filter}s in your portfolio yet.</p>
            <Button className="mt-4 rounded-full" variant="outline">
              Discover Students
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
