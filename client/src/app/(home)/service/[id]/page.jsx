"use client";
import { getGalleryImages, getServiceDetails } from "@/app/actions/actions";
import Banner from "@/components/user/Service/Banner";
import ProjectSection from "@/components/user/Service/Projects";
import Services from "@/components/user/Service/Services";
import { use, useEffect, useState } from "react";
import { FileText, X, Download, ZoomIn, ZoomOut } from "lucide-react";
import servicebanner from "../../../../../public/assets/images/servicebanner.png";



export default function Service({ params }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const serviceId = use(params).id;
  console.log("Service ID:", serviceId);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const result = await getServiceDetails(serviceId);
        if (result.success) {
          const parsedService = JSON.parse(result.service);
          setService(parsedService);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGalleryImages = async () => {
      const result = await getGalleryImages(serviceId);
      if (result.success) {
        const parsedGalleryImages = JSON.parse(result.galleryImages);
        setGalleryImages(parsedGalleryImages);
      }
    };

    fetchServiceDetails();
    fetchGalleryImages();
  }, [serviceId]);

  const Pdfs = [
    {
      Title: "Curtain Wall Job",
      url: "/assets/pdf/CurtainwallJob.pdf",
      description: "Complete curtain wall job documentation"
    },
    {
      Title: "Curtain Wall Fabrication Drawings",
      url: "/assets/pdf/CurtainwallFabricationDrawings.pdf",
      description: "Detailed fabrication drawings for curtain wall systems"
    },
    {
      Title: "Fabrication",
      url: "/assets/pdf/Fabrication.pdf",
      description: "General fabrication guidelines and specifications"
    },
    {
      Title: "Curtain Wall Shop Drawings",
      url: "/assets/pdf/CurtainwallShopDrawings.pdf",
      description: "Shop drawings for curtain wall installation"
    }
  ];

  const handlePdfClick = (pdf, index) => {
    setSelectedPdf(pdf);
    setPdfModalOpen(true);
  };

  const handleDownload = (pdf) => {
    const link = document.createElement('a');
    link.href = pdf.url;
    link.download = `${pdf.Title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closePdfModal = () => {
    setPdfModalOpen(false);
    setSelectedPdf(null);
  };

  console.log(galleryImages);

  if (loading) {
    return (
       <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-[#F15A2B]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-[#F15A2B] rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-2 border-transparent border-t-white rounded-full animate-spin animation-delay-150"></div>
            </div>
            <div className="text-white/60 text-lg font-light">Loading Service...</div>
          </div>
        </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-white text-xl">Service not found</div>
      </div>
    );
  }

  return (
    <section>
      <Banner 
        heading="service" 
        banner={service.main_photo} 
        title={service.title} 
      />
      
      <ProjectSection
        photos={galleryImages}
      />
      
       {/* PDF Section - only if the url slug is /facade-detailing */}
      {serviceId === "facade-detailing" && (
      <section className="relative bg-[#0D0D0D] text-white pt-5 md:pb-12 pb-4 px-4">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 w-full">
          {/* Title and description */}
          <div className="w-full flex justify-between pb-4"> 
            <div className="w-[60%]">
              <h2 className="text-4xl mb-2">Facade Sample</h2>
              <div className="w-50 h-1 bg-white" />
            </div>
          </div>

          <div className="md:max-w-7xl max-w-5xl w-full relative mx-auto md:px-0 px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Pdfs.map((pdf, index) => (
                <div key={index} className="flex flex-col">
                  <div
                    className="relative flex flex-col items-center justify-center min-h-[270px] min-w-[230px] group hover:bg-[#F15A2B]/30 cursor-pointer transition-all duration-300 border-2 border-gray-700 hover:border-[#F15A2B] rounded-lg"
                    onClick={() => handlePdfClick(pdf, index)}
                  >
                    {/* PDF Icon */}
                    <div className="flex flex-col items-center gap-4">
                      <FileText 
                        size={80} 
                        className="text-[#F15A2B] group-hover:text-white transition-colors duration-300" 
                      />
                      <div className="text-center px-4">
                        <h3 className="text-white text-lg font-medium mb-2">{pdf.Title}</h3>
                        <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">
                          {pdf.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#F15A2B]/0 group-hover:bg-[#F15A2B]/10 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      {/* <span className="text-white font-medium">Click to View</span> */}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePdfClick(pdf, index);
                      }}
                      className="flex-1 bg-[#F15A2B] hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors duration-300"
                    >
                      View PDF
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(pdf);
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-300"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}


      <Services 
        serviceDetail={service.service_detail} 
        serviceId={serviceId}
      />

      {/* PDF Modal */}
      {pdfModalOpen && selectedPdf && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
              <h3 className="text-xl font-semibold">{selectedPdf.Title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(selectedPdf)}
                  className="p-2 hover:bg-gray-700 rounded transition-colors duration-300"
                  title="Download PDF"
                >
                  <Download size={20} />
                </button>
                <button
                  onClick={closePdfModal}
                  className="p-2 hover:bg-gray-700 rounded transition-colors duration-300"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* PDF Viewer */}
            <div className="w-full h-full">
              <iframe
                src={`${selectedPdf.url}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full border-none"
                title={selectedPdf.Title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}