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
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
  },
  {
    id: 2,
    title: "Web Development",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
  },
  {
    id: 3,
    title: "UI/UX Design",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
  },
  {
    id: 4,
    title: "Video Editing",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
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
              <span aria-hidden className={styles.serviceArrow} />
            </div>
          ))}
        </div>

        <div className={styles.ctabtndiv}>
          <button className={styles.serviceCta} type="button">
            Get Started
            
          </button>
        </div>
      </div>
    </section>
  );
}
