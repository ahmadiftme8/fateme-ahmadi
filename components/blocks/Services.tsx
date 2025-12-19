import styles from "./Services.module.css";

type Service = {
  id: number;
  title: string;
  items: string[];
};

const services: Service[] = [
  {
    id: 1,
    title: "Graphic Design",
    items: [
      "Logo design and visual brand identity",
      "Social media graphics and marketing ads",
      "Print collateral and brochure layout",
      "Custom illustrations and vector art",
    ],
  },
  {
    id: 2,
    title: "Web Development",
    items: [
      "Custom responsive website building",
      "Front-end development and animations",
      "CMS integration and e-commerce setup",
      "Site maintenance and performance tuning",
    ],
  },
  {
    id: 3,
    title: "UI/UX Design",
    items: [
      "Web and mobile app interface design",
      "Wireframing and interactive prototypes",
      "User journey mapping and flow charts",
      "Design systems and style guides",
    ],
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
  },
];

export default function Services() {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesContainer}>
        <h2 className="sectionTitle">My Services</h2>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceNumber}>{service.id}</div>
              <div className={styles.serviceDivider} aria-hidden="true" />

              <div className={styles.serviceBody}>
                <div className={styles.serviceHeader}>
                  <h3 className={styles.serviceName}>{service.title}</h3>
                </div>

                <ul className={styles.serviceList}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* <span aria-hidden className={styles.serviceArrow} /> */}
            </div>
          ))}
        </div>

        <div className={styles.ctabtndiv}>
          <a className={styles.serviceCta} href="#contact">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
