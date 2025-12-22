import styles from "./Services.module.css";

type Service = {
  id: number;
  title: string;
  items: string[];
  image: string;
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
    image: "/images/vectors/graphic-designer.svg",
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
    image: "/images/vectors/web-development.svg",
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
    image: "/images/vectors/uiux-designer.svg",
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
    image: "/images/vectors/video-editor.svg",
  },
];

export default function Services() {
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
                <img
                  src={service.image}
                  alt={`${service.title} illustration`}
                  width={180}
                  height={180}
                />
              </div>

              <div className={styles.cardText}>
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardArrow}>
                <img
                  src="/images/vectors/card-arrow.svg"
                  alt="Arrow icon"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button className={styles.btnPrimary}>
        <span className={styles.dot} aria-hidden="true"></span>
        Get Started
      </button>
    </section>
  );
}
