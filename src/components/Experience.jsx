import { useEffect, useRef, useState } from "react";
import mountainBg from "../assets/mountain-bg.webp";
import "./Experience.css";

const experiences = [
  {
    period: "2023 — Présent",
    title: "Développeur Fullstack Senior",
    company: "Programme BAL",
    description:
      "Développement de l'écosystème BAL. Différentes interfaces et API, pour que les communes puissent déclarer leurs adresses postales.",
  },
  {
    period: "2021 — 2023",
    title: "Freelance Développeur Fullstack",
    company: "OSIRIS",
    description:
      "Conception et développement d’une application pour ordonner et visualiser les formations et cursus des écoles de l’armée de l’air.",
  },
  {
    period: "2019 — 2021",
    title: "Freelance Développeur Fullstack",
    company: "SEPIA",
    description:
      "Création et développement d’une application web pour visualiser le trafic aérien en temps réel (comme FlightRadar24).",
  },
  {
    period: "2017 — 2019",
    title: "CDI Développeur Fullstack / Drupal",
    company: "Cosium",
    description:
      "Création et maintien de sites de e-commerces d'optique. Développement de fonctionnalités sur la solution SaaS Cosium.",
  },
  {
    period: "2014 — 2017",
    title: "Stage Développeur WEB / Mobile",
    company: "MonBuilding / IAPulse / Amexium / Subvitamine",
    description:
      "Stages et temps partiels pour des sites de e-commerces, application mobile hybride et solution SaaS.",
  },
];

function Experience() {
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const items = timeline.querySelectorAll(".timeline__item");
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const trigger = windowHeight * 0.75;

      // Line grows from top to bottom
      const started = trigger - timelineRect.top;
      const progress = Math.min(Math.max(started / timelineRect.height, 0), 1);
      setLineHeight(progress * 100);

      // Reveal items from top to bottom
      const newVisible = [];
      items.forEach((item, i) => {
        if (item.getBoundingClientRect().top < trigger) {
          newVisible.push(i);
        }
      });
      setVisibleItems(newVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="experience">
      <div className="experience__bg">
        <img
          src={mountainBg}
          alt=""
          width="1577"
          height="2909"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="experience__inner container">
        <h2 className="section-title">Expérience</h2>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline__line">
            <div
              className="timeline__line-fill"
              style={{ height: `${lineHeight}%` }}
            />
          </div>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline__item ${index % 2 === 0 ? "timeline__item--left" : "timeline__item--right"} ${visibleItems.includes(index) ? "timeline__item--visible" : ""}`}
            >
              <div className="timeline__dot" />
              <div className="timeline__card">
                <span className="timeline__period">{exp.period}</span>
                <h3 className="timeline__title">{exp.title}</h3>
                <span className="timeline__company">{exp.company}</span>
                <p className="timeline__description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
