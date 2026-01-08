"use client";

import { PlaceDetails } from "@/lib/google";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { ClientConfig } from "@/types/config";
import { useState, useRef } from "react";

interface ReviewsProps {
    config: ClientConfig;
    placeDetails: PlaceDetails;
}

export function Reviews({ config, placeDetails }: ReviewsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // Display up to 9 reviews
    const reviews = placeDetails.reviews.slice(0, 9);
    const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth; // Scroll one full view width
            const newScrollLeft = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const toggleExpand = (index: number) => {
        const newExpanded = new Set(expandedReviews);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedReviews(newExpanded);
    };

    const truncateText = (text: string, lines: number = 4) => {
        const words = text.split(' ');
        const approxWordsPerLine = 12;
        const maxWords = lines * approxWordsPerLine;

        if (words.length <= maxWords) {
            return { text, isTruncated: false };
        }

        return {
            text: words.slice(0, maxWords).join(' ') + '...',
            isTruncated: true
        };
    };

    return (
        <section id="reviews" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Neighbors Say</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We are proud to serve the {config.city} community. Here is what genuine homeowners have to say about our work.
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
                        <div className="flex text-yellow-500">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <span className="font-bold text-lg">{placeDetails.rating}</span>
                        <span className="text-muted-foreground">based on {placeDetails.user_ratings_total} Google Reviews</span>
                    </div>
                </div>

                <div className="relative group px-4 md:px-0">
                    {/* Navigation Buttons - Visible on all screens, positioned on edges */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 disabled:opacity-50"
                        aria-label="Previous reviews"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        aria-label="Next reviews"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Scrollable Grid */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {reviews.map((review, i) => {
                            const isExpanded = expandedReviews.has(i);
                            const { text, isTruncated } = truncateText(review.text);
                            const displayText = isExpanded ? review.text : text;

                            return (
                                <div
                                    key={i}
                                    className="snap-center shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col"
                                >
                                    <div className="h-full flex flex-col p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                {review.profile_photo_url ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={review.profile_photo_url} alt={review.author_name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <User className="w-5 h-5 text-primary" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">{review.author_name}</h3>
                                                <div className="flex text-yellow-500 gap-0.5">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-sm leading-relaxed mb-2 flex-1">
                                            &ldquo;{displayText}&rdquo;
                                        </p>

                                        {isTruncated && (
                                            <button
                                                onClick={() => toggleExpand(i)}
                                                className="text-primary text-sm font-medium hover:underline self-start mb-4"
                                            >
                                                {isExpanded ? 'Show less' : 'Read more'}
                                            </button>
                                        )}

                                        <div className="text-xs text-muted-foreground mt-auto pt-4 border-t">
                                            Posted on Google
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a
                        href={`https://search.google.com/local/reviews?placeid=${config.googlePlaceId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        Read All {placeDetails.user_ratings_total} Reviews on Google
                    </a>
                </div>
            </div>
        </section>
    );
}
