import React from "react";

import styles from "./FeaturedProjects.module.css";

type Category = {
  id: string;
  label: string;
  active: boolean;
  Icon: (props: { active?: boolean }) => JSX.Element;
};

type GalleryItem = {
  id: number;
  imageSrc: string;
};

const categories: Category[] = [
  { id: "graphic-design", label: "Graphic Design", active: true, Icon: GraphicDesignIcon },
  { id: "web-development", label: "Web Development", active: false, Icon: WebDevIcon },
  { id: "ui-ux-design", label: "UI/UX Design", active: false, Icon: UiUxIcon },
  { id: "video-editing", label: "Video Editing", active: false, Icon: VideoEditingIcon },
];

const subcategories = [
  { id: "brand-identity", label: "Brand Identity Design", active: true },
  { id: "packaging", label: "Packaging Design", active: false },
  { id: "print-editorial", label: "Print & Editorial Design", active: false },
  { id: "digital-social", label: "Digital & Social Media Design", active: false },
  { id: "ai-conceptual", label: "AI-Assisted & Conceptual Works", active: false },
];

const galleryItems: GalleryItem[] = [
  { id: 1, imageSrc: "/images/featured-1.jpg" },
  { id: 2, imageSrc: "/images/featured-2.jpg" },
  { id: 3, imageSrc: "/images/featured-3.jpg" },
  { id: 4, imageSrc: "/images/featured-4.jpg" },
  { id: 5, imageSrc: "/images/featured-5.jpg" },
  { id: 6, imageSrc: "/images/featured-6.jpg" },
];

export default function FeaturedProjects() {
  return (
    <section id="featured-projects" className={styles.featuredProjects}>
      <div className={styles.featuredProjects__container}>
        <h2 className={styles.featuredProjects__title}>Featured Projects</h2>

        <nav className={styles.featuredProjects__categories} aria-label="Featured project categories">
          <ul className={styles.featuredProjects__categoryList}>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`${styles.featuredProjects__category} ${
                  category.active ? styles["featuredProjects__category--active"] : ""
                }`}
                aria-current={category.active ? "true" : undefined}
              >
                <span className={styles.featuredProjects__categoryIcon} aria-hidden="true">
                  <category.Icon active={category.active} />
                </span>
                <span className={styles.featuredProjects__categoryLabel}>{category.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.featuredProjects__subcategories} role="list">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              type="button"
              className={`${styles.featuredProjects__pill} ${
                subcategory.active ? styles["featuredProjects__pill--active"] : ""
              }`}
              aria-pressed={subcategory.active}
            >
              {subcategory.label}
            </button>
          ))}
        </div>

        <div className={styles.featuredProjects__galleryRow}>
          <button
            type="button"
            className={`${styles.featuredProjects__arrow} ${styles["featuredProjects__arrow--left"]}`}
            aria-label="Previous projects"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div className={styles.featuredProjects__grid}>
            {galleryItems.map((item) => (
              <div key={item.id} className={styles.featuredProjects__gridItem}>
                <img
                  src={item.imageSrc}
                  alt={`Featured project ${item.id}`}
                  className={styles.featuredProjects__image}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.featuredProjects__arrow} ${styles["featuredProjects__arrow--right"]}`}
            aria-label="Next projects"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function GraphicDesignIcon({ active }: { active?: boolean }) {
  const color = active ? "#1F67F1" : "#797979";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <circle cx="30" cy="30" r="26" stroke={color} strokeWidth="4" fill={active ? "#E8F0FF" : "transparent"} />
      <circle cx="22" cy="26" r="3" fill={color} />
      <circle cx="30" cy="20" r="3" fill={color} />
      <circle cx="37" cy="27" r="3" fill={color} />
      <circle cx="33" cy="35" r="3" fill={color} />
    </svg>
  );
}

function WebDevIcon({ active }: { active?: boolean }) {
  const color = active ? "#1F67F1" : "#797979";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <rect x="10" y="12" width="40" height="30" rx="4" stroke={color} strokeWidth="4" />
      <rect x="18" y="20" width="24" height="14" rx="2" stroke={color} strokeWidth="3" />
      <rect x="18" y="38" width="24" height="4" rx="2" fill={color} />
      <rect x="14" y="46" width="32" height="4" rx="2" fill={color} />
    </svg>
  );
}

function UiUxIcon({ active }: { active?: boolean }) {
  const color = active ? "#1F67F1" : "#797979";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <rect x="12" y="14" width="36" height="32" rx="6" stroke={color} strokeWidth="4" />
      <rect x="18" y="20" width="10" height="10" rx="2" fill={color} />
      <rect x="32" y="20" width="10" height="10" rx="2" stroke={color} strokeWidth="3" />
      <rect x="18" y="34" width="24" height="4" rx="2" fill={color} />
      <rect x="18" y="41" width="14" height="3" rx="1.5" fill={color} />
    </svg>
  );
}

function VideoEditingIcon({ active }: { active?: boolean }) {
  const color = active ? "#1F67F1" : "#797979";
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <rect x="11" y="16" width="38" height="28" rx="4" stroke={color} strokeWidth="4" />
      <path d="M31 25L39 20V40L31 35V25Z" fill={color} />
      <circle cx="20" cy="24" r="2" fill={color} />
      <circle cx="20" cy="30" r="2" fill={color} />
      <circle cx="20" cy="36" r="2" fill={color} />
    </svg>
  );
}
