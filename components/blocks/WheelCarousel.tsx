"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimation, PanInfo, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Project = {
    id?: string | number;
    thumbnail_img?: string;
    imageSrc?: string;
    URL?: string;
    title?: string;
    Title?: string;
    name?: string;
    excerpt?: string;
    description?: string;
    [key: string]: unknown;
};

interface WheelCarouselProps {
    projects: Project[];
}

const CARD_WIDTH = 242;
const GAP = 11; // Gap between cards

export default function WheelCarousel({ projects }: WheelCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });

    useEffect(() => {
        // Center the initial active card
        // We want the active card to be in the center of the screen
        // Screen Center = window.innerWidth / 2
        // Card Center relative to track = activeIndex * (CARD_WIDTH + GAP) + CARD_WIDTH / 2
        // X = Screen Center - Card Center
        const updateConstraints = () => {
            if (!containerRef.current) return;
            // Using a simplified center logic based on container width if possible, 
            // but usually for a full-width slider we use window or container center.
            // Let's assume the carousel container is full width.

            const centerOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
            const totalWidth = projects.length * (CARD_WIDTH + GAP) - GAP;

            // Calculate position for index 0
            const initialPos = centerOffset;
            controls.start({ x: initialPos, transition: { type: "spring", stiffness: 300, damping: 30 } });
        };

        updateConstraints();
        window.addEventListener("resize", updateConstraints);
        return () => window.removeEventListener("resize", updateConstraints);
    }, [projects.length, controls]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const velocity = info.velocity.x;
        const offset = info.offset.x;

        let newIndex = activeIndex;

        // Determine direction and threshold
        if (offset < -50 || velocity < -100) {
            newIndex = Math.min(activeIndex + 1, projects.length - 1);
        } else if (offset > 50 || velocity > 100) {
            newIndex = Math.max(activeIndex - 1, 0);
        }

        animateToIndex(newIndex);
    };

    const animateToIndex = (index: number) => {
        setActiveIndex(index);
        const centerOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
        // Position = Center - (Index * (Width + Gap))
        const newX = centerOffset - (index * (CARD_WIDTH + GAP));

        controls.start({
            x: newX,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        });
    };

    return (
        <div className="w-full relative overflow-hidden pt-0 pb-10 flex flex-col gap-0">
            {/* Carousel Track */}
            <div
                ref={containerRef}
                className="w-full h-[450px] flex items-center" // Height to accommodate growing active card
            >
                <motion.div
                    className="flex gap-[11px] absolute left-0 pl-[11px] pr-[11px]" // Add some padding
                    drag="x"
                    dragConstraints={{ left: -((projects.length - 1) * (CARD_WIDTH + GAP)), right: 0 }} // Loose constraints, we snap anyway
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    style={{ x }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {projects.map((project, index) => (
                        <WheelCard
                            key={project.id || index}
                            project={project}
                            isActive={index === activeIndex}
                            isNeighbor={Math.abs(index - activeIndex) === 1}
                            onClick={() => animateToIndex(index)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Pagination */}
            <Pagination
                total={projects.length}
                active={activeIndex}
            />
        </div>
    );
}

function WheelCard({ project, isActive, isNeighbor, onClick }: { project: Project, isActive: boolean, isNeighbor: boolean, onClick: () => void }) {
    // Fallback logic
    const image = project.thumbnail_img || project.imageSrc || project.URL || "/images/placeholder.jpg";
    const title = project.title || project.Title || project.name || "Project Title";
    const subtitle = project.excerpt || project.description || "Project Description";

    return (
        <motion.div
            layout
            onClick={onClick}
            animate={{
                height: isActive ? 388 : 343,
                opacity: isActive ? 1 : 0.7,
                zIndex: isActive ? 10 : 1,
                scale: isActive ? 1 : 0.95, // Subtle scale for "wheel" depth feel
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
                flex flex-col items-center p-[5px] gap-[11px] bg-[#E3E3E3] rounded-[28px]
                w-[242px] shrink-0 cursor-pointer
                ${isActive ? 'shadow-[-2px_3px_33.5px_rgba(0,0,0,0.15)]' : ''}
            `}
        >
            {/* Image Area */}
            <motion.div
                className="relative w-full rounded-[25px] overflow-hidden"
                animate={{
                    height: isActive ? 321 : 281
                }}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </motion.div>

            {/* Text Area */}
            <div className="w-full pl-[12px] pb-[7px] text-left">
                <h3 className="font-poppins font-semibold text-[14px] text-[#505050] leading-tight">
                    {title}
                </h3>
                <p className="font-poppins font-light text-[9px] text-[#505050] mt-1">
                    {subtitle}
                </p>
            </div>
        </motion.div>
    );
}

function Pagination({ total, active }: { total: number, active: number }) {
    return (
        <div className="flex justify-center items-center gap-[3px]">
            {Array.from({ length: total }).map((_, i) => {
                const isActive = i === active;
                const isNeighbor = Math.abs(i - active) === 1;

                // Determine size
                let sizeClass = "w-[6px] h-[6px]"; // Default/Outer
                if (isActive) sizeClass = "w-[17px] h-[9px]";
                else if (isNeighbor) sizeClass = "w-[9px] h-[9px]";

                return (
                    <motion.div
                        key={i}
                        className={`rounded-full ${sizeClass}`}
                        animate={{
                            width: isActive ? 17 : (isNeighbor ? 9 : 6),
                            height: isActive ? 9 : (isNeighbor ? 9 : 6),
                            backgroundColor: isActive ? "#505050" : "#EBEBEB"
                        }}
                    />
                );
            })}
        </div>
    )
}
