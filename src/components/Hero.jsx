import { useEffect, useRef } from 'react'
import heroPhoto from '../assets/hero-photo.jpg'
import './Hero.css'

function Hero() {
  const photoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (photoRef.current) {
        const scrollY = window.scrollY
        photoRef.current.style.transform = `translateY(-${scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero__overlay" />
      <div className="hero__photo" ref={photoRef}>
        <img src={heroPhoto} alt="Fabien Tafforeau" />
      </div>
      <div className="hero__inner container">
        <div className="hero__text">
          <p className="hero__greeting">Bonjour, je suis</p>
          <h1 className="hero__name">Fabien Tafforeau</h1>
          <p className="hero__title">Développeur Fullstack</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
