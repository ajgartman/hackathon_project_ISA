"use client"

import { useState, useEffect } from "react"
import { FilterSidebar } from "@/components/filter-sidebar"
import { StudentRoster, type Student } from "@/components/student-roster"
import { StudentDetail } from "@/components/student-detail"
import { InvestmentModal } from "@/components/investment-modal"
import { AppShell } from "@/components/app-shell"
import { Smile, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { listContracts } from "@/lib/api"

const students: Student[] = [
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    field: "Sust. Architecture",
    university: "MSc Sustainable Architecture, TU Delft.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    funding: 45000,
    raised: 32000,
    investors: 24,
    gpa: 3.98,
    tags: ["1st Gen", "Green Tech", "Research"],
    achievements: [
      "1st Place, Global Eco-Design Hackathon (2023).",
      "Published researcher in 'Journal of Circular Materials'.",
      "Recipient of the National Merit Underrepresented Scholarship.",
    ],
    bio: "Elena's research focuses on developing self-healing concrete structures using bacterial spores, a breakthrough that could extend infrastructure lifespan by decades while drastically reducing carbon emissions from cement production. Her work bridges biotechnology and material science, representing a new frontier in sustainable construction.",
  },
  {
    id: "david-chen",
    name: "David Chen",
    field: "Quantum Comp.",
    university: "PhD Quantum Computing, Stanford University.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    funding: 32000,
    raised: 18500,
    investors: 15,
    gpa: 3.92,
    tags: ["Physics", "Quantum", "PhD"],
    achievements: [
      "NSF Graduate Research Fellowship Recipient.",
      "Published in Nature Physics (2024).",
      "IBM Quantum Challenge Winner.",
    ],
    bio: "David is pioneering new approaches to quantum error correction that could enable practical quantum computing within the decade. His work on topological qubits has attracted attention from major tech companies and government research agencies.",
  },
  {
    id: "amina-diallo",
    name: "Amina Diallo",
    field: "Biomedical Sci.",
    university: "PhD Biomedical Sciences, Johns Hopkins.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    funding: 50000,
    raised: 42000,
    investors: 31,
    gpa: 3.95,
    tags: ["Underrep", "Medicine", "Research"],
    achievements: [
      "Howard Hughes Medical Institute Scholar.",
      "First author publication in Cell Biology Journal.",
      "WHO Young Researcher Award.",
    ],
    bio: "Amina is investigating targeted drug delivery systems for treatment-resistant cancers using nanoparticle technology. Her innovative approach could revolutionize how we treat solid tumors with minimal side effects.",
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    field: "Aerospace Eng.",
    university: "MSc Aerospace Engineering, Georgia Tech.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    funding: 28000,
    raised: 12000,
    investors: 8,
    gpa: 3.85,
    tags: ["STEM", "Space Tech", "First-Gen"],
    achievements: [
      "NASA STEM Scholarship Recipient.",
      "SpaceX Hyperloop Competition Finalist.",
      "Design Patent: Reusable Rocket Fairing System.",
    ],
    bio: "Marcus is developing next-generation hybrid propulsion systems for small satellite deployment vehicles. His work could dramatically reduce the cost of space access for research institutions worldwide.",
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    field: "Urban Planning",
    university: "MArch Urban Planning, Columbia University.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    funding: 15000,
    raised: 9800,
    investors: 12,
    gpa: 3.78,
    tags: ["Cities", "Policy", "1st Gen"],
    achievements: [
      "Bloomberg Cities Fellow.",
      "Published in Urban Studies Quarterly.",
      "NYC Mayor's Office Policy Intern.",
    ],
    bio: "Sarah researches equitable housing policy, analyzing the impact of zoning reform on housing affordability in major US cities. Her work informs policy decisions that affect millions of urban residents.",
  },
]

export default function DiscoverPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [totalCommitment, setTotalCommitment] = useState(0)
  const [portfolioCount, setPortfolioCount] = useState(0)

  // Fetch real contract stats from backend
  useEffect(() => {
    listContracts()
      .then((res) => {
        const contracts = res.contracts || []
        setPortfolioCount(contracts.length)
        setTotalCommitment(contracts.reduce((acc: number, c: { amount_funded: number }) => acc + Number(c.amount_funded), 0))
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <AppShell 
        title="S. Scholar → Portfolio"
        showBottomBar={true}
        bottomBarContent={
          <div className="grid grid-cols-[1fr_auto_auto] items-stretch h-full">
            <div className="flex items-center px-4 gap-3 font-semibold">
              <Smile className="w-6 h-6" />
              <Link href="/portfolio" className="heavy-underline hover:text-accent transition-colors">
                Portfolio ({portfolioCount} Students)
              </Link>
            </div>
            <div className="flex items-center px-6 border-l border-foreground font-semibold">
              Total Commitment: ${totalCommitment.toLocaleString()}.00
            </div>
            <button 
              onClick={() => setShowInvestModal(true)}
              className="flex items-center px-8 border-l border-foreground font-semibold text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Invest in {selectedStudent.name.split(' ')[0]} →
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-[280px_350px_1fr] h-full overflow-hidden">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block overflow-y-auto">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden fixed bottom-16 left-4 z-40 flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background overflow-y-auto">
              <div className="p-4 border-b border-foreground flex justify-between items-center">
                <span className="font-semibold">Filters</span>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-sm font-semibold hover:text-accent"
                >
                  Close
                </button>
              </div>
              <FilterSidebar />
            </div>
          )}

          {/* Student Roster */}
          <div className="overflow-y-auto border-r border-foreground lg:border-r-0">
            <StudentRoster 
              students={students}
              selectedId={selectedStudent.id}
              onSelect={setSelectedStudent}
            />
          </div>

          {/* Student Detail - Desktop */}
          <div className="hidden lg:block overflow-y-auto">
            <StudentDetail 
              student={selectedStudent}
              onInvest={() => setShowInvestModal(true)}
              onDonate={() => setShowDonateModal(true)}
            />
          </div>
        </div>
      </AppShell>

      {/* Investment Modal */}
      {showInvestModal && (
        <InvestmentModal 
          student={selectedStudent}
          type="invest"
          onClose={() => setShowInvestModal(false)}
        />
      )}

      {/* Donate Modal */}
      {showDonateModal && (
        <InvestmentModal 
          student={selectedStudent}
          type="donate"
          onClose={() => setShowDonateModal(false)}
        />
      )}
    </>
  )
}
