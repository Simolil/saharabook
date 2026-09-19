import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "/images/slideshow/slide-1.jpg",
    title: "Sahara Desert",
    caption: "The golden hour in Merzouga's highest dunes."
  },
  {
    url: "/images/slideshow/slide-2.jpg",
    title: "Sahara Night",
    caption: "Experience the magic of the desert under the stars."
  },
  {
    url: "/images/slideshow/slide-3.jpg",
    title: "Agafay Stone Desert",
    caption: "A boutique escape just minutes from Marrakech."
  },
  {
    url: "/images/slideshow/slide-4.jpg",
    title: "Erg Chigaga Wilds",
    caption: "Untamed dunes and infinite open horizons."
  },
  {
    url: "/images/slideshow/slide-5.jpg",
    title: "Sunset Caravan",
    caption: "Traditional camel trekking across sweeping desert ridges."
  },
  {
    url: "/images/slideshow/slide-6.jpg",
    title: "Luxury Nomad Camps",
    caption: "Hand-woven Berber craft with modern en-suite comfort."
  },
  {
    url: "/images/slideshow/slide-7.jpg",
    title: "Desert Campfire",
    caption: "Acoustic Gnawa drumming under the Milky Way."
  },
  {
    url: "/images/slideshow/slide-8.jpg",
    title: "Kasbah Gateway",
    caption: "Ancient earthen architecture at the desert's threshold."
  }
];

export default function Slideshow({ className = "" }: { className?: string }) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Preload all slideshow images into browser memory to eliminate transition lag
  React.useEffect(() => {
    images.forEach((img) => {
      const preload = new Image();
      preload.src = img.url;
    });
  }, []);

  React.useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    }
  };

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" }
          }}
          style={{ willChange: "opacity" }}
          className="absolute inset-0"
        >
          <img
            src={images[index].url}
            alt={images[index].title}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay to balance bright daylight photos */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Controls - subtle in background mode */}
      <div className="absolute bottom-10 right-10 z-10 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === index ? "w-10 bg-[#BA7517]" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
