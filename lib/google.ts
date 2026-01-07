import axios from "axios";

// Interface matches our component needs
export interface PlaceDetails {
    rating: number;
    user_ratings_total: number;
    reviews: Array<{
        author_name: string;
        rating: number;
        text: string;
        time: string; // v1 returns ISO string or similar
        profile_photo_url: string;
    }>;
    photos: Array<{
        url: string; // Pre-constructed URL for the frontend
        authorAttribution?: string;
    }>;
}

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const BASE_URL = "https://places.googleapis.com/v1";

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    console.log(`[Google API] Fetching details for: ${placeId}`);

    if (!API_KEY) {
        console.warn("[Google API] No API Key found. Returning mock data.");
        return getMockData();
    }

    try {
        // Field Mask: specific fields we need using the v1 field names
        // https://developers.google.com/maps/documentation/places/web-service/place-details#fields
        const fields = [
            "rating",
            "userRatingCount",
            "reviews",
            "photos"
        ].join(",");

        // For v1, placeId is part of the URL resource name: places/{placeId}
        const url = `${BASE_URL}/places/${placeId}`;

        const response = await axios.get(url, {
            params: {
                key: API_KEY,
                languageCode: "en"
            },
            headers: {
                "X-Goog-FieldMask": fields
            }
        });

        const place = response.data;

        // Transform v1 reviews
        const reviews = (place.reviews || []).map((r: any) => ({
            author_name: r.authorAttribution?.displayName || "Google User",
            rating: r.rating || 5,
            text: r.originalText?.text || r.text?.text || "",
            time: r.publishTime || new Date().toISOString(),
            profile_photo_url: r.authorAttribution?.photoUri || ""
        }));

        // Transform v1 photos into usable URLs
        // https://places.googleapis.com/v1/{name}/media?maxHeightPx=...&maxWidthPx=...&key=...
        const photos = (place.photos || []).map((p: any) => ({
            url: `${BASE_URL}/${p.name}/media?key=${API_KEY}&maxWidthPx=1600`, // High res for Hero
            authorAttribution: p.authorAttributions?.[0]?.displayName
        }));

        return {
            rating: place.rating || 0,
            user_ratings_total: place.userRatingCount || 0,
            reviews: reviews,
            photos: photos
        };

    } catch (e: any) {
        console.error("[Google API] Error fetching details:", e.response ? e.response.data : e.message);
        // Fallback to mock data if API fails so the build doesn't crash
        return getMockData();
    }
}

function getMockData(): PlaceDetails {
    console.log("[Google API] Using Mock Data Source.");
    return {
        rating: 4.9,
        user_ratings_total: 16,
        reviews: [
            {
                author_name: "Sarah Jenkins (Mock)",
                rating: 5,
                text: "Dempsey Roofing did an amazing job! They handled the insurance claim perfectly.",
                time: new Date().toISOString(),
                profile_photo_url: ""
            },
            {
                author_name: "Mike Ross (Mock)",
                rating: 5,
                text: "Professional, on time, and the roof looks great. Highly recommend.",
                time: new Date().toISOString(),
                profile_photo_url: ""
            }
        ],
        photos: []
    };
}
