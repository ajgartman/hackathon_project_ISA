import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedStudents } from "@/components/featured-students"
import { BlockchainProof } from "@/components/blockchain-proof"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedStudents />
        <BlockchainProof />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
