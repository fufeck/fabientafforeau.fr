import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React / NextJS', level: 80 },
      { name: 'TypeScript', level: 80 },
      { name: 'VueJs / NuxtJs', level: 60 },
      { name: 'Angular', level: 50 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express / NestJS', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 70 },
      { name: 'REST API', level: 90 },
    ],
  },
  {
    title: 'Outils',
    skills: [
      { name: 'Git', level: 75 },
      { name: 'Docker', level: 60 },
      { name: 'VS Code', level: 80 },
      { name: 'CI/CD', level: 70 },
      { name: 'Claude Code', level: 70 },
    ],
  },
]

function AnimatedPercent({ target, animate }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!animate) return
    const duration = 1200
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [animate, target])

  return <span className="skills__bar-percent">{value}%</span>
}

function Skills() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills__inner container">
        <h2 className="section-title">Compétences</h2>
        <p className="section-subtitle">Les technologies et outils que je maîtrise</p>

        <div className="skills__grid">
          {skillCategories.map((category) => (
            <div key={category.title} className="skills__category">
              <h3 className="skills__category-title">{category.title}</h3>
              <div className="skills__bars">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skills__bar">
                    <div className="skills__bar-header">
                      <span className="skills__bar-name">{skill.name}</span>
                      <AnimatedPercent target={skill.level} animate={visible} />
                    </div>
                    <div className="skills__bar-track">
                      <div
                        className="skills__bar-fill"
                        style={{ width: visible ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
