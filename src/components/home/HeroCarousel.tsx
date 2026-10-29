'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { SAMPLE_HOMEPAGE_SLIDES } from '@/lib/data/sampleData';

export function HeroCarousel() {
  const slides = SAMPLE_HOMEPAGE_SLIDES;
  const [current, setCurrent] = useState(0);

  // Auto advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] overflow-hidden bg-seoulea-ivory border-b border-seoulea-blush-soft">
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with warm overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-seoulea-ivory via-seoulea-ivory/80 to-transparent sm:w-3/4 md:w-2/3" />
            </div>

            {/* Slide Content */}
            <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-12 flex items-center">
              <div className="max-w-xl space-y-4">
                {slide.tagline && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-seoulea-blush/30 border border-seoulea-gold/30 text-seoulea-berry text-xs font-bold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-seoulea-gold" />
                    <span>{slide.tagline}</span>
                  </div>
                )}

                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-seoulea-cocoa tracking-tight leading-[1.15]">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base text-seoulea-cocoa/80 leading-relaxed font-normal">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={slide.button_url}
                    className="inline-flex items-center gap-2 bg-seoulea-gold hover:bg-seoulea-gold-dark text-seoulea-cocoa-dark px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <span>{slide.button_text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 bg-white/80 hover:bg-white text-seoulea-cocoa px-5 py-3 rounded-full font-semibold text-xs border border-seoulea-blush transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-seoulea-cocoa flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-seoulea-cocoa flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? 'w-8 bg-seoulea-berry'
                : 'w-2 bg-seoulea-cocoa/30 hover:bg-seoulea-cocoa/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
