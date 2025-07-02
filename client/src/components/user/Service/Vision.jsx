

function VisionSection() {
    return (
        <div className=" bg-[#0D0D0D] text-white py-16 px-4 my-10 flex items-center justify-center h-auto relative ">
          <span className="absolute top-10 left-[2%] w-[95%] h-full border-t-1  border-gray-700"></span>
          <span className="absolute top-[2%] left-[5%] w-[95%] h-full border-l-1  border-gray-700"></span>
          <span className="absolute bottom-10 right-[2%] w-[95%] h-full border-b-1  border-gray-700"></span>
          <span className="absolute bottom-[2%] right-[5%] w-[95%] h-full border-r-1  border-gray-700"></span>


        <div className="max-w-3xl mx-auto text-center py-10">
          <h2 className="text-4xl mb-10 font-light">
            who <span className="text-orang font-normal">we are</span>
          </h2>
          <p className="text-lg leading-relaxed font-light">
            ENCIMEX is a holistic Architectural, Engineering and Design company. <br/> 
            We are equipped with all the necessary ingredients to handle the
             engineering <br/> sophistications of today’s world.
          </p>
        </div>
      </div>
    )
}

export default VisionSection;