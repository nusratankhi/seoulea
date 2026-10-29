'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

interface AnnouncementBarProps {
  text?: string;
  enabled?: boolean;
}

export function AnnouncementBar({
  text = DEFAULT_STORE_SETTINGS.announcement_bar_text,
  enabled = DEFAULT_STORE_SETTINGS.announcement_bar_enabled,
}: AnnouncementBarProps) {
  if (!enabled) return null;

  return (
    <div className="bg-seoulea-berry text-white text-xs md:text-sm py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 mr-2 text-seoulea-gold flex-shrink-0 animate-pulse" />
        <span>{text}</span>
        <Link
          href="/shop"
          className="ml-3 underline decoration-seoulea-gold underline-offset-2 hover:text-seoulea-gold transition-colors font-semibold hidden sm:inline"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
