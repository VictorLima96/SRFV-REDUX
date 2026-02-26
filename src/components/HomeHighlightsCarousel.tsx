'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type HighlightItem = {
  img: string;
  title: string;
  desc?: string;
  href: string;
};

interface HomeHighlightsCarouselProps {
  items: HighlightItem[];
  maxItems?: number;
  intervalMs?: number;
}

function getWindow(items: HighlightItem[], start: number, size: number) {
  const result: HighlightItem[] = [];
  for (let index = 0; index < size; index += 1) {
    result.push(items[(start + index) % items.length]);
  }
  return result;
}

export default function HomeHighlightsCarousel({
  items,
  maxItems = 4,
  intervalMs = 5000,
}: HomeHighlightsCarouselProps) {
  const limitedItems = useMemo(() => items.slice(0, maxItems), [items, maxItems]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (limitedItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % limitedItems.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [limitedItems.length, intervalMs]);

  if (limitedItems.length === 0) return null;

  const visible = getWindow(limitedItems, currentIndex, Math.min(4, limitedItems.length));

  return (
    <section className="section-box">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Destaques <span className="heading-em">Rotativos</span></h2>
        <div className="gradient-line mt-2 w-20" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {visible.map((item, index) => (
          <Link key={`${item.title}-${index}`} href={item.href} className="card-srfv group overflow-hidden">
            <div className="relative overflow-hidden rounded-srfv-xs">
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                height={200}
                className="w-full h-32 lg:h-36 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-semibold group-hover:text-srfv-primary transition-colors line-clamp-1">{item.title}</p>
              {item.desc ? <p className="text-[11px] text-srfv-text-muted line-clamp-1">{item.desc}</p> : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
