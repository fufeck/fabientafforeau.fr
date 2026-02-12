import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner container">
        <h2 className="section-title">Un peu plus sur moi</h2>
        <p className="about__description">
          Toujours avec un ordinateur dans les mains depuis mon plus jeune âge.
          J'ai appris grâce à Epitech puis 42 à m'adapter et à me former très
          rapidement sur de nouveaux langages. J'aime aussi beaucoup les défis
          techniques et l'optimisation. Assez créatif, j'adore prendre part à la
          conception d'un projet et assure le suivi avec le client afin de parler
          à d'autres personnes que mon ordinateur.
        </p>
        <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="about__cv-link">
          Voir mon CV
        </a>
      </div>
    </section>
  )
}

export default About
