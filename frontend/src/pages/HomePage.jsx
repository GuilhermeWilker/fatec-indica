import ContentSection from "../components/home/content/ContentSection"
import HeroSection from "../components/home/hero/HeroSection"
import Footer from '../components/Footer'

export default function HomePage() {
    return (
        <div className="home">
            <HeroSection />
            <ContentSection />
            <Footer />
        </div>
    )
}