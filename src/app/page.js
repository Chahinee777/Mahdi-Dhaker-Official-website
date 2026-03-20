import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PressQuotes from '@/components/PressQuotes'
import Tour from '@/components/Tour'
import Discography from '@/components/Discography'
import Media from '@/components/Media'
import Newsletter from '@/components/Newsletter'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />
      <Hero />
      <div className="divider" />
      <About />
      <PressQuotes />
      <div className="divider" />
      <Tour />
      <div className="divider" />
      <Discography />
      <div className="divider" />
      <Media />
      <Newsletter />
      <div className="divider" />
      <Contact />
      <Footer />
      <ScrollReveal />
    </>
  )
}
