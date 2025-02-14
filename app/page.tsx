import Hero from "./components/Hero"
import ClientsGrid from "./components/ClientsGrid"
import Team from "./components/Team"
import ContactForm from "./components/ContactForm"
import Marquee from "./components/Marquee"
import Timeline from "./components/Timeline"
import FeatureCarousel from "./components/FeatureCarousel"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeatureCarousel />
      <ClientsGrid />
      <Timeline />
      <Team />
      <ContactForm />
    </>
  )
}

