import { ClientConfig } from "@/types/config";

export const DEMPSEY_CONFIG: ClientConfig = {
    businessName: "Dempsey Roofing & Contracting",
    niche: "Roofing",
    phone: "(832) 547-9300",
    email: "info@dempseyroofing.com",
    address: "Serving Houston & Surrounding Areas", // Simplified for header
    city: "Houston",
    state: "TX",
    zip: "77001",
    googlePlaceId: "ChIJZQ7-krMhQYYRVJdrBZi9X5k", // Real Dempsey ID
    themeColor: "#f97316", // Orange from their site
    heroHeadline: "HOUSTON'S TRUSTED ROOFING EXPERTS",
    heroSubheadline: "Insurance-Approved. Storm Damage Specialists. 20+ Years Experience.",
    certifications: ["GAF Certified™ Contractor", "CertainTeed Certified"],
    services: [
        { title: "Roof Replacement", description: "Complete tear-off and installation of high-quality roofing systems." },
        { title: "Roof Repairs", description: "Fixing leaks, missing shingles, and storm damage quickly." },
        { title: "Insurance Claims", description: "We work directly with your insurer to maximize your claim." },
        { title: "Gutter Installation", description: "Seamless gutter systems to protect your foundation." }
    ],

    ctaLink: "/contact"
};

export const ABSOLUTE_CONFIG: ClientConfig = {
    businessName: "Absolute Roofing Solutions",
    niche: "Roofing",
    phone: "(713) 562-2172",
    email: "info@absoluteroofingsolutions.com",
    address: "25723 Glen Loch Dr, Spring, TX 77380",
    city: "Spring",
    state: "TX",
    zip: "77380",
    googlePlaceId: "ChIJK2SnUEVzMYYRF-2QH0DxGjs", // Absolute Roofing Solutions Place ID
    themeColor: "#2563eb", // Blue theme for differentiation
    heroHeadline: "SPRING'S PREMIER ROOFING CONTRACTOR",
    heroSubheadline: "Fair Pricing. Quality Workmanship. Trusted by 32+ Five-Star Reviews.",
    certifications: ["Licensed & Insured", "Storm Damage Specialists"],
    services: [
        { title: "Roof Replacement", description: "Complete roof replacement with premium materials and expert installation." },
        { title: "Roof Repairs", description: "Fast, reliable repairs for leaks, storm damage, and wear." },
        { title: "Storm Damage Assessment", description: "Free inspections and insurance claim assistance for storm damage." },
        { title: "Roofing Inspections", description: "Thorough inspections to identify issues before they become costly." }
    ],
    ctaLink: "/contact"
};
