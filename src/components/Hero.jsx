import { useEffect, useRef, useSyncExternalStore } from 'react'
import heroPhoto from '../assets/hero-photo.webp'
import heroPhotoMobile from '../assets/hero-photo-mobile.webp'
import BrickName from './BrickName'
import './Hero.css'

const desktopQuery = '(min-width: 768px)'
function subscribeToMedia(cb) {
  const mq = window.matchMedia(desktopQuery)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
function getMediaSnapshot() {
  return window.matchMedia(desktopQuery).matches
}
function getServerSnapshot() {
  return false
}

function Hero() {
  const photoRef = useRef(null)
  const isDesktop = useSyncExternalStore(subscribeToMedia, getMediaSnapshot, getServerSnapshot)

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
        <picture>
          <source media="(min-width: 768px)" srcSet={heroPhoto} type="image/webp" />
          <source srcSet={heroPhotoMobile} type="image/webp" />
          <img
            src={heroPhoto}
            alt="Fabien Tafforeau, Développeur Fullstack"
            width="960"
            height="1280"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="hero__inner container">
        <div className="hero__text">
          {isDesktop ? (
            <>
              <h1 className="hero__name sr-only">Fabien Tafforeau</h1>
              <BrickName />
            </>
          ) : (
            <>
              <p className="hero__greeting">Bonjour, je suis</p>
              <hgroup>
                <h1 className="hero__name-mobile">Fabien Tafforeau</h1>
                <p className="hero__title">Développeur Fullstack</p>
              </hgroup>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
