import { DEMPSEY_CONFIG } from "./mock-data";
import { ClientConfig } from "@/types/config";

export async function getClientConfig(): Promise<ClientConfig> {
    // In the future, this will fetch from a database or JSON file based on the subdomain
    // logic (e.g., header analysis).

    return DEMPSEY_CONFIG;
}
