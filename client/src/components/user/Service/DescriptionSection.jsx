import React from 'react'

function DescriptionSection({ heading,description }) {
  return (
    <section className="relative bg-[#0D0D0D]  text-white  h-auto md:pt-20 pt-20 pb-10 md:pb-20 px-4">
         <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:gap-7 gap-7 w-full">
            {/* Enhanced Header Section */}
            <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="flex-1 max-w-4xl">
                <div className="md:mb-3 mb-2">
                    <h1 className="text-4xl md:text-5xl font-normal md:mb-2 capitalize bg-gradient-to-r from-white via-white to-orange-300 bg-clip-text text-transparent leading-tight">
                    {heading}
                    </h1>
                     <div className="w-50 h-1 bg-white " /> 
                </div>
                </div>
            </div>
            </div>

            {/* Enhanced Description */}
            <div className="max-w-5xl">
            <div 
                className="text-lg md:text-xl leading-relaxed text-white/80 font-light prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: description || '' }}
            />
            </div>

            
        </div>
      
    </section>
  )
}

export default DescriptionSection
