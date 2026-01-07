export interface ClientConfig {
  businessName: string;
  niche: string; // e.g., "Roofing", "HVAC"
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  googlePlaceId: string;

  // Design config
  themeColor: string; // Hex code

  // Content Overrides (Optional - otherwise fetched from Google)
  heroHeadline?: string;
  heroSubheadline?: string;

  // Custom Data
  certifications?: string[]; // e.g. ["GAF Certified", "BBB Accredited"]
  services?: Array<{ title: string; description: string; icon?: string }>;

  // URLs
  ctaLink?: string; // e.g., calendar link
}
