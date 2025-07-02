import Banner from "@/components/shared/Banner"
import AboutSection from "@/components/user/About/AboutSection";
import InnovatureSection from "@/components/user/Home/Innovature";
import Achievement from "@/components/user/About/Achievement";
import TestimonialSection from "@/components/user/Home/Testimonial";
import aboutbanner from "../../../../public/assets/images/aboutbanner.png";
import aboutbannermob from "../../../../public/assets/images/aboutbannermob.png";

export default function About() {
  return (
    <div>
    <Banner  heading="about" banner={aboutbanner} bannermob={aboutbannermob} title="Smart. Sustainable.<br/> Solutions." />
    <AboutSection />
    <InnovatureSection/>
    <Achievement/>
    <TestimonialSection/>
    
    </div>
  );
}