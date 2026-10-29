import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoryCircles } from '@/components/home/CategoryCircles';
import { LatestProducts } from '@/components/home/LatestProducts';
import { BrandSpotlight } from '@/components/home/BrandSpotlight';
import { CuratedRoutines } from '@/components/home/CuratedRoutines';
import { TrustFeatures } from '@/components/home/TrustFeatures';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Large Hero Carousel */}
      <HeroCarousel />

      {/* 2. Shop by Category Circular Navigation (matches reference mockup) */}
      <CategoryCircles />

      {/* 3. Latest Products Grid with Variations & Add to Cart / Buy Now buttons */}
      <LatestProducts />

      {/* 4. Curated Korean Routines */}
      <CuratedRoutines />

      {/* 5. Featured Korean Brands */}
      <BrandSpotlight />

      {/* 6. Trust Information & Bangladesh Delivery Assurance */}
      <TrustFeatures />
    </div>
  );
}
