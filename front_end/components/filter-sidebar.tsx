"use client"

import { useState } from "react"

const fields = [
  { id: "aerospace", label: "Aerospace Engineering", checked: true },
  { id: "biomedical", label: "Biomedical Sciences", checked: false },
  { id: "quantum", label: "Quantum Computing", checked: false },
  { id: "sustainable", label: "Sustainable Architecture", checked: true, accent: true },
  { id: "ai", label: "Artificial Intelligence", checked: false },
  { id: "urban", label: "Urban Planning", checked: false },
]

const backgrounds = [
  { id: "first-gen", label: "First-Generation", checked: false },
  { id: "underrep", label: "Underrepresented Region", checked: true },
  { id: "refugee", label: "Refugee Status", checked: false },
  { id: "low-income", label: "Low-Income Background", checked: false },
]

export function FilterSidebar() {
  const [selectedFields, setSelectedFields] = useState<string[]>(
    fields.filter(f => f.checked).map(f => f.id)
  )
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>(
    backgrounds.filter(b => b.checked).map(b => b.id)
  )
  const [fundingMin, setFundingMin] = useState(10)
  const [fundingMax, setFundingMax] = useState(50)

  const toggleField = (id: string) => {
    setSelectedFields((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const toggleBackground = (id: string) => {
    setSelectedBackgrounds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  return (
    <aside className="border-r border-foreground flex flex-col bg-background overflow-y-auto">
      <div className="px-4 py-4 border-b border-foreground">
        <span className="text-[11px] font-medium uppercase tracking-[0.05em]">
          Discovery Parameters
        </span>
      </div>

      {/* Field of Study */}
      <div className="px-4 py-4 border-b border-foreground">
        <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-3 flex items-center gap-1">
          Field of Study <span className="text-accent">→</span>
        </div>
        <ul className="flex flex-col gap-2">
          {fields.map((field) => {
            const isSelected = selectedFields.includes(field.id)
            return (
              <li
                key={field.id}
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => toggleField(field.id)}
              >
                <span
                  className={`w-3.5 h-3.5 border-[1.5px] border-foreground inline-block flex-shrink-0 transition-colors ${
                    isSelected
                      ? field.accent
                        ? "bg-accent border-accent"
                        : "bg-foreground"
                      : ""
                  }`}
                />
                <span className="text-sm heavy-underline group-hover:text-accent transition-colors">
                  {field.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Background Context */}
      <div className="px-4 py-4 border-b border-foreground">
        <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-3 flex items-center gap-1">
          Background Context <span className="text-accent">→</span>
        </div>
        <ul className="flex flex-col gap-2">
          {backgrounds.map((bg) => {
            const isSelected = selectedBackgrounds.includes(bg.id)
            return (
              <li
                key={bg.id}
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => toggleBackground(bg.id)}
              >
                <span
                  className={`w-3.5 h-3.5 border-[1.5px] border-foreground inline-block flex-shrink-0 transition-colors ${
                    isSelected ? "bg-foreground" : ""
                  }`}
                />
                <span className="text-sm heavy-underline group-hover:text-accent transition-colors">
                  {bg.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Funding Required */}
      <div className="px-4 py-4 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-3 flex items-center gap-1">
          Funding Required <span className="text-accent">→</span>
        </div>
        <div className="text-2xl font-semibold mt-2">
          ${fundingMin}k — ${fundingMax}k
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs w-8">Min</span>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={fundingMin}
              onChange={(e) => setFundingMin(Number(e.target.value))}
              className="flex-1 h-1 bg-foreground appearance-none cursor-pointer accent-accent"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs w-8">Max</span>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={fundingMax}
              onChange={(e) => setFundingMax(Number(e.target.value))}
              className="flex-1 h-1 bg-foreground appearance-none cursor-pointer accent-accent"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
