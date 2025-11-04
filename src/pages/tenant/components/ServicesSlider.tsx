import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  duration: number;
  images?: string[];
}

interface ServicesSliderProps {
  services: Service[];
}

export default function ServicesSlider({ services }: ServicesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (services.length === 0) {
    return null;
  }

  // Show 3 cards on desktop, 2 on tablet, 1 on mobile
  const visibleCards = 3;
  const maxIndex = Math.max(0, services.length - visibleCards);

  return (
    <div className="relative px-12">
      {/* Navigation Buttons */}
      {services.length > visibleCards && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      {/* Cards Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="shrink-0 w-full md:w-1/2 lg:w-1/3"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
                {/* Service Image */}
                {service.images && service.images.length > 0 ? (
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img
                      src={service.images[0]}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {service.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Service Details */}
                <div className="p-6 grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>

                  {service.description && (
                    <p className="text-gray-600 mb-4 grow line-clamp-3">
                      {service.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration} min</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {service.price} {service.currency}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {services.length > visibleCards && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
