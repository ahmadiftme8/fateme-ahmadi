"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ScrollContextType = {
    isSticky: boolean;
    setIsSticky: (value: boolean) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
    const [isSticky, setIsSticky] = useState(false);

    return (
        <ScrollContext.Provider value={{ isSticky, setIsSticky }}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScrollContext() {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScrollContext must be used within a ScrollProvider");
    }
    return context;
}
