"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';

// --- ICONS FROM FEATURED PROJECTS ---
const GraphicIcon = ({ className }: { className?: string }) => (
    <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M48.3333 30C47.0072 30 45.7355 29.4732 44.7978 28.5355C43.8601 27.5979 43.3333 26.3261 43.3333 25C43.3333 23.6739 43.8601 22.4021 44.7978 21.4645C45.7355 20.5268 47.0072 20 48.3333 20C49.6594 20 50.9312 20.5268 51.8689 21.4645C52.8065 22.4021 53.3333 23.6739 53.3333 25C53.3333 26.3261 52.8065 27.5979 51.8689 28.5355C50.9312 29.4732 49.6594 30 48.3333 30ZM38.3333 16.6667C37.0073 16.6667 35.7355 16.1399 34.7978 15.2022C33.8601 14.2645 33.3333 12.9927 33.3333 11.6667C33.3333 10.3406 33.8601 9.06881 34.7978 8.13113C35.7355 7.19345 37.0073 6.66667 38.3333 6.66667C39.6594 6.66667 40.9312 7.19345 41.8689 8.13113C42.8065 9.06881 43.3333 10.3406 43.3333 11.6667C43.3333 12.9927 42.8065 14.2645 41.8689 15.2022C40.9312 16.1399 39.6594 16.6667 38.3333 16.6667ZM21.6667 16.6667C20.3406 16.6667 19.0688 16.1399 18.1311 15.2022C17.1934 14.2645 16.6667 12.9927 16.6667 11.6667C16.6667 10.3406 17.1934 9.06881 18.1311 8.13113C19.0688 7.19345 20.3406 6.66667 21.6667 6.66667C22.9927 6.66667 24.2645 7.19345 25.2022 8.13113C26.1399 9.06881 26.6667 10.3406 26.6667 11.6667C26.6667 12.9927 26.1399 14.2645 25.2022 15.2022C24.2645 16.1399 22.9927 16.6667 21.6667 16.6667ZM11.6667 30C10.3406 30 9.06881 29.4732 8.13113 28.5355C7.19345 27.5979 6.66667 26.3261 6.66667 25C6.66667 23.6739 7.19345 22.4021 8.13113 21.4645C9.06881 20.5268 10.3406 20 11.6667 20C12.9927 20 14.2645 20.5268 15.2022 21.4645C16.1399 22.4021 16.6667 23.6739 16.6667 25C16.6667 26.3261 16.1399 27.5979 15.2022 28.5355C14.2645 29.4732 12.9927 30 11.6667 30ZM30 0C22.0435 0 14.4129 3.1607 8.7868 8.7868C3.1607 14.4129 0 22.0435 0 30C0 37.9565 3.1607 45.5871 8.7868 51.2132C14.4129 56.8393 22.0435 60 30 60C31.3261 60 32.5979 59.4732 33.5355 58.5355C34.4732 57.5978 35 56.3261 35 55C35 53.7 34.5 52.5333 33.7 51.6667C32.9333 50.7667 32.4333 49.6 32.4333 48.3333C32.4333 47.0072 32.9601 45.7355 33.8978 44.7978C34.8355 43.8601 36.1073 43.3333 37.4333 43.3333H43.3333C47.7536 43.3333 51.9928 41.5774 55.1184 38.4518C58.2441 35.3262 60 31.0869 60 26.6667C60 11.9333 46.5667 0 30 0Z" fill="currentColor"/>
    </svg>
);

