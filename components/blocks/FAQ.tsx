import React from "react";
import styles from "./FAQ.module.css";

const faqData = [
    {
        id: 1,
        question: "What services do you offer?",
    },
    {
        id: 2,
        question: "How does the design process work?",
    },
    {
        id: 3,
        question: "How long does a project usually take?",
    },
    {
        id: 4,
        question: "What do I need to provide before starting a project?",
    },
    {
        id: 5,
        question: "Do you offer revisions?",
    },
];

export default function FAQ() {
    return (
        <section className={styles.faqSection}>
            <div className={styles.faqHeader}>
                <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
                <p className={styles.faqDescription}>
                    Here are answers to some of the most common questions I receive as a
                    freelance designer. If you don’t see your question here, feel free to
                    reach out—I’m happy to help!
                </p>
            </div>

            <div className={styles.faqList}>
                {faqData.map((item) => (
                    <div key={item.id} className={styles.faqItem}>
                        <span className={styles.questionText}>
                            {item.id}. {item.question}
                        </span>
                        <span className={styles.arrowIcon}></span>
                    </div>
                ))}
            </div>
        </section>
    );
}
