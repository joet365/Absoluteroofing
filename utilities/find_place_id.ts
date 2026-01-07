import axios from "axios";
import * as dotenv from "dotenv";

// Load env from parent directory
dotenv.config({ path: "../.env" });

async function findPlaceId(query: string) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        console.error("Error: GOOGLE_MAPS_API_KEY not found in .env");
        process.exit(1);
    }

    // New Places API Endpoint
    const url = "https://places.googleapis.com/v1/places:searchText";

    console.log(`Searching for: "${query}"...`);

    try {
        const response = await axios.post(
            url,
            {
                textQuery: query,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "*", // Requesting ALL fields
                },
            }
        );

        const places = response.data.places || [];
        console.log(`Places Found: ${places.length}`);

        if (places.length > 0) {
            const place = places[0];
            console.log(`Found Name: ${place.displayName?.text}`);
            console.log(`Address: ${place.formattedAddress}`);
            console.log(`Place ID: ${place.id}`);
        } else {
            console.log("No results found.");
        }

    } catch (e: any) {
        console.error("API Error Full:", e.response ? JSON.stringify(e.response.data, null, 2) : e.message);
    }
}

findPlaceId("Dempsey Roofing & Contracting Houston");
