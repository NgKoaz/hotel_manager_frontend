import { useState, useEffect } from "react";

type Image = { imageUrl: string };

interface RoomGalleryProps {
  images: Image[];
}

const RoomGallery = ({ images }: RoomGalleryProps) => {
  // Carousel card
  const [cardIndex, setCardIndex] = useState<number>(0);

  // Modal fullscreen
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Auto carousel fade trên card
  useEffect(() => {
    const interval = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 giây / slide
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <img src="/fallback.jpg" alt="Room" className="w-full h-48 object-cover rounded" />;
  }

  return (
    <div className="relative w-full h-48 overflow-hidden rounded">
      {/* Carousel fade trên card */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.imageUrl}
          alt={`Room ${idx}`}
          className={`
            absolute top-0 left-0 w-full h-48 object-cover transition-opacity duration-500
            ${idx === cardIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
            cursor-pointer
          `}
          onClick={() => {
            setModalIndex(idx); // mở modal từ ảnh đang click
            setIsOpen(true);
          }}
        />
      ))}

      {/* Modal fullscreen */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4">
          {/* Nút đóng modal */}
          <button
            className="absolute top-4 right-4 text-white text-3xl z-50 p-2 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>

          <div className="relative flex items-center justify-center w-full flex-1">
            <button
              className="absolute left-0 text-white text-3xl z-40"
              onClick={() =>
                setModalIndex((modalIndex + images.length - 1) % images.length)
              }
            >
              ‹
            </button>

            <img
              src={images[modalIndex].imageUrl}
              alt={`Room ${modalIndex}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded"
            />

            <button
              className="absolute right-0 text-white text-3xl z-40"
              onClick={() =>
                setModalIndex((modalIndex + 1) % images.length)
              }
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto mt-4 max-w-full">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={`Thumb ${idx}`}
                className={`w-20 h-14 object-cover rounded cursor-pointer border-2 ${
                  idx === modalIndex ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setModalIndex(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomGallery;
