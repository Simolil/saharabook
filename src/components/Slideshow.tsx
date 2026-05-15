import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "/merzouga-sunset.jpg",
    title: "Erg Chebbi Sunset",
    caption: "The golden hour in Merzouga's highest dunes."
  },
  {
    url: "/desert-camp.jpg",
    title: "Luxury Glamping",
    caption: "Boutique tents with every modern comfort."
  },
  {
    url: "/camel-trek.jpg",
    title: "Desert Journeys",
    caption: "Ancient routes through the shifting sands."
  },
  {
    url: "/ait-ben-haddou.jpg",
    title: "Ancient Heritage",
    caption: "The historic Kasbah of Ait Ben Haddou."
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

  React.useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 2, ease: "linear" }
          }}
          className="absolute inset-0"
        >
          <img
            src={images[index].url}
            alt={images[index].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/20" />

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
