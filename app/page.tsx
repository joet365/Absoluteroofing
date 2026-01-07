import { Hero } from "@/components/hero";
import { Certifications } from "@/components/certifications";
import { Services } from "@/components/services";
import { Reviews } from "@/components/reviews";
import { ABSOLUTE_CONFIG } from "@/lib/mock-data";
import { getPlaceDetails } from "@/lib/google";

export default async function AbsolutePage() {
    const config = ABSOLUTE_CONFIG;
    const placeDetails = await getPlaceDetails(config.googlePlaceId);

    return (
        <div className="flex flex-col">
            <Hero config={config} placeDetails={placeDetails} />

            {/* Trust Layer 1: Certifications */}
            <Certifications config={config} />

            {/* Functional Layer: Services */}
            <Services config={config} />

            {/* Trust Layer 2: Reviews */}
            <Reviews config={config} placeDetails={placeDetails} />

        </div>
    );
}
