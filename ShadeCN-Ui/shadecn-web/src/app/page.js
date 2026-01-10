import BlogSection from "@/sections/Blog";
import Footer from "@/sections/Footer";
import HeroSection from "@/sections/Hero";
import PricingSection from "@/sections/Pricing";
import TestimonialSection from "@/sections/Testimonial";



export default function Home() {
  return (
    <main>
      {/* hero section */}
      <HeroSection />

      {/* pricing section */}
      <PricingSection />

      {/* testimonial section */}
      <TestimonialSection />

      {/* Blog Section */}
      <BlogSection />
     
    </main>
  );
}
