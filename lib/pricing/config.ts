// lib/pricing/config.ts
import {
    EstimatorConfig,
    ProjectTypeConfig,
    QuestionConfig,
} from "./types"; // adjust path as needed

export const estimatorConfig: EstimatorConfig = {
    //
    // 1) GLOBAL QUESTIONS (apply to all project types)
    //
    globalQuestions: [
        {
            id: "urgency",
            label: "How soon do you need this project done?",
            inputType: "singleSelectCards",
            required: true,
            options: [
                {
                    value: "flexible",
                    label: "Flexible (no rush)",
                    description: "Timeline is open, no strict deadline.",
                    priceImpactType: "multiplier",
                    priceImpactValue: 1.0,
                },
                {
                    value: "standard",
                    label: "Standard timeline",
                    description: "2–4 weeks, depending on scope.",
                    priceImpactType: "multiplier",
                    priceImpactValue: 1.1,
                },
                {
                    value: "fast",
                    label: "Fast delivery",
                    description: "Need it faster than usual.",
                    priceImpactType: "multiplier",
                    priceImpactValue: 1.25,
                },
                {
                    value: "urgent",
                    label: "Urgent / ASAP",
                    description: "High priority, tight deadline.",
                    priceImpactType: "multiplier",
                    priceImpactValue: 1.5,
                },
            ],
        },
        {
            id: "budgetRange",
            label: "What is your approximate budget range?",
            inputType: "singleSelectCards",
            required: false,
            options: [
                {
                    value: "under_500",
                    label: "Under $500",
                    priceImpactType: "none",
                },
                {
                    value: "500_1000",
                    label: "$500–$1,000",
                    priceImpactType: "none",
                },
                {
                    value: "1000_2000",
                    label: "$1,000–$2,000",
                    priceImpactType: "none",
                },
                {
                    value: "2000_plus",
                    label: "$2,000+",
                    priceImpactType: "none",
                },
            ],
        },
        {
            id: "existingAssets",
            label: "Do you already have any brand or design assets?",
            inputType: "multiSelectCheckbox",
            required: false,
            options: [
                { value: "logo", label: "Logo", priceImpactType: "none" },
                { value: "colors", label: "Color palette", priceImpactType: "none" },
                { value: "typography", label: "Typography", priceImpactType: "none" },
                { value: "wireframes", label: "Wireframes", priceImpactType: "none" },
                { value: "existing_site", label: "Existing website", priceImpactType: "none" },
            ],
        },
        {
            id: "projectDescription",
            label: "Tell me more about your project",
            helperText: "Share as many details as you want. This helps refine the estimate.",
            inputType: "textArea",
            required: false,
        },
    ],

    //
    // 2) PROJECT TYPES
    //
    projectTypes: [
        //
        // 2.1 Brand Identity
        //
        {
            id: "brand_identity",
            label: "Brand Identity",
            category: "brand",
            description: "Logo, visual language, and core identity for your brand.",
            basePrice: 500, // placeholder
            questions: [
                {
                    id: "brand_stage",
                    label: "What best describes your situation?",
                    inputType: "singleSelectCards",
                    required: true,
                    options: [
                        {
                            value: "new_brand",
                            label: "New brand / startup",
                            priceImpactType: "fixed",
                            priceImpactValue: 0,
                        },
                        {
                            value: "rebrand",
                            label: "Rebranding an existing business",
                            priceImpactType: "fixed",
                            priceImpactValue: 150,
                        },
                    ],
                },
                {
                    id: "brand_deliverables",
                    label: "Which brand identity elements do you need?",
                    inputType: "multiSelectCheckbox",
                    required: true,
                    options: [
                        {
                            value: "logo",
                            label: "Logo design",
                            priceImpactType: "fixed",
                            priceImpactValue: 300,
                        },
                        {
                            value: "color_palette",
                            label: "Color palette",
                            priceImpactType: "fixed",
                            priceImpactValue: 120,
                        },
                        {
                            value: "typography",
                            label: "Typography selection",
                            priceImpactType: "fixed",
                            priceImpactValue: 120,
                        },
                        {
                            value: "social_kit",
                            label: "Social media kit",
                            priceImpactType: "fixed",
                            priceImpactValue: 150,
                        },
                        {
                            value: "brand_guidelines",
                            label: "Brand guidelines / mini brand book",
                            priceImpactType: "fixed",
                            priceImpactValue: 250,
                        },
                        {
                            value: "stationery",
                            label: "Stationery (business cards, letterhead)",
                            priceImpactType: "fixed",
                            priceImpactValue: 150,
                        },
                    ],
                },
                {
                    id: "logo_concepts",
                    label: "How many initial logo concepts do you want?",
                    inputType: "singleSelectCards",
                    required: true,
                    options: [
                        {
                            value: "one",
                            label: "1 concept",
                            priceImpactType: "fixed",
                            priceImpactValue: 0,
                        },
                        {
                            value: "two_three",
                            label: "2–3 concepts",
                            priceImpactType: "fixed",
                            priceImpactValue: 150,
                        },
                        {
                            value: "four_plus",
                            label: "4+ concepts",
                            priceImpactType: "fixed",
                            priceImpactValue: 300,
                        },
                    ],
                },
                {
                    id: "revision_depth",
                    label: "How many rounds of revisions do you expect?",
                    inputType: "singleSelectCards",
                    required: true,
                    options: [
                        {
                            value: "light",
                            label: "Light (1–2 rounds)",
                            priceImpactType: "fixed",
                            priceImpactValue: 0,
                        },
                        {
                            value: "moderate",
                            label: "Moderate (3–4 rounds)",
                            priceImpactType: "fixed",
                            priceImpactValue: 120,
                        },
                        {
                            value: "heavy",
                            label: "Heavy (5+ rounds)",
                            priceImpactType: "fixed",
                            priceImpactValue: 250,
                        },
                    ],
                },
                {
                    id: "naming_tagline",
                    label: "Do you need help with naming or tagline?",
                    inputType: "multiSelectCheckbox",
                    required: false,
                    options: [
                        {
                            value: "naming",
                            label: "Naming",
                            priceImpactType: "fixed",
                            priceImpactValue: 200,
                        },
                        {
                            value: "tagline",
                            label: "Tagline",
                            priceImpactType: "fixed",
                            priceImpactValue: 150,
                        },
                    ],
                },
            ],
        },

        //
        // 2.2 Website
        //
        {
            id: "website",
            label: "Website",
            category: "web",
            description: "Marketing websites, landing pages, portfolios, and ecommerce.",
            basePrice: 800, // placeholder
            questions: [
                {
                    id: "website_type",
                    label: "What type of website do you need?",
                    inputType: "singleSelectCards",
                    required: true,
                    options: [
                        {
                            value: "landing",
                            label: "Landing page",
                            description: "Single-page focus on one main goal.",
                            priceImpactType: "fixed",
                            priceImpactValue: 0,
                        },
                        {
                            value: "multi_page",
                            label: "Multi-page business site",
                            description: "Standard pages like Home, About, Services, Contact.",
                            priceImpactType: "fixed",
                            priceImpactValue: 250,
                        },
                        {
                            value: "portfolio_blog",
                            label: "Portfolio / blog",
                            description: "Showcase + content publishing.",
                            priceImpactType: "fixed",
                            priceImpactValue: 200,
                        },
                        {
                            value: "ecommerce",
                            label: "Ecommerce website",
                            description: "Product catalogue, cart, checkout.",
                            priceImpactType: "fixed",
                            priceImpactValue: 500,
                        },
                    ],
                },
                {
                    id: "website_pages",
                    label: "Roughly how many pages do you need?",
                    inputType: "slider",
                    required: true,
                    slider: {
                        min: 1,
                        max: 20,
                        step: 1,
                        unit: "pages",
                        defaultValue: 5,
                        pricePerUnit: 60, // placeholder per page
                    },
                },
                {
                    id: "design_approach",
                    label: "How do you want the design to be handled?",
                    inputType: "singleSelectCards",
                    required: true,
                    options: [
                        {
                            value: "custom",
                            label: "Custom design from scratch",
                            priceImpactType: "fixed",
                            priceImpactValue: 300,
                        },
                        {
                            value: "template_based",
                            label: "Based on an existing template/theme",
                            priceImpactType: "fixed",
                            priceImpactValue: 0,
                        },
                        {
                            value: "have_design",
                            label: "I already have UI/UX designed",
                            priceImpactType: "fixed",
                            priceImpactValue: -150, // discount because design is done
                        },
                    ],
                },
                {
                    id: "cms",
                    label: "Do you need a CMS (content management system)?",
                    inputType: "singleSelectCards",
                    required: true,
                    options: [
                        {
                            value: "none",
                            label: "No CMS (static site)",
                            priceImpactType: "fixed",
                            priceImpactValue: 0,
                        },
                        {
                            value: "wordpress",
                            label: "Yes – WordPress",
                            priceImpactType: "fixed",
                            priceImpactValue: 250,
                        },
                        {
                            value: "headless",
                            label: "Headless CMS (Sanity, Contentful, etc.)",
                            priceImpactType: "fixed",
                            priceImpactValue: 400,
                        },
                    ],
                },
                {
                    id: "languages",
                    label: "Will your website be multilingual?",
                    inputType: "singleSelectCards",
                    required: true,
                    options: [
                        {
                            value: "one_language",
                            label: "Single language",
                            priceImpactType: "fixed",
                            priceImpactValue: 0,
                        },
                        {
                            value: "two_languages",
                            label: "2 languages",
                            priceImpactType: "fixed",
                            priceImpactValue: 200,
                        },
                        {
                            value: "three_plus_languages",
                            label: "3+ languages",
                            priceImpactType: "fixed",
                            priceImpactValue: 350,
                        },
                    ],
                },
                {
                    id: "website_features",
                    label: "Which features do you need?",
                    inputType: "multiSelectCheckbox",
                    required: false,
                    options: [
                        {
                            value: "contact_forms",
                            label: "Contact forms",
                            priceImpactType: "fixed",
                            priceImpactValue: 80,
                        },
                        {
                            value: "blog",
                            label: "Blog",
                            priceImpactType: "fixed",
                            priceImpactValue: 150,
                        },
                        {
                            value: "payments",
                            label: "Online payments",
                            priceImpactType: "fixed",
                            priceImpactValue: 300,
                        },
                        {
                            value: "booking",
                            label: "Booking system / calendar",
                            priceImpactType: "fixed",
                            priceImpactValue: 250,
                        },
                        {
                            value: "newsletter",
                            label: "Newsletter integration",
                            priceImpactType: "fixed",
                            priceImpactValue: 120,
                        },
                        {
                            value: "analytics",
                            label: "Analytics & tracking setup",
                            priceImpactType: "fixed",
                            priceImpactValue: 100,
                        },
                        {
                            value: "auth",
                            label: "User accounts / authentication",
                            priceImpactType: "fixed",
                            priceImpactValue: 400,
                        },
                    ],
                },
            ],
        },

        //
        // 2.3 Web App / Dashboard (Stub – extend later)
        //
        {
            id: "web_app",
            label: "Web App / Dashboard",
            category: "product",
            description: "SaaS, internal tools, admin panels, and dashboards.",
            basePrice: 1500, // placeholder
            questions: [
                // TODO: add detailed questions using the same structure:
                // web app type, core screens, auth, API complexity, real-time, etc.
            ],
        },

        //
        // 2.4 UI/UX Design Only (Stub – extend later)
        //
        {
            id: "ui_ux_design",
            label: "UI/UX Design (Figma)",
            category: "product",
            description: "Design only, ready for handoff to developers.",
            basePrice: 700, // placeholder
            questions: [
                // TODO: add platform, number of screens, design system, prototype, handoff level
            ],
        },

        //
        // 2.5 Video Editing / Content (Stub – extend later)
        //
        {
            id: "video_editing",
            label: "Video Editing / Content",
            category: "video",
            description: "Short-form and long-form content editing, YouTube, promos, etc.",
            basePrice: 300, // placeholder
            questions: [
                // TODO: add type of video, final length, raw footage, extra services, versions
            ],
        },
    ],
};
