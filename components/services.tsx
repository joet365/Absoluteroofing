import { ClientConfig } from "@/types/config";
import { Hammer, Home, Umbrella, Shield } from "lucide-react";

interface ServicesProps {
    config: ClientConfig;
}

export function Services({ config }: ServicesProps) {
    if (!config.services || config.services.length === 0) {
        return null;
    }

    // Simple icon mapping fallback
    const getIcon = (index: number) => {
        const icons = [Home, Hammer, Shield, Umbrella];
        const IconComponent = icons[index % icons.length];
        return <IconComponent className="w-8 h-8 mb-4" style={{ color: config.themeColor }} />;
    };

    return (
        <section id="services" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                        Our Expertise
                    </h2>
                    <p className="text-lg text-slate-600">
                        Professional roofing services tailored to {config.city} homeowners.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {config.services.map((service, i) => (
                        <div
                            key={i}
                            className="p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="mb-4 p-3 rounded-lg bg-slate-100 inline-block group-hover:bg-slate-200 transition-colors">
                                {getIcon(i)}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
