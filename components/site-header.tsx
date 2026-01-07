import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import { ClientConfig } from "@/types/config";

export function SiteHeader({ config }: { config: ClientConfig }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-20 items-center justify-between">
                {/* Logo / Name */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight uppercase text-primary">
                        {config.businessName}
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="#services" className="hover:text-primary translation-colors">Services</Link>
                    <Link href="#process" className="hover:text-primary translation-colors">Process</Link>
                    <Link href="#reviews" className="hover:text-primary translation-colors">Reviews</Link>
                    <Link href="#contact" className="hover:text-primary translation-colors">Contact</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a
                        href={`tel:${config.phone.replace(/\D/g, '')}`}
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                    >
                        <Phone className="h-4 w-4" />
                        {config.phone}
                    </a>

                    <a
                        href={`tel:${config.phone.replace(/\D/g, '')}`}
                        className="hidden md:inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        FREE INSPECTION
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
