import { ClientConfig } from "@/types/config";
import { ShieldCheck } from "lucide-react";

interface CertificationsProps {
    config: ClientConfig;
}

export function Certifications({ config }: CertificationsProps) {
    if (!config.certifications || config.certifications.length === 0) {
        return null;
    }

    return (
        <section className="border-y bg-muted/30">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                        Our Accreditations & Partners:
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {config.certifications.map((cert) => (
                            <div key={cert} className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border shadow-sm">
                                <ShieldCheck className="h-5 w-5" style={{ color: config.themeColor }} />
                                <span className="font-semibold text-foreground/80">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
