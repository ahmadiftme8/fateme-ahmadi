export type CalcType = 'base' | 'fixed_add' | 'linear' | 'multiplier';

export interface PricingRates {
  baseIds: {
    brand: number;
    website: number;
    webapp: number;
    uiux: number;
  };
  unitCosts: {
    websitePage: number;
    appScreen: number;
    uiScreen: number;
  };
  featureCosts: {
    brand: {
      colorType: number;
      socialKit: number;
      brandBook: number;
      illustration: number;
    };
    web: {
      headlessCms: number;
      ecom: number;
      gsap: number;
    };
    app: {
      auth: number;
      stripe: number;
      aiWrapper: number;
      realtime: number;
    };
    ui: {
      prototype: number;
    };
  };
  multipliers: {
    responsive: number;
    urgent: number;
  };
}

export type ProjectTypeId = 'brand' | 'website' | 'webapp' | 'uiux';

export interface PricingQuestionOption {
  label: string;
  value: string | number | boolean;
  cost?: number; // Pre-calculated cost if needed, but preferred to be derived via logic
  meta?: string;
}

export interface PricingQuestion {
  id: string; // Unique ID for the question (e.g., 'pages', 'cms', 'urgency')
  label: string;
  type: 'slider' | 'radio' | 'checkbox' | 'toggle' | 'range'; 
  calcType: CalcType; // How this question affects the price
  options?: PricingQuestionOption[]; // For radio, checkbox
  min?: number; // For slider/range
  max?: number; // For slider/range
  step?: number; // For slider/range
  unitPrice?: number; // For 'linear' calcType
  fixedPrice?: number; // For 'fixed_add' calcType
  multiplierValue?: number; // For 'multiplier' calcType
  targetKey?: string; // Key in PRICING_RATES to reference
}

export interface ProjectConfig {
  id: ProjectTypeId;
  title: string;
  description: string;
  basePrice: number;
  questions: PricingQuestion[];
}

export interface GlobalConfig {
    questions: PricingQuestion[];
}

export type UserAnswers = Record<string, any>;
