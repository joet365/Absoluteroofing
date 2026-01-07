"use client";

import { PlaceDetails } from "@/lib/google";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { ClientConfig } from "@/types/config";
import { useState } from "react";

interface ReviewsProps {
    config: ClientConfig;
    placeDetails: PlaceDetails;
}

export function Reviews({ config, placeDetails }: ReviewsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

    const reviews = placeDetails.reviews.slice(0, 6);
    const reviewsPerPage = 3;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const currentReviews = reviews.slice(
        currentIndex * reviewsPerPage,
        (currentIndex + 1) * reviewsPerPage
    );

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
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

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    {totalPages > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
                                aria-label="Previous reviews"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
                                aria-label="Next reviews"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentReviews.map((review, i) => {
                            const globalIndex = currentIndex * reviewsPerPage + i;
                            const isExpanded = expandedReviews.has(globalIndex);
                            const { text, isTruncated } = truncateText(review.text);
                            const displayText = isExpanded ? review.text : text;

                            return (
                                <div key={globalIndex} className="flex flex-col p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
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
                                            onClick={() => toggleExpand(globalIndex)}
                                            className="text-primary text-sm font-medium hover:underline self-start mb-4"
                                        >
                                            {isExpanded ? 'Show less' : 'Read more'}
                                        </button>
                                    )}

                                    <div className="text-xs text-muted-foreground mt-auto pt-4 border-t">
                                        Posted on Google
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Dots */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                                        }`}
                                    aria-label={`Go to page ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
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