const WebDevIcon = ({ className }: { className?: string }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.25449 21.6667C6.28783 27.1542 6.47783 31.0267 6.65366 33.4842C6.74533 34.7692 7.67533 35.7142 8.90366 35.8251C9.83033 35.9084 10.962 35.9917 12.312 36.0634C13.5117 34.7744 14.7344 33.507 15.9795 32.2617C19.0712 29.1584 21.1253 27.3001 22.4253 26.2067C24.0195 24.8651 26.267 24.6101 28.0945 25.8759C29.332 26.7326 31.1112 28.1376 33.5278 30.4259C33.6362 28.1617 33.7245 25.2609 33.7462 21.6667H6.25449ZM8.60533 39.1451C10.0453 39.2724 11.4878 39.3683 12.932 39.4326C14.8903 39.5226 17.2378 39.5842 20.0003 39.5842C25.222 39.5842 28.9587 39.3659 31.3962 39.1467C34.0295 38.9092 36.0703 36.9951 36.5703 34.4826L36.5795 34.4317C36.6239 34.199 36.6548 33.9623 36.672 33.7217C36.872 30.9384 37.0845 26.4517 37.0845 20.0001C37.0845 13.5484 36.8712 9.06175 36.672 6.27675C36.467 3.40925 34.2995 1.11591 31.3953 0.854248C28.9587 0.635081 25.222 0.416748 20.0003 0.416748C14.7787 0.416748 11.0428 0.635081 8.60533 0.854248C5.70199 1.11675 3.53366 3.40925 3.32866 6.27675C3.12949 9.06175 2.91699 13.5476 2.91699 20.0001C2.91699 26.4526 3.12949 30.9384 3.32866 33.7226C3.53366 36.5909 5.70199 38.8842 8.60533 39.1451ZM9.40782 14.7059C9.40782 14.2639 9.58342 13.84 9.89598 13.5274C10.2085 13.2148 10.6325 13.0392 11.0745 13.0392H28.9262C29.3682 13.0392 29.7921 13.2148 30.1047 13.5274C30.4172 13.84 30.5928 14.2639 30.5928 14.7059C30.5928 15.1479 30.4172 15.5719 30.1047 15.8844C29.7921 16.197 29.3682 16.3726 28.9262 16.3726H11.0745C10.6325 16.3726 10.2085 16.197 9.89598 15.8844C9.58342 15.5719 9.40782 15.1479 9.40782 14.7059ZM11.0745 6.52508C10.6325 6.52508 10.2085 6.70068 9.89598 7.01324C9.58342 7.3258 9.40782 7.74972 9.40782 8.19175C9.40782 8.63378 9.58342 9.0577 9.89598 9.37026C10.2085 9.68282 10.6325 9.85841 11.0745 9.85841H20.812C21.254 9.85841 21.6779 9.68282 21.9905 9.37026C22.3031 9.0577 22.4787 8.63378 22.4787 8.19175C22.4787 7.74972 22.3031 7.3258 21.9905 7.01324C21.6779 6.70068 21.254 6.52508 20.812 6.52508H11.0745ZM9.43033 27.3292C9.42967 26.8996 9.51364 26.474 9.67745 26.0769C9.84126 25.6797 10.0817 25.3186 10.385 25.0144C10.6884 24.7101 11.0487 24.4686 11.4454 24.3035C11.842 24.1385 12.2674 24.0532 12.697 24.0526C14.5053 24.0526 15.9653 25.5226 15.9653 27.3292C15.9653 29.1359 14.5053 30.6059 12.6978 30.6059C10.8903 30.6059 9.43033 29.1359 9.43033 27.3292Z" fill="currentColor"/>
    </svg>
);

const WebAppIcon = ({ className }: { className?: string }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M6.78016 38.2966C9.50599 38.5183 13.8327 38.7499 20.0002 38.7499C26.1677 38.7499 30.4943 38.5183 33.2202 38.2966C35.9602 38.0741 38.0743 35.9599 38.2968 33.2199C38.5185 30.4941 38.7502 26.1674 38.7502 19.9999C38.7502 16.9083 38.6918 14.2799 38.606 12.0833H1.39433C1.29489 14.721 1.24683 17.3603 1.25016 19.9999C1.25016 26.1674 1.48183 30.4941 1.7035 33.2199C1.926 35.9599 4.04016 38.0741 6.78016 38.2966Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.5127 9.58333C1.57381 8.50944 1.63742 7.575 1.70353 6.78C1.92603 4.04 4.04019 1.92583 6.78019 1.70333C9.50603 1.48167 13.8327 1.25 20.0002 1.25C26.1677 1.25 30.4944 1.48167 33.2202 1.70333C35.9602 1.92583 38.0744 4.04 38.2969 6.78C38.3624 7.57444 38.426 8.50889 38.4877 9.58333H1.5127ZM6.2502 5.83333C6.2502 5.50181 6.38189 5.18387 6.61631 4.94945C6.85073 4.71503 7.16867 4.58333 7.5002 4.58333H9.16686C9.49838 4.58333 9.81633 4.71503 10.0507 4.94945C10.2852 5.18387 10.4169 5.50181 10.4169 5.83333C10.4169 6.16485 10.2852 6.4828 10.0507 6.71722C9.81633 6.95164 9.49838 7.08333 9.16686 7.08333H7.5002C7.16867 7.08333 6.85073 6.95164 6.61631 6.71722C6.38189 6.4828 6.2502 6.16485 6.2502 5.83333ZM14.1669 4.58333C13.8353 4.58333 13.5174 4.71503 13.283 4.94945C13.0486 5.18387 12.9169 5.50181 12.9169 5.83333C12.9169 6.16485 13.0486 6.4828 13.283 6.71722C13.5174 6.95164 13.8353 7.08333 14.1669 7.08333H15.8335C16.165 7.08333 16.483 6.95164 16.7174 6.71722C16.9518 6.4828 17.0835 6.16485 17.0835 5.83333C17.0835 5.50181 16.9518 5.18387 16.7174 4.94945C16.483 4.71503 16.165 4.58333 15.8335 4.58333H14.1669Z" fill="currentColor"/>
    </svg>
);

