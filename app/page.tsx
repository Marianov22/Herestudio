import Hero from "./components/Hero"
import Services from "./components/Services"
import ClientsGrid from "./components/ClientsGrid"
import Team from "./components/Team"
import ContactForm from "./components/ContactForm"
import Marquee from "./components/Marquee"
import Timeline from "./components/Timeline"
import FeatureCarousel from "./components/FeatureCarousel"
import NewsletterSubscribe from "./components/NewsletterSubscribe"

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Marquee />
      <FeatureCarousel />
      <NewsletterSubscribe />
      <ClientsGrid />
      <Timeline />
      <Team />
      <ContactForm />
    </main>
  )
}

