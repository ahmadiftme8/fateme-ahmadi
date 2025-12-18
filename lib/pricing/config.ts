import { ProjectConfig, GlobalConfig } from './types';
import { PRICING_RATES } from './constants';

// Module 2: PRICING_CONFIG (The Schema)
export const PROJECT_CONFIGS: ProjectConfig[] = [
  {
    id: 'brand',
    title: 'Brand Identity',
    description: 'Logo, colors & typography',
    basePrice: PRICING_RATES.baseIds.brand,
    questions: [
      {
        id: 'brand_style', // Replacing "Style" radio
        label: 'Style',
        type: 'radio',
        calcType: 'base', // Only selects style, doesn't add cost ideally, or maybe it does? 
                          // Prompt says: "Brand Identity: Checkboxes (Add-ons), Radio (Style)." 
                          // Assuming "Style" might just be informational or have 0 cost if not specified in RATES.
                          // Prompt Features: Color/Type, Social Kit, Brand Book, Illustration. 
                          // Let's assume these are the Checkboxes.
        options: [
            { label: 'Minimal', value: 'minimal', cost: 0 },
            { label: 'Bold', value: 'bold', cost: 0 },
        ]
      },
      {
        id: 'brand_addons',
        label: 'Add-ons',
        type: 'checkbox',
        calcType: 'fixed_add',
        options: [
          { label: 'Color & Typography', value: 'colorType', cost: PRICING_RATES.featureCosts.brand.colorType },
          { label: 'Social Media Kit', value: 'socialKit', cost: PRICING_RATES.featureCosts.brand.socialKit },
          { label: 'Brand Book', value: 'brandBook', cost: PRICING_RATES.featureCosts.brand.brandBook },
          { label: 'Custom Illustration', value: 'illustration', cost: PRICING_RATES.featureCosts.brand.illustration },
        ]
      }
    ]
  },
  {
    id: 'website',
    title: 'Website',
    description: 'Marketing & landing pages',
    basePrice: PRICING_RATES.baseIds.website,
    questions: [
      {
        id: 'website_pages',
        label: 'Number of Pages',
        type: 'range', // "Range (Pages via 'linear')"
        calcType: 'linear',
        unitPrice: PRICING_RATES.unitCosts.websitePage,
        min: 1,
        max: 20,
        step: 1,
        options: [
             { label: "1-3", value: 3, meta: "Small" }, // Using max of range as value for estimation safety? Or user picks exact number?
                                                        // UI has "1-3", "4-7", "8+". The prompt says "Range (Pages via 'linear')".
                                                        // If it's a slider returning an integer, we use that integer.
                                                        // Let's assume the UI slider provides a specific number or we map index to number.
             // For now, let's Stick to the existing UI style which returns an index, but the engine expects a number for linear.
             // We will handle the mapping in the UI component or here.
             // Prompt says: "Range (Pages via 'linear')".
             // Let's assume the input value is the number of pages.
        ]
      },
      {
        id: 'website_cms',
        label: 'CMS Integration',
        type: 'radio', // "Radio (CMS)"
        calcType: 'fixed_add',
        options: [
            { label: 'None', value: 'none', cost: 0 },
            { label: 'Headless CMS', value: 'headless', cost: PRICING_RATES.featureCosts.web.headlessCms },
        ]
      },
      {
        id: 'website_animation',
        label: 'Advanced Animation',
        type: 'toggle', // "Toggle (Animation)"
        calcType: 'fixed_add',
        fixedPrice: PRICING_RATES.featureCosts.web.gsap
      },
      {
        id: 'website_ecom',
        label: 'E-commerce Functionality',
        type: 'toggle',
        calcType: 'fixed_add',
        fixedPrice: PRICING_RATES.featureCosts.web.ecom
      }
    ]
  },
  {
    id: 'webapp',
    title: 'Web App / SaaS',
    description: 'Functional dashboards & tools',
    basePrice: PRICING_RATES.baseIds.webapp,
    questions: [
      {
        id: 'webapp_screens',
        label: 'Number of Screens',
        type: 'range',
        calcType: 'linear',
        unitPrice: PRICING_RATES.unitCosts.appScreen,
        min: 1,
        max: 50,
      },
      {
        id: 'webapp_features',
        label: 'Features',
        type: 'checkbox',
        calcType: 'fixed_add',
        options: [
          { label: 'Authentication', value: 'auth', cost: PRICING_RATES.featureCosts.app.auth },
          { label: 'Payments (Stripe)', value: 'stripe', cost: PRICING_RATES.featureCosts.app.stripe },
          { label: 'AI Integration', value: 'ai', cost: PRICING_RATES.featureCosts.app.aiWrapper },
          { label: 'Realtime / Socket', value: 'realtime', cost: PRICING_RATES.featureCosts.app.realtime },
        ]
      }
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Design prototypes (Figma)',
    basePrice: PRICING_RATES.baseIds.uiux,
    questions: [
      {
        id: 'ui_screens',
        label: 'Number of Screens',
        type: 'range',
        calcType: 'linear',
        unitPrice: PRICING_RATES.unitCosts.uiScreen,
      },
      {
        id: 'ui_responsive',
        label: 'Responsive Design',
        type: 'radio',
        calcType: 'multiplier',
        options: [ // "Radio (Responsiveness via 'multiplier')"
            { label: 'Desktop Only', value: 'desktop', multiplier: 1 }, // Assuming 1 means no extra
            { label: 'Mobile + Desktop', value: 'responsive', multiplier: PRICING_RATES.multipliers.responsive },
        ]
      },
      {
        id: 'ui_prototype',
        label: 'Interactive Prototype',
        type: 'toggle',
        calcType: 'fixed_add',
        fixedPrice: PRICING_RATES.featureCosts.ui.prototype
      }
    ]
  }
];

export const GLOBAL_CONFIG: GlobalConfig = {
    questions: [
        {
            id: 'global_urgency',
            label: 'Urgency',
            type: 'toggle', // "Global: Urgency (Multiplier)." - Toggles usually easiest, or maybe Radio?
                            // "Multipliers: Responsive Design (1.5), Urgent Deadline (1.3)."
            calcType: 'multiplier',
            multiplierValue: PRICING_RATES.multipliers.urgent,
            options: [
                 { label: "Standard", value: false },
                 { label: "Urgent (ASAP)", value: true }
             ]
        }
    ]
};