const UiUxIcon = ({ className }: { className?: string }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g clipPath="url(#clip0_1217_211)">
            <path d="M25.2845 4.64332L35.3816 14.7425C35.9732 15.334 36.3783 16.0861 36.5466 16.9056C36.7149 17.7251 36.6391 18.576 36.3284 19.3528L31.2735 31.9912C30.9899 32.6987 30.5223 33.3175 29.9191 33.7835C29.316 34.2495 28.5992 34.5458 27.843 34.6416L16.9872 35.9988C16.7079 36.0316 16.4158 36.0715 16.1109 36.1185L15.1619 36.2724L14.666 36.3622L13.1207 36.6614L12.0627 36.8858L10.4703 37.2449L8.42909 37.7322L5.11186 38.5786L3.73111 38.9505C3.38266 39.0464 3.01573 39.0532 2.66397 38.9703C2.31221 38.8875 1.98688 38.7177 1.71779 38.4765C1.4487 38.2352 1.24448 37.9303 1.12384 37.5897C1.0032 37.249 0.97001 36.8836 1.02731 36.5267L1.09998 36.2147L1.73051 33.8379L2.29478 31.5979L2.78211 29.5567L3.13905 27.9644L3.36348 26.9042L3.66485 25.361L3.83584 24.3842L3.97263 23.4694L5.38331 12.184C5.47932 11.4276 5.77589 10.7107 6.24229 10.1075C6.70868 9.50428 7.32792 9.0368 8.03581 8.75351L20.6742 3.69859C21.451 3.38795 22.3019 3.31209 23.1214 3.4804C23.9409 3.64871 24.693 4.05166 25.2845 4.64332ZM17.3548 16.6234C16.8148 17.1637 16.4295 17.8389 16.2389 18.5787C16.0483 19.3184 16.0595 20.0958 16.2712 20.8298C16.1154 20.921 15.9717 21.0316 15.8437 21.1589L7.17017 29.8324C7.11333 29.8901 7.07404 29.9628 7.05689 30.0419L6.86666 30.8648L6.4862 32.4529L6.30239 33.2031C6.28357 33.2752 6.28395 33.3511 6.30349 33.423C6.32302 33.495 6.36104 33.5605 6.41376 33.6133C6.46647 33.666 6.53206 33.704 6.60401 33.7235C6.67596 33.7431 6.75177 33.7434 6.82391 33.7246L8.35642 33.3506L9.98725 32.9701C10.0659 32.952 10.1377 32.912 10.1946 32.8547L18.8681 24.1812C18.9953 24.0538 19.1059 23.9109 19.1973 23.7558C19.9215 23.9641 20.6879 23.9771 21.4189 23.7937C22.1498 23.6102 22.8192 23.2369 23.3593 22.7113C23.8995 22.1858 24.2911 21.5269 24.4945 20.8013C24.6979 20.0757 24.7058 19.3092 24.5176 18.5795C24.3293 17.8498 23.9515 17.1828 23.4224 16.6462C22.8933 16.1096 22.2318 15.7224 21.5048 15.5238C20.7779 15.3252 20.0114 15.3223 19.2829 15.5154C18.5545 15.7085 17.8901 16.0908 17.357 16.6234H17.3548ZM27.3108 0.627163C27.6786 0.258839 28.1681 0.037373 28.6875 0.00431724C29.207 -0.0287385 29.7207 0.128888 30.1321 0.447622L30.3331 0.627163L39.402 9.69397C39.7894 10.0777 40.0155 10.595 40.034 11.14C40.0525 11.685 39.862 12.2164 39.5015 12.6256C39.141 13.0347 38.6377 13.2906 38.0947 13.3408C37.5517 13.391 37.0101 13.2318 36.5807 12.8958L36.3776 12.7162L27.3108 3.64943C26.9101 3.24861 26.685 2.70506 26.685 2.1383C26.685 1.57154 26.9101 1.02798 27.3108 0.627163Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_1217_211">
                <rect width="40" height="40" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

import { PROJECT_CONFIGS, GLOBAL_CONFIG } from '@/lib/pricing/config';
import { calculateEstimate } from '@/lib/pricing/engine';
import { ProjectTypeId, PricingQuestion, PricingQuestionOption, UserAnswers } from '@/lib/pricing/types';
import InvoicePDF, { InvoiceItem } from './InvoicePDF';

// MAP ICONS TO IDs
const ICONS: Record<ProjectTypeId, React.ReactNode> = {
    brand: <GraphicIcon />,
    website: <WebDevIcon />,
    webapp: <WebAppIcon />,
    uiux: <UiUxIcon />,
};

// PREPARE DISPLAY DATA (Merging Config with Icons)
const PROJECT_DISPLAY_DATA = PROJECT_CONFIGS.map(config => ({
    ...config,
    icon: ICONS[config.id]
}));


const BUDGET_OPTIONS = [ // Keep as simple options, typing handled in usages
    { label: "$1k - $5k", value: "1-5k" },
    { label: "$5k - $10k", value: "5-10k" },
    { label: "$10k - $20k", value: "10-20k" },
    { label: "$20k+", value: "20k+" },
];

// DEADLINE_OPTIONS removed as it's replaced by Global Config Urgency


// ... imports ...
// (imports are already present in file, we just replace the component)

const SmoothSlider = ({ 
    value, 
    options, 
    onChange, 
    min, 
    max, 
    step 
}: { 
    value: number, 
    options?: { label: string; value?: string | number | boolean }[], 
    onChange: (val: number) => void, 
    min?: number, 
    max?: number, 
    step?: number 
}) => {
    const isRange = min !== undefined && max !== undefined;
    const range = isRange ? (max! - min!) : (options?.length ? options.length - 1 : 1);
    
    // Helper to get normalized progress (0-1)
    // Wrapped in useCallback to use in dependency array
    const getProgress = (val: number) => {
        if (isRange) return (val - min!) / range;
        if (!options || options.length <= 1) return 0;
        return val / (options.length - 1);
    };

    // Helper to get value from progress (0-1)
    const getValue = (prog: number) => {
        if (isRange) {
            const raw = min! + (prog * range);
            if (step) return Math.round(raw / step) * step;
            return Math.round(raw);
        }
        if (!options || options.length <= 1) return 0;
        return Math.round(prog * (options.length - 1));
    };

    const trackRef = useRef<HTMLDivElement>(null);
    const progress = useMotionValue(getProgress(value)); 
    const width = useTransform(progress, p => `${p * 100}%`);
    const left = useTransform(progress, p => `${p * 100}%`);
    
    const isDragging = useRef(false);

    // Sync external value changes
    useEffect(() => {
        if (!isDragging.current) {
            animate(progress, getProgress(value), { type: "spring", stiffness: 300, damping: 30 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, min, max, options?.length, progress]); 

    const updateProgress = (clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const newProgress = (clientX - rect.left) / rect.width;
        const clamped = Math.max(0, Math.min(1, newProgress));
        progress.set(clamped);
        return clamped;
    };

    const snapToNearest = () => {
        const currentProgress = progress.get();
        const newVal = getValue(currentProgress);
        const snappedProgress = getProgress(newVal);
        const clampedProgress = Math.max(0, Math.min(1, snappedProgress));
        
        animate(progress, clampedProgress, { type: "spring", stiffness: 400, damping: 25 });
        
        if (newVal !== value) {
            onChange(newVal);
        }
        return newVal;
    };

    // Touch Handling
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging.current) return;
            if (e.cancelable) e.preventDefault(); 
            updateProgress(e.touches[0].clientX);
        };

        const handleTouchEnd = () => {
            isDragging.current = false;
            snapToNearest();
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();
            isDragging.current = true;
            updateProgress(e.touches[0].clientX);
            
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
        };

        track.addEventListener('touchstart', handleTouchStart, { passive: false });

        return () => {
            track.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, options?.length, value, onChange]);

    // Mouse Handling
    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        updateProgress(e.clientX);
        
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            updateProgress(e.clientX);
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            snapToNearest();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="w-full px-3 py-8 touch-none select-none"> 
            <div 
                className="relative w-full h-[12px] bg-[#1F67F1]/10 rounded-full flex items-center cursor-pointer" 
                ref={trackRef}
                onMouseDown={handleMouseDown}
                style={{ touchAction: 'none' }}
            >
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#1F67F1] rounded-full pointer-events-none"
                    style={{ width }}
                />

                <motion.div
                    className="absolute top-1/2 w-6 h-6 z-20"
                    style={{ left, y: "-50%", x: "-50%" }}
                    whileHover={{ scale: 1.2 }}
                    initial={false}
                >
                     <div className="w-full h-full rounded-full bg-white border-[3px] border-[#1F67F1] shadow-md" />
                     
                     {/* Tooltip */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F67F1] text-white text-xs py-1 px-2 rounded-[8px] whitespace-nowrap font-bold shadow-sm pointer-events-none">
                        {options ? (options[value]?.label || value) : value}
                     </div>
                </motion.div>

                {/* Steps / Ticks - Only show if options are present */}
                {options && options.map((opt, idx) => (
                    <div
                        key={idx}
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-transparent z-0 pointer-events-none"
                        style={{ left: `${(idx / (options.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                    >
                         {idx !== value && <div className="w-1.5 h-1.5 bg-[#1F67F1]/30 rounded-full mx-auto" />}
                    </div>
                ))}
            </div>
             {/* Bottom Labels */}
             <div className="flex justify-between w-full mt-4 text-xs font-semibold text-gray-400 select-none">
                <span>{options ? options[0].label : min}</span>
                <span>{options ? options[options.length-1].label : max}</span>
            </div>
        </div>
    );
};


export default function PriceEstimator() {
    // STATE
    const [step, setStep] = useState(0);
    const [selectedType, setSelectedType] = useState<ProjectTypeId | null>(null);
    
    // New: Centralized answers state
    const [answers, setAnswers] = useState<UserAnswers>({});

    // Mobile Bar State
    const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);

    // Global inputs
    const [budgetIndex, setBudgetIndex] = useState<number>(0);
    const [description, setDescription] = useState("");
    
    // Invoice overlay state
    const [showInvoice, setShowInvoice] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);


    // Effect: Auto-select first option on Desktop
    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setSelectedType(PROJECT_DISPLAY_DATA[0].id);
        }
    }, []);

    // Reset mobile bar collapse when changing steps
    useEffect(() => {
        setIsMobileCollapsed(false);
    }, [step]);

    // --- Price Calculation ---
    const currentProject = PROJECT_DISPLAY_DATA.find(p => p.id === selectedType);
    
    // Calculate live price using the engine
    const totalPrice = selectedType ? calculateEstimate(selectedType, answers) : 0;
    
    // Helpers for display in sidebar
    const basePrice = currentProject?.basePrice || 0;
    const extraCost = Math.max(0, totalPrice - basePrice); // Simple diff for display

    // --- Invoice Generation ---
    const generateInvoiceItems = (): InvoiceItem[] => {
        if (!currentProject) return [];
        
        const items: InvoiceItem[] = [];
        
        // 1. Base Price
        items.push({
            label: `${currentProject.title} - Base Fee`,
            price: currentProject.basePrice
        });

        // 2. Loop through project-specific questions
        for (const question of currentProject.questions) {
            const answer = answers[question.id];
            if (answer === undefined || answer === null) continue;

            // Handle different question types
            if (question.type === 'range' || question.type === 'slider') {
                // Linear calc - pages/screens
                if (question.calcType === 'linear' && question.unitPrice && typeof answer === 'number') {
                    const count = answer;
                    const cost = count * question.unitPrice;
                    if (cost > 0) {
                        items.push({
                            label: `${question.label}: ${count} x $${question.unitPrice}`,
                            price: cost
                        });
                    }
                }
            } else if (question.type === 'radio') {
                // Radio selection
                const selectedOption = question.options?.find(opt => opt.value === answer);
                if (selectedOption) {
                    // For multiplier type (e.g., responsive)
                    if (question.calcType === 'multiplier' && selectedOption.multiplier && selectedOption.multiplier !== 1) {
                        items.push({
                            label: `${question.label}: ${selectedOption.label} (${selectedOption.multiplier}x)`,
                            price: 0 // Multiplier is applied to total, shown separately
                        });
                    }
                    // For fixed_add type
                    if (question.calcType === 'fixed_add' && selectedOption.cost && selectedOption.cost > 0) {
                        items.push({
                            label: `${question.label}: ${selectedOption.label}`,
                            price: selectedOption.cost
                        });
                    }
                }
            } else if (question.type === 'toggle') {
                // Toggle (boolean)
                if (answer === true && question.fixedPrice) {
                    items.push({
                        label: question.label,
                        price: question.fixedPrice
                    });
                }
            } else if (question.type === 'checkbox') {
                // Multiple checkboxes selected
                const selectedValues = (answer as string[]) || [];
                for (const val of selectedValues) {
                    const opt = question.options?.find(o => o.value === val);
                    if (opt && opt.cost && opt.cost > 0) {
                        items.push({
                            label: opt.label,
                            price: opt.cost
                        });
                    }
                }
            }
        }

        // 3. Check global questions (Urgency)
        for (const gq of GLOBAL_CONFIG.questions) {
            const gAnswer = answers[gq.id];
            if (gq.calcType === 'multiplier' && gAnswer === true && gq.multiplierValue) {
                items.push({
                    label: `Urgency Fee (${gq.multiplierValue}x multiplier)`,
                    price: 0 // Cost is embedded in total
                });
            }
        }

        return items;
    };

    // --- Handlers ---
    const handleNext = () => {
        if (step === 0 && !selectedType) return;
        if (step < 3) setStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    const handleTypeSelect = (id: ProjectTypeId) => {
        setSelectedType(id);
        setAnswers({}); // Reset answers on type change
    };

    const handleAnswerChange = (questionId: string, val: string | number | boolean | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: val
        }));
    };

    // --- Rich Input Components ---
    const renderQuestion = (q: PricingQuestion) => {
        const val = answers[q.id];

        if (q.type === 'slider' || q.type === 'range') {
             // Handle Slider
             // If range, we rely on min/max. If generic slider (mapped options), we use options.
             // Our config uses 'range' with min/max or 'options'.
             const currentValue = (typeof val === 'number') ? val : (q.min ?? 0); 
             
             return (
                 <div key={q.id} className="w-full mb-4">
                     <label className="block text-[#1F67F1] font-bold mb-2">{q.label}</label>
                     <SmoothSlider 
                         value={currentValue} 
                         min={q.min} max={q.max} step={q.step}
                         options={q.options}
                         onChange={(v) => handleAnswerChange(q.id, v)} 
                     />
                 </div>
             );
        }

        if (q.type === 'radio') {
            return (
                <div key={q.id} className="w-full mb-4">
                    <label className="block text-[#1F67F1] font-bold mb-2">{q.label}</label>
                    <div className="flex flex-col gap-2 w-full max-w-md">
                        {q.options?.map((opt: PricingQuestionOption, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswerChange(q.id, opt.value)}
                                className={`
                                    w-full p-4 rounded-[20px] border-2 text-left transition-all flex justify-between items-center
                                    ${val === opt.value 
                                        ? 'border-[#1F67F1] bg-[#1F67F1]/5' 
                                        : 'border-[#1F67F1]/30 bg-transparent hover:border-[#1F67F1]'
                                    }
                                `}
                            >
                                <span className={`font-bold text-lg ${val === opt.value ? 'text-[#1F67F1]' : 'text-gray-600'}`}>{opt.label}</span>
                                {opt.cost !== undefined && opt.cost > 0 && (
                                    <span className="text-sm text-[#1F67F1] font-semibold">
                                        +${opt.cost}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (q.type === 'toggle') {
            const isChecked = val === true;
            return (
                <div key={q.id} className="w-full mb-4 flex items-center justify-between p-3 rounded-[20px] border-2 border-[#1F67F1]/10">
                     <span className="font-bold text-[#1F67F1] text-lg">{q.label}</span>
                     <button 
                        onClick={() => handleAnswerChange(q.id, !isChecked)}
                        className={`w-[50px] h-[30px] rounded-full p-1 transition-colors ${isChecked ? 'bg-[#1F67F1]' : 'bg-gray-300'}`}
                     >
                        <div className={`w-[22px] h-[22px] bg-white rounded-full shadow-md transition-transform ${isChecked ? 'translate-x-[20px]' : 'translate-x-[0px]'}`} />
                     </button>
                </div>
            );
        }

        if (q.type === 'checkbox') {
             const selectedValues = (val as string[]) || []; // Improved cast
             return (
                <div key={q.id} className="w-full mb-4">
                    <label className="block text-[#1F67F1] font-bold mb-2">{q.label}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.options?.map((opt: PricingQuestionOption) => {
                            const isSelected = selectedValues.includes(opt.value as string);
                            return (
                                <button
                                    key={String(opt.value)}
                                    onClick={() => {
                                        const valToToggle = opt.value as string;
                                        const newSet = isSelected 
                                            ? selectedValues.filter(v => v !== valToToggle)
                                            : [...selectedValues, valToToggle];
                                        handleAnswerChange(q.id, newSet);
                                    }}
                                    className={`
                                        p-3 rounded-[15px] border-2 text-left transition-all flex justify-between items-center
                                        ${isSelected 
                                            ? 'border-[#1F67F1] bg-[#1F67F1]/5' 
                                            : 'border-[#1F67F1]/30 bg-transparent hover:border-[#1F67F1]'
                                        }
                                    `}
                                >
                                    <span className={`font-semibold ${isSelected ? 'text-[#1F67F1]' : 'text-gray-600'}`}>{opt.label}</span>
                                    {opt.cost !== undefined && opt.cost > 0 && <span className="text-xs text-[#1F67F1]">+${opt.cost}</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>
             );
        }

        return null; 
    };


    return (
        <section className="flex flex-col items-center w-full max-w-[1128px] mx-auto py-[40px] lg:py-[60px] font-['Inter']">
            
            {/* Header */}
            <div className="w-full flex-col lg:items-start items-center text-center lg:text-left mb-[30px] lg:mb-[42px] px-[20px]">
                <h2 className="font-[family-name:var(--font-big-shoulders),sans-serif] font-[800] text-[34px] lg:text-[60px] leading-[1.2] uppercase text-[#1F67F1] mb-[10px]">
                    LET&apos;S WORK TOGETHER
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-[10px] lg:gap-[17px]">
                    <div className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] bg-[#1F67F1] rounded-full flex justify-center items-center text-[#D9D9D9] font-[600] text-[16px] lg:text-[20px]">
                        {step + 1}
                    </div>
                    <div className="font-[600] text-[20px] lg:text-[31px] text-[#1F67F1]">
                        {step === 0 && "What Is Your Project Type?"}
                        {step === 1 && "Project Specifics"}
                        {step === 2 && "Tell Us More"}
                        {step === 3 && "Estimate Overview"}
                    </div>
                </div>
            </div>

            {/* Desktop: Split Screen | Mobile: Single Column */}
            <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[35px] items-start w-full px-[15px] lg:px-0">
                
                {/* --- LEFT WIZARD BOX --- */}
                <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="
                        relative 
                        lg:w-[742px] lg:min-h-[319px] 
                        w-[332px] sm:w-full min-h-[321px]
                        rounded-[45px] lg:rounded-[50px]
                        border lg:border-2 border-[#1F67F1]
                        flex flex-col justify-between
                        p-[20px] lg:p-[35px]
                        mx-auto
                    "
                >
                    <div className="flex-1 flex flex-col justify-center w-full">
                        <AnimatePresence mode="popLayout">
                            
                            {/* STEP 0: CARDS */}
                            {step === 0 && (
                                <motion.div 
                                    key="step0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-2 gap-[15px] lg:flex lg:flex-nowrap lg:gap-[14px] lg:justify-between w-full pb-2 lg:pb-0"
                                >
                                    {PROJECT_DISPLAY_DATA.map((type) => {
                                        const isActive = selectedType === type.id;
                                        return (
                                            <div 
                                                key={type.id}
                                                onClick={() => handleTypeSelect(type.id)}
                                                className={`
                                                    flex flex-col justify-center items-center gap-[10px] text-center cursor-pointer transition-all duration-200
                                                    w-full aspect-square lg:w-[155px] lg:h-[181px] lg:aspect-auto
                                                    rounded-[29px] flex-shrink-0
                                                    ${isActive 
                                                        ? 'bg-[#1F67F1] text-[#D9D9D9]' 
                                                        : 'border-2 border-[#1F67F1]/56 bg-transparent text-[#1F67F1]'
                                                    }
                                                `}
                                            >
                                                <div className={isActive ? 'text-[#D9D9D9]' : 'text-[#1F67F1]'}>
                                                    {type.icon}
                                                </div>
                                                <span className="font-[700] text-[16px] lg:text-[18px] leading-[1.1]">{type.title}</span>
                                                <span className={`text-[12px] lg:text-[14px] opacity-80 ${isActive ? 'text-[#D9D9D9]' : 'text-[#1F67F1]'}`}>
                                                    Base ${type.basePrice}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}

                            {/* STEP 1: SPECIFICS (Rich Inputs) */}
                            {step === 1 && currentProject && (
                                <motion.div 
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full h-full flex flex-col items-center justify-center lg:items-start"
                                >
                                    <div className="w-full flex flex-col justify-start">
                                        {currentProject.questions.map(q => renderQuestion(q))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: GLOBAL INPUTS */}
                            {step === 2 && (
                                <motion.div 
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full h-full flex flex-col items-center justify-center"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-[#1F67F1]">Budget Range</label>
                                            <SmoothSlider 
                                                value={budgetIndex}
                                                options={BUDGET_OPTIONS}
                                                onChange={setBudgetIndex}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-[#1F67F1]">Urgency</label>
                                            {/* Mapping Urgency Toggle from Global Config */}
                                            {GLOBAL_CONFIG.questions.map(q => renderQuestion(q))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full mt-4">
                                        <label className="font-semibold text-[#1F67F1]">Brief Description <span className="opacity-50 font-normal">(Optional)</span></label>
                                        <textarea 
                                            rows={2} placeholder="Project details..."
                                            className="p-3 border-2 border-[#1F67F1]/40 rounded-[15px] outline-none focus:border-[#1F67F1] resize-none"
                                            value={description} onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: SUMMARY */}
                            {step === 3 && (
                                <motion.div 
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full h-full flex flex-col items-center justify-center text-center py-6"
                                >
                                    <CheckCircle2 size={48} className="text-[#1F67F1] mb-4" />
                                    <h3 className="text-2xl font-bold text-[#1F67F1] uppercase mb-2">Estimate Ready</h3>
                                    <p className="text-gray-500 mb-6">Review your sidebar details.</p>
                                    <div className="w-full max-w-xs flex flex-col gap-3">
                                        
                                        <button 
                                            onClick={() => setIsGeneratingPdf(true)}
                                            disabled={isGeneratingPdf}
                                            className="w-full py-3 border-2 border-[#1F67F1] text-[#1F67F1] rounded-[46px] font-bold hover:bg-[#1F67F1]/5 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                        >
                                            {isGeneratingPdf ? (
                                                <>
                                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1F67F1]"></span>
                                                    Generating PDF...
                                                </>
                                            ) : (
                                                "Download Invoice"
                                            )}
                                        </button>

                                        <a href="#book" className="w-full py-3 bg-[#1F67F1] text-white rounded-[46px] font-bold shadow-md hover:shadow-lg transition-all">
                                            Book a Free Call
                                        </a>

                                        <button 
                                            onClick={() => setStep(0)} 
                                            className="text-gray-400 hover:text-[#1F67F1] transition-colors flex items-center justify-center gap-2 text-sm mt-2"
                                        >
                                            <RefreshCw size={14} /> Start Over
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* DESKTOP NAVIGATION BAR (Inside Left Box, Bottom Right) */}
                    {/* Fixed Overflow: Moved from absolute to relative flex placement */}
                    <div className="hidden lg:flex items-center gap-[23px] self-end mt-4 w-full justify-end">
                        
                        {/* Dynamic Container: Single row, gap handles spacing */}
                         <div className={`flex items-center gap-[23px] w-full ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                            
                            {/* Back Button - Only shows if step > 0 */}
                            {step > 0 && (
                                <button 
                                     onClick={handleBack}
                                     className="w-[45px] h-[45px] border-2 border-[#1F67F1] rounded-full flex items-center justify-center text-[#1F67F1] hover:bg-[#1F67F1]/5 transition-colors cursor-pointer flex-shrink-0"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            )}

                            {/* Progress Bar Container - Flex grow to fill space */}
                            {/* Logic: If no back button, it still needs to be bounded or defined. User said "Full width" initially? 
                                Actually "Initial State... progress bar should be full-width". 
                                Let's make it flex-1 so it takes all space between (or start) and continue button. 
                            */}
                            <div className="h-[15px] bg-[#1F67F1]/22 rounded-[26px] overflow-hidden relative flex-1 max-w-[339px] lg:max-w-none">
                                <motion.div 
                                    className="h-full bg-[#1F67F1] rounded-[26px]"
                                    initial={{ width: "25%" }}
                                    animate={{ width: `${((step + 1) / 4) * 100}%` }}
                                />
                            </div>

                            {/* Next Button */}
                            <button 
                                onClick={handleNext} 
                                disabled={step === 3 || (!selectedType && step === 0)}
                                className={`
                                    w-[155px] h-[45px] rounded-[46px] 
                                    flex items-center justify-center gap-2
                                    text-white font-[600] text-[18px]
                                    transition-all cursor-pointer flex-shrink-0
                                    ${(step === 3 || (!selectedType && step === 0)) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1F67F1] hover:opacity-90 shadow-sm'}
                                `}
                            >
                                {step === 2 ? 'Finish' : 'Continue'} 
                                {step < 3 && <ChevronRight size={20} />}
                            </button>
                         </div>
                    </div>
                </motion.div>

                {/* --- RIGHT SIDEBAR (Desktop Only) --- */}
                {/* Fixed Background: Changed bg-white to bg-transparent */}
                <div 
                    className="
                        hidden lg:flex flex-col
                        w-[351px] h-[319px] flex-shrink-0
                        rounded-[50px] border-2 border-[#1F67F1]
                        p-[35px]
                        bg-transparent
                    "
                >
                    <div className="flex justify-between items-center text-[#1F67F1] border-b border-[#1F67F1]/50 pb-[15px] mb-[15px]">
                        <span className="font-[600] text-[22px]">Live Estimate</span>
                        <span className="font-[800] text-[28px]">${totalPrice}</span>
                    </div>

                    <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                        <div className="flex justify-between text-[18px]">
                            <span className="text-black font-medium">Base</span>
                            <span className="text-[#1F67F1] font-bold">${basePrice}</span>
                        </div>
                        {selectedType && (
                            <div className="flex justify-between text-[16px] text-gray-600">
                                <span>{currentProject?.title}</span>
                                <span>Included</span>
                            </div>
                        )}
                        {extraCost > 0 && (
                            <div className="flex justify-between text-[18px]">
                                <span className="text-black font-medium">Add-ons</span>
                                <span className="text-[#1F67F1] font-bold">+${extraCost}</span>
                            </div>
                        )}
                    </div>

                     <button 
                        onClick={() => setIsGeneratingPdf(true)}
                        disabled={isGeneratingPdf}
                        className="w-full py-2 mt-auto bg-[#1F67F1] text-white rounded-full text-sm font-bold opacity-80 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {isGeneratingPdf ? "Generating..." : "Download Quote"}
                    </button>
                </div>

            </div>

            {/* --- MOBILE BOTTOM ACTION BAR --- */}
            {/* Specs: fixed bottom-0, h-[91px], bg-[#DDDDDD], shadow */}
            {/* Conditional Display: Step >= 0 AND SelectedType must be present */}
            <AnimatePresence>
                {step >= 0 && selectedType && (
                    <motion.div 
                        initial={{ y: "100%" }}
                        animate={{ y: isMobileCollapsed ? "100%" : 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="lg:hidden fixed bottom-0 left-0 w-full bg-[#DDDDDD] shadow-[0px_-3px_13.2px_rgba(0,0,0,0.09)] z-50 flex flex-col"
                    >
                        {/* Toggle Handle (Only Step 3) */}
                        {step === 3 && (
                            <button 
                                onClick={() => setIsMobileCollapsed(!isMobileCollapsed)}
                                className="
                                    absolute -top-[36px] left-[20px]
                                    h-[36px] px-4
                                    bg-[#DDDDDD] 
                                    rounded-t-[12px]
                                    shadow-[0px_-4px_6px_rgba(0,0,0,0.05)]
                                    flex items-center justify-center
                                    text-[#1F67F1]
                                    z-0
                                    pb-1
                                "
                            >
                                {isMobileCollapsed ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </button>
                        )}

                        {/* Progress Bar (Top Stripe) */}
                        <div className="w-full h-[6px] bg-[#1F67F1]/20 relative z-10">
                            <motion.div 
                                className="h-full bg-[#1F67F1]"
                                initial={{ width: "25%" }}
                                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="w-full h-[85px] px-[20px] flex items-center justify-center relative z-10 bg-[#DDDDDD]">
                            <div className="w-full max-w-[400px] flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-[#1F67F1] font-[600] text-[14px]">Live Estimate</span>
                                    <span className="text-[#1F67F1] font-[800] text-[32px] leading-tight font-[family-name:var(--font-big-shoulders),sans-serif]">${totalPrice}</span>
                                </div>
                                <div className="flex gap-3 items-center">
                                    {/* Only show Back button if step > 0 */}
                                    {step > 0 && (
                                         <button 
                                            onClick={handleBack} 
                                            className="w-[45px] h-[45px] border-2 border-[#1F67F1] rounded-full flex items-center justify-center text-[#1F67F1] bg-transparent"
                                         >
                                            <ChevronLeft size={24} />
                                         </button>
                                    )}
                                    <button 
                                        onClick={handleNext} 
                                        className="w-[120px] h-[45px] bg-[#1F67F1] rounded-[46px] text-white font-[600] text-[18px] flex items-center justify-center"
                                    >
                                        {step === 3 ? 'Book' : 'Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Invoice Overlay */}
            {/* Invoice Generation (Hidden/Auto) or Overlay */}
            {(showInvoice || isGeneratingPdf) && currentProject && (
                <InvoicePDF 
                    projectType={currentProject.title}
                    items={generateInvoiceItems()}
                    totalEstimate={totalPrice}
                    onClose={() => {
                        setShowInvoice(false);
                        setIsGeneratingPdf(false);
                    }}
                    autoDownload={isGeneratingPdf}
                />
            )}

        </section>
    );
}
