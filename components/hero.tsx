"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { QuoteModal } from "@/components/quote-modal";
import { ClientConfig } from "@/types/config";
import { PlaceDetails } from "@/lib/google";
import Link from "next/link";

interface HeroProps {
    config: ClientConfig;
    placeDetails: PlaceDetails;
}

export function Hero({ config, placeDetails }: HeroProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="relative w-full min-h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                {/* Background Image: Prefer Google Maps photo, fallback to Unsplash */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url("${placeDetails.photos && placeDetails.photos.length > 0
                            ? placeDetails.photos[0].url
                            : 'https://images.unsplash.com/photo-1632759995233-41e996020584?q=80&w=2670&auto=format&fit=crop'
                            }")`
                    }}
                />

                <div className="container relative z-20 px-4 py-32 flex flex-col items-center text-center">

                    {/* Social Proof Badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm border border-white/10 mb-8">
                        <span className="flex gap-0.5 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                        </span>
                        <span className="text-white ml-2">
                            {placeDetails.rating} Rating • {placeDetails.user_ratings_total} Reviews
                        </span>
                    </div>

                    {/* Headlines */}
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
                        {config.heroHeadline}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                        {config.heroSubheadline}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <a
                            href={`tel:${config.phone.replace(/\D/g, '')}`}
                            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
                            style={{ backgroundColor: config.themeColor }} // Dynamic Brand Color
                        >
                            CALL FOR FREE INSPECTION
                        </a>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex h-12 items-center justify-center rounded-md bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                        >
                            Get a Free Quote
                        </button>
                    </div>

                    {/* Trust Badges (Mini) */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-400 uppercase tracking-wider">
                        <span>Fully Insured</span>
                        <span>•</span>
                        <span>License #12345</span>
                        <span>•</span>
                        <span>Locally Owned</span>
                    </div>

                </div>
            </section>


            <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
