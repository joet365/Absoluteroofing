"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { ClientConfig } from "@/types/config";

interface MobileCallBarProps {
    config: ClientConfig;
}

export function MobileCallBar({ config }: MobileCallBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Prevent hydration mismatch by only rendering after mount
        setIsMounted(true);

        const handleScroll = () => {
            // Show the bar after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Don't render anything on server to prevent hydration mismatch
    if (!isMounted) {
        return null;
    }

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"
                }`}
        >
            <a
                href={`tel:${config.phone}`}
                className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-4 shadow-lg hover:bg-primary/90 transition-colors"
            >
                <Phone className="w-5 h-5 animate-pulse" />
                <span className="font-semibold text-lg">Call Now: {config.phone}</span>
            </a>
        </div>
    );
}
