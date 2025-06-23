import FeaturedProducts from "@/component/FeaturedProducts";
import Header from "@/component/HeaderAllFile/Header";
import CategoryShowcase from "@/component/HeroSection/CategoryShowcase";
import HeroSection from "@/component/HeroSection/Hero";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
    </div>
  );
}
