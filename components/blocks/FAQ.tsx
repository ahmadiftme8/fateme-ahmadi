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
        <div className={styles['faq-container']}>
            <div className={styles['faq-header']}>
                <h2 className={styles['faq-title']}>
                    <span className={styles['title-mobile']}>FAQ</span>
                    <span className={styles['title-desktop']}>FREQUENTLY ASKED QUESTIONS</span>
                </h2>
                <p className={styles['faq-description']}>
                    Here are answers to some of the most common questions I receive as a
                    freelance designer. If you don’t see your question here, feel free to
                    reach out—I’m happy to help!
                </p>
            </div>
            <div className={styles['faq-list']}>
                {faqData.map((item) => (
                    <div key={item.id} className={styles['faq-item']}>
                        <span className={styles['question-text']}>
                            {item.id}. {item.question}
                        </span>
                        <div className={styles['chevron']}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
