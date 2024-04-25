import ContentSection from "../components/home/content/ContentSection"
import HeroSection from "../components/home/hero/HeroSection"

export default function HomePage() {
    return (
        <div className="home">
            <HeroSection />
            <ContentSection />
        </div>
    )
}