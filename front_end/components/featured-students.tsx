import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

interface FeaturedStudent {
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

const featuredStudents: FeaturedStudent[] = [
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    field: "Sustainable Architecture",
    university: "TU Delft",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    fundingGoal: 45000,
    fundingRaised: 32000,
    gpa: 3.98,
    tags: ["1st Gen", "Green Tech", "Research"],
    isNew: true,
  },
  {
    id: "david-chen",
    name: "David Chen",
    field: "Quantum Computing",
    university: "Stanford University",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    fundingGoal: 32000,
    fundingRaised: 18500,
    gpa: 3.92,
    tags: ["Physics", "Quantum", "PhD"],
  },
  {
    id: "amina-diallo",
    name: "Amina Diallo",
    field: "Biomedical Sciences",
    university: "Johns Hopkins",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
    fundingGoal: 50000,
    fundingRaised: 42000,
    gpa: 3.95,
    tags: ["Underrep", "Medicine", "Research"],
  },
]

export function FeaturedStudents() {
  return (
    <section className="border-b border-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-foreground">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
            Featured Opportunities <span className="text-accent">→</span>
          </h2>
        </div>
        <Link 
          href="/discover"
          className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors"
        >
          Show all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3">
        {featuredStudents.map((student, idx) => {
          const progress = Math.round((student.fundingRaised / student.fundingGoal) * 100)
          const isLast = idx === featuredStudents.length - 1
          
          return (
            <Link
              key={student.id}
              href={`/student/${student.id}`}
              className={`group flex flex-col border-b border-foreground md:border-b-0 ${
                !isLast ? "md:border-r" : ""
              } hover:bg-muted/50 transition-colors`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden border-b border-foreground">
                <Image
                  src={student.image}
                  alt={student.name}
                  fill
                  className="object-cover grayscale-img group-hover:grayscale-0 transition-all duration-500"
                />
                {student.isNew && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-neon text-neon-foreground text-[10px] font-semibold uppercase tracking-wider">
                    New
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background transition-colors">
                  <Star className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-2xl mb-1">{student.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {student.field} • {student.university}
                </p>

                {/* Progress */}
                <div className="mt-auto space-y-2">
                  <div className="h-1 bg-muted">
                    <div 
                      className="h-full bg-accent transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">${student.fundingRaised.toLocaleString()} raised</span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {student.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider border border-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* GPA */}
                <div className="flex justify-between items-end mt-4 pt-4 border-t border-foreground">
                  <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">
                    GPA
                  </span>
                  <span className="font-serif text-lg">{student.gpa.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
