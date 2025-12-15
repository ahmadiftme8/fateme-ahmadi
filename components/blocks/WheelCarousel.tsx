"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useAnimation, PanInfo, animate, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { FaDribbble } from "react-icons/fa";

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
    isDribbble?: boolean; // New flag for the CTA card
    [key: string]: unknown;
};

interface WheelCarouselProps {
    projects: Project[];
}

const CARD_WIDTH = 242;
const GAP = 11; // Gap between cards

export default function WheelCarousel({ projects }: WheelCarouselProps) {
    // 1. Prepare Data: Add Dribbble Card
    const projectsWithCta = useMemo(() => {
        const dribbbleCard: Project = {
            id: "dribbble-cta",
            isDribbble: true,
            title: "Check out my Dribbble",
            description: "If you want to see more graphic design works, check out my Dribbble.",
            URL: "https://dribbble.com/ftm_psd"
        };
        return [...projects, dribbbleCard];
    }, [projects]);

    const totalItems = projectsWithCta.length;
    const itemFullWidth = CARD_WIDTH + GAP;

    // Start at a huge index to allow practically infinite scrolling left/right
    const START_INDEX = 10000;
    const [centerIndex, setCenterIndex] = useState(START_INDEX);
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial Positioning
    useEffect(() => {
        const centerOffset = typeof window !== 'undefined' ? window.innerWidth / 2 - CARD_WIDTH / 2 : 0;
        const initialX = centerOffset - (START_INDEX * itemFullWidth);
        x.set(initialX);
        setCenterIndex(START_INDEX);
    }, [itemFullWidth, x]);

    // Track active index based on position
    useMotionValueEvent(x, "change", (latest) => {
        const centerOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
        // latest = centerOffset - (index * itemFullWidth)
        // index = (centerOffset - latest) / itemFullWidth
        const rawIndex = (centerOffset - latest) / itemFullWidth;
        const roundedIndex = Math.round(rawIndex);

        if (roundedIndex !== centerIndex) {
            setCenterIndex(roundedIndex);
        }
    });

    // Handle Drag End with Inertia 
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const velocity = info.velocity.x;
        const currentX = x.get();
        const centerOffset = window.innerWidth / 2 - CARD_WIDTH / 2;

        const power = 0.2;
        const estimatedEnd = currentX + velocity * power;

        const rawIndex = (centerOffset - estimatedEnd) / itemFullWidth;
        const targetIndex = Math.round(rawIndex);

        const targetX = centerOffset - (targetIndex * itemFullWidth);

        animate(x, targetX, {
            type: "spring",
            stiffness: 200,
            damping: 30
        });
    };

    // Click to center functionality
    const handleCardClick = (index: number) => {
        const centerOffset = window.innerWidth / 2 - CARD_WIDTH / 2;
        const targetX = centerOffset - (index * itemFullWidth);

        animate(x, targetX, {
            type: "spring",
            stiffness: 200,
            damping: 30
        });
    };

    // Virtualization Logic
    // We only render cards within a buffer range of the centerIndex
    const BUFFER = 5; // Render 5 cards on each side (total ~11 cards)
    const visibleIndices = [];
    for (let i = centerIndex - BUFFER; i <= centerIndex + BUFFER; i++) {
        visibleIndices.push(i);
    }

    // Pagination mapping
    const activeDotIndex = ((centerIndex % totalItems) + totalItems) % totalItems;

    return (
        <div className="w-full relative overflow-hidden pt-0 pb-10 flex flex-col gap-0">
            {/* Carousel Track */}
            <div
                ref={containerRef}
                className="w-full h-[450px] flex items-center relative pt-20"
            >
                <motion.div
                    className="absolute left-0 w-full h-full "
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -5000000, right: 5000000 }} // Huge constraints
                    onDragEnd={handleDragEnd}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {visibleIndices.map((virtualIndex) => {
                        // Map virtual index to actual project data index (circular)
                        const projectIndex = ((virtualIndex % totalItems) + totalItems) % totalItems;
                        const project = projectsWithCta[projectIndex];

                        return (
                            <div
                                key={virtualIndex} // Use virtualIndex as key to ensure stability
                                style={{
                                    position: "absolute",
                                    left: virtualIndex * itemFullWidth,
                                    width: CARD_WIDTH,
                                    // We need to offset the whole track padding if any? 
                                    // The parent motion.div moves everything, so absolute left combined with x works perfect.
                                    // Add the initial gap/padding if the design required it, but strict center logic handles it.
                                    // Original had pl-[11px]. Let's bake that into the centering logic or just ignore if centered.
                                    // The centering math (window / 2) is robust. 
                                }}
                            >
                                <WheelCard
                                    project={project}
                                    isActive={virtualIndex === centerIndex}
                                    isNeighbor={Math.abs(virtualIndex - centerIndex) === 1}
                                    onClick={() => handleCardClick(virtualIndex)}
                                />
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Pagination */}
            <Pagination
                total={totalItems}
                active={activeDotIndex}
            />
        </div>
    );
}

function WheelCard({ project, isActive, isNeighbor, onClick }: { project: Project, isActive: boolean, isNeighbor: boolean, onClick: () => void }) {
    // Styles preserved exactly

    if (project.isDribbble) {
        return (
            <motion.div
                layout // Keep layout for smooth size transitions
                onClick={onClick}
                animate={{
                    height: isActive ? 388 : 343,
                    opacity: isActive ? 1 : 0.7,
                    zIndex: isActive ? 10 : 1,
                    scale: isActive ? 1 : 0.95,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    flex flex-col items-center justify-between p-[20px] bg-[#E3E3E3] rounded-[28px]
                    w-[242px] shrink-0 cursor-pointer overflow-hidden
                    ${isActive ? 'shadow-[-2px_3px_33.5px_rgba(0,0,0,0.15)]' : ''}
                `}
                style={{
                    backgroundColor: "#ea4c89",
                    color: "white"
                }}
            >
                <div className="flex flex-col items-center justify-center flex-1 w-full gap-4 text-center">
                    <FaDribbble className="w-16 h-16 text-white" />
                    <p className="font-poppins font-medium text-[14px] leading-tight text-white px-2">
                        {project.description}
                    </p>
                </div>

                <a
                    href={project.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-white text-[#ea4c89] font-bold rounded-full text-sm hover:bg-gray-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    Check Dribbble
                </a>
            </motion.div>
        );
    }

    // Standard Card
    const image = project.thumbnail_img || project.imageSrc || project.URL || "/images/placeholder.jpg";
    const title = project.title || project.Title || project.name || "Project Title";
    const subtitle = project.excerpt || project.description || "Project Description";

    return (
        <motion.div
            layout // Keep layout for smooth size transitions
            onClick={onClick}
            animate={{
                height: isActive ? 388 : 343,
                opacity: isActive ? 1 : 0.7,
                zIndex: isActive ? 10 : 1,
                scale: isActive ? 1 : 0.95,
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
                <p className="font-poppins font-light text-[9px] text-[#505050] mt-1 line-clamp-2">
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
                // Since this uses modulo logic, neighbor calculation is trickier visually, 
                // but standard simple Neighbor logic works fine for now or we can simplify.
                // Simulating neighbor visually for the circular buffer:
                const isNeighbor = Math.abs(i - active) === 1 || Math.abs(i - active) === (total - 1);

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
