"use client";

import Image from "next/image";
import styles from "./Services.module.css";

type Service = {
  id: number;
  title: string;
  items: string[];
  description: string;
  image: string;
  categoryId: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Graphic Design",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
    description: "Logo and brand identity, social media and ad graphics, infographics, and custom illustrations/icons.",
    image: "/images/vectors/graphic-designer.svg",
    categoryId: "graphic-design",
  },
  {
    id: 2,
    title: "Web Development",
    items: [
      "Custom responsive website building",
      "Front-end development and animations",
      "CMS integration and e-commerce",
      " maintenance & performance tuning",
    ],
    description: "Responsive websites, front-end animations, CMS/e-commerce, performance maintenance.",
    image: "/images/vectors/web-development.svg",
    categoryId: "web-development",
  },
  {
    id: 3,
    title: "UI / UX Design",
    items: [
      "Web and mobile app interface design",
      "Wireframing and interactive prototypes",
      "User journey mapping and flow charts",
      "Design systems and style guides",
    ],
    description: "Web and mobile UI, wireframes and prototypes, user flows, design systems.",
    image: "/images/vectors/uiux-designer.svg",
    categoryId: "ui-ux-design",
  },
  {
    id: 4,
    title: "Video Editing",
    items: [
      "Promotional and social media editing",
      "Motion graphics and text animation",
      "Color correction and visual effects",
      "Audio mixing and sound enhancement",
    ],
    description: "Social and promo editing, motion graphics, color correction, visual effects, audio mixing.",
    image: "/images/vectors/video-editor.svg",
    categoryId: "video-editing",
  },
];

export default function Services() {
  const handleServiceClick = (categoryId: string) => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      // Update URL hash without triggering a page jump
      window.history.pushState(null, "", `#portfolio-${categoryId}`);
      
      // Smooth scroll to portfolio section
      portfolioSection.scrollIntoView({ behavior: "smooth" });
      
      // Dispatch custom event for FeaturedProjects to listen to
      window.dispatchEvent(new CustomEvent("changeFeaturedCategory", { detail: categoryId }));
    }
  };

  const handleGetStartedClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>My Services</h2>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => {
          // Determine if image should be on right (for 2nd and 4th cards - indices 1 and 3) - MOBILE ONLY
          const imageOnRight = index % 2 === 1;
          
          return (
            <div 
              key={service.id} 
              className={`${styles.serviceCard} ${imageOnRight ? styles.imageRight : ''}`}
            >
              <div className={styles.cardImage}>
                <Image
                  src={service.image}
                  alt={`${service.title} illustration`}
                  width={180}
                  height={180}
                />
              </div>

              <div className={styles.cardText}>
                <h3>{service.title}</h3>
                <ul className={styles.itemsList}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={styles.description}>{service.description}</p>
              </div>

              <button 
                className={styles.cardArrow}
                onClick={() => handleServiceClick(service.categoryId)}
                aria-label={`View ${service.title} projects`}
              >
                <Image
                  src="/images/vectors/card-arrow.svg"
                  alt=""
                  width={50}
                  height={50}
                />
              </button>
            </div>
          );
        })}
      </div>

      <button className={styles.btnPrimary} onClick={handleGetStartedClick}>
        <span className={styles.dot} aria-hidden="true"></span>
        Get Started
      </button>
    </section>
  );
}
