import { ClientConfig } from "@/types/config";
import { Phone, Mail, MapPin } from "lucide-react";

interface SiteFooterProps {
    config: ClientConfig;
}

export function SiteFooter({ config }: SiteFooterProps) {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{config.businessName}</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Professional {config.niche} services in {config.city}, {config.state}.
                            Licensed, insured, and trusted by homeowners.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <a
                                href={`tel:${config.phone}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                {config.phone}
                            </a>
                            <a
                                href={`mailto:${config.email}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                {config.email}
                            </a>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{config.city}, {config.state}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <a href="#services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                Services
                            </a>
                            <a href="#certifications" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                Certifications
                            </a>
                            <a href="#reviews" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                Reviews
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} {config.businessName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
