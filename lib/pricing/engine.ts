import { ProjectTypeId, UserAnswers, PricingQuestion } from './types';
import { PROJECT_CONFIGS, GLOBAL_CONFIG } from './config';

// Module 3: calculateEstimate (The Engine)
export function calculateEstimate(projectTypeId: ProjectTypeId, answers: UserAnswers): number {
  const projectConfig = PROJECT_CONFIGS.find(p => p.id === projectTypeId);
  
  if (!projectConfig) {
    console.warn(`Project type ${projectTypeId} not found.`);
    return 0;
  }

  let total = projectConfig.basePrice;
  let multiplierTotal = 1;

  // Helper to process a single question
  const processQuestion = (q: PricingQuestion, answerValue: string | number | boolean | string[] | undefined) => {
    if (answerValue === undefined || answerValue === null) return;

    switch (q.calcType) {
      case 'base':
        // 'base' type generally just selects the base configuration, 
        // doesn't usually add cost unless options have costs.
        // If options have cost, we add them.
        if (q.options && typeof answerValue === 'string') {
             const selectedOption = q.options.find(opt => opt.value === answerValue);
             if (selectedOption?.cost) {
                 total += selectedOption.cost;
             }
        }
        break;

      case 'fixed_add':
        if (q.type === 'toggle' || typeof answerValue === 'boolean') {
             if (answerValue === true) {
                 if (q.fixedPrice) total += q.fixedPrice;
             }
        } else if (q.type === 'checkbox' && Array.isArray(answerValue)) {
            // Checkboxes: answerValue is array of selected values
            answerValue.forEach(val => {
                const opt = q.options?.find(o => o.value === val);
                if (opt?.cost) {
                    total += opt.cost;
                }
            });
        } else if (q.type === 'radio' && typeof answerValue === 'string') {
             const opt = q.options?.find(o => o.value === answerValue);
             if (opt?.cost) {
                 total += opt.cost;
             }
        }
        break;

      case 'linear':
         // Linear: inputValue * unitPrice
         const qty = Number(answerValue);
         if (!isNaN(qty) && q.unitPrice) {
             total += qty * q.unitPrice;
         }
         break;

      case 'multiplier':
        // Accumulate multipliers. 
        // Logic: Should they compound? (total * 1.5 * 1.3) or add? (total * (1 + 0.5 + 0.3))?
        // "Multipliers ... Multiplies the running subtotal (e.g., total * 1.5)." implies multiplication.
        
        if (q.type === 'toggle' || typeof answerValue === 'boolean') {
            if (answerValue === true && q.multiplierValue) {
                multiplierTotal *= q.multiplierValue;
            }
        } else if (q.type === 'radio') {
             const opt = q.options?.find(o => o.value === answerValue);
             // E.g. option has multiplier: 1.5
             // If option has explicit multiplier property
             if (opt?.multiplier) {
                 multiplierTotal *= opt.multiplier;
             }
        }
        break;
    }
  };

  // 1. Process Project-Specific Questions
  projectConfig.questions.forEach(q => {
      processQuestion(q, answers[q.id]);
  });

  // 2. Process Global Questions
  GLOBAL_CONFIG.questions.forEach(q => {
      processQuestion(q, answers[q.id]);
  });

  // 3. Apply Multipliers
  // "Critical: Apply "Multipliers" ... after calculating the sum of add-ons"
  const finalTotal = total * multiplierTotal;

  return Math.round(finalTotal);
}
