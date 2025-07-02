"use client"
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Services = ({ serviceDetail , serviceId }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const router = useRouter();

    const PlusMinusIndicator = ({ isOpen, subserviceid, serviceId }) => {
        // Check if IDs exist before rendering the Link
        if (!serviceId || !subserviceid) {
            return (
            <div className="w-50 h-10 flex items-center justify-center bg-orang text-white rounded-sm">
              Read More  {isOpen ? <ArrowRight /> : <ChevronDown />}
            </div>
            );
        }

        return (
            <Link href={`/service/${serviceId}/${subserviceid}`}> {/* Use `href` instead of `to` */}
            <div className="w-30 h-10 flex gap-1 items-center justify-center bg-orang text-white rounded-sm cursor-pointer">
                Read More {isOpen ? <ArrowRight /> : <ChevronDown />}
            </div>
            </Link>
        );
    };

    if (!serviceDetail || serviceDetail.length === 0) {
        return (
            <div className="bg-[#0D0D0D] text-white py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl mb-6">Our services</h2>
                    <p className="text-gray-400">No service details available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0D0D0D] text-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl mb-6">Our services</h2>
                <div className="space-y-4 ">
                    {serviceDetail.map((service, index) => (
                        <div key={service._id}>
                                <div className={`border rounded-lg border-gray-800 ${index === 0 ? 'border-t' : ''}`}
                                  onClick={() => router.push(`/service/${serviceId}/${service._id}`)}
                                  >
                                    <div
                                        className="w-full flex items-center justify-between py-6 px-4 relative hover:bg-gray-800/50 transition-colors"
                                    >
                                        <p className="md:max-w-xl max-w-xs md:pr-0 pr-28 text-xl text-left text-gray-200 capitalize">
                                            {service.heading}
                                        </p>
                                        <div className="absolute right-4 top-10 -translate-y-1/2">
                                            <PlusMinusIndicator isOpen={false} serviceId={serviceId} subserviceid={service._id} />
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;