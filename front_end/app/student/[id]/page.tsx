import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StudentProfile } from "@/components/student-profile"
import { notFound } from "next/navigation"

const students = [
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    field: "MSc Sustainable Architecture",
    university: "TU Delft",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    fundingGoal: 45000,
    fundingRaised: 32000,
    gpa: 3.98,
    tags: ["1st Gen", "Green Tech", "Research", "Hackathon Winner"],
    achievements: [
      "1st Place, Global Eco-Design Hackathon (2023)",
      "Published researcher in 'Journal of Circular Materials'",
      "Recipient of the National Merit Underrepresented Scholarship",
    ],
    bio: "Elena is pursuing her MSc in Sustainable Architecture at TU Delft, focusing on circular building materials.",
    research: "Elena's research focuses on developing bio-based construction materials that can be fully recycled at end-of-life, reducing the construction industry's environmental footprint.",
    fundingBreakdown: "The required $45k funding will cover tuition fees ($18k), research equipment ($12k), conference attendance ($5k), and living expenses ($10k) for 2 years.",
  },
  {
    id: "david-chen",
    name: "David Chen",
    field: "PhD Quantum Computing",
    university: "Stanford University",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    fundingGoal: 32000,
    fundingRaised: 18500,
    gpa: 3.92,
    tags: ["Physics", "Quantum", "PhD", "Research"],
    achievements: [
      "NSF Graduate Research Fellowship",
      "Published in Nature Physics (2024)",
      "IBM Quantum Challenge Winner",
    ],
    bio: "David is a PhD candidate at Stanford researching quantum error correction.",
    research: "Developing novel approaches to quantum error correction that could enable practical quantum computing for cryptography and drug discovery.",
    fundingBreakdown: "Funding covers lab equipment ($15k), conference travel ($7k), and stipend supplement ($10k) for accelerated research.",
  },
]

export default async function StudentPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const student = students.find((s) => s.id === id)

  if (!student) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <StudentProfile student={student} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
