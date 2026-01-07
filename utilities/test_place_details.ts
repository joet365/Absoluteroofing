import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

const API_KEY = "AIzaSyBUMvx22VIpZpG5Qv-YBIcvwoAT_FgK-t0";
const BASE_URL = "https://places.googleapis.com/v1";
const PLACE_ID = "ChIJZQ7-krMhQYYRVJdrBZi9X5k"; // Dempsey

async function testGetPlaceDetails() {
    console.log(`Testing API with Key: ${API_KEY.slice(0, 5)}...`);

    // CORRECT FIELD MASK: No "places." prefix for Get Place Details (v1)
    const fields = [
        "rating",
        "userRatingCount",
        "reviews",
        "photos"
    ].join(",");

    const url = `${BASE_URL}/places/${PLACE_ID}`;
    console.log(`URL: ${url}`);
    console.log(`FieldMask: ${fields}`);

    try {
        const response = await axios.get(url, {
            params: {
                key: API_KEY,
                languageCode: "en"
            },
            headers: {
                "X-Goog-FieldMask": fields
            }
        });

        console.log("Success!");
        console.log("Rating:", response.data.rating);
        console.log("Reviews:", response.data.reviews?.length);
        console.log("Photos:", response.data.photos?.length);
        if (response.data.photos?.length > 0) {
            console.log("First Photo Name:", response.data.photos[0].name);
        }

    } catch (e: any) {
        console.error("Error Status:", e.response?.status);
        console.error("Error Message:", e.response?.data?.error?.message);
        if (e.response?.data?.error?.details) {
            console.error("Full Details:", JSON.stringify(e.response.data.error.details, null, 2));
        }
    }
}

testGetPlaceDetails();
