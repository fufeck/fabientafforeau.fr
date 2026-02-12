import "./Formations.css";

const formations = [
  {
    year: "2017",
    title: "Diplôme 42",
    school: "École 42 — niveau 21 équivalent Master",
    description:
      "Faute de moyens, j'ai dû quitter Épitech pour l'école 42. Avec exactement la même philosophie : apprendre par soi-même. Avec un programme copié sur Epitech, j'ai très vite trouvé mes marques et pris beaucoup de plaisir pendant 5 ans.",
  },
  {
    year: "2016",
    title: "Digital Entrepreneurship HEC Paris",
    school: "Startup MonWagon",
    description:
      "Durant mon cursus à l'école 42, j'en ai profité pour participer à 2 formations de 4 mois chacune à HEC, où j'ai pu avoir une vision plus large que le simple dev. Nous avons monté un MVP de MonWagon qui était le Waze des transports en commun.",
  },
  {
    year: "2012",
    title: "2 années d'école d'ingénieur",
    school: "Epitech",
    description:
      "J'ai passé 2 ans dans cette école où il n'y a pas de profs et où les projets qui s'enchaînent nous obligent à nous débrouiller et apprendre tout seul. J'ai beaucoup aimé cette structure qui donne des bases solides en code C et C++, qui permet ensuite d'appréhender les autres langages plus facilement.",
  },
];

function Formations() {
  return (
    <section id="contact" className="formations">
      <div className="formations__inner container">
        <h2 className="section-title">Formations</h2>

        <div className="formations__list">
          {formations.map((formation, index) => (
            <div key={index} className="formations__item">
              <div className="formations__year">{formation.year}</div>
              <div className="formations__content">
                <h3 className="formations__title">{formation.title}</h3>
                <span className="formations__school">{formation.school}</span>
                <p className="formations__description">
                  {formation.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Formations;
