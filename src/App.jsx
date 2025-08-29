import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const images = [
    { src: "https://picsum.photos/id/1015/900/600", alt: "Snowy mountains" },
    { src: "https://picsum.photos/id/1025/900/600", alt: "Cute dog" },
    { src: "https://picsum.photos/id/1035/900/600", alt: "Dense forest" },
    { src: "https://picsum.photos/id/1045/900/600", alt: "Bridge over water" },
    { src: "https://picsum.photos/id/1055/900/600", alt: "Sunny beach" },
  ];

  // State: which image is displayed + dark overlay toggle
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [lightbox, setLightbox] = useState(false);


  const current = images[currentIndex];

  useEffect(() => {
  const handleKey = (e) => {
    if (e.key === "ArrowRight") {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (e.key === "ArrowLeft") {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (e.key === "Escape") {
      setLightbox(false);
    }
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [images.length]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Image Gallery</h1>

      {/* Main image area */}
      <div className="relative w-[720px] max-w-full rounded-xl overflow-hidden shadow-lg">
        <img
          className="w-full h-[420px] object-cover block"
          src={current.src}
          alt={current.alt}
          onClick={() => {
          setLightbox(true);
          }}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${
            isDark ? "bg-black/50" : "bg-transparent"
          }`}
          aria-hidden="true"
        />

        {/* Toggle button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white px-3 py-1 rounded-lg text-sm shadow"
        >
          {isDark ? "Lighten" : "Darken"}
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {images.map((img, idx) => {
          const active = idx === currentIndex;
          return (
            <button
              key={img.src}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-md overflow-hidden border-2 transition 
                ${active ? "border-blue-600" : "border-transparent hover:border-gray-300"}`}
              aria-label={`Show: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-28 h-20 object-cover block"
              />
            </button>
          );
        })}
      </div>
        {lightbox && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-400"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default App
