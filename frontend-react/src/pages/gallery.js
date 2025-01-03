import React, { useCallback, useState } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ProtectedRoute from "../components/protectedRoute";

const GalleryPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Nature");

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const categories = {
    Nature: [
        {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/bengal-3-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/Untitled-design-2-300x169.jpg",
        width: 4,
        height: 3,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/Untitled-design-3-300x169.jpg",
        width: 1,
        height: 1,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/bengal-1-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/bengal-2-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/bengal-3-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/bengal-4-300x169.jpg",
        width: 3,
        height: 4,
      },
    ],
    Architecture: [
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/Untitled-design-4-300x169.jpg",
        width: 4,
        height: 3,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/Untitled-design-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/bharat-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/madhopur-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/jabal-1-1-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/jabal-1-300x169.jpg",
        width: 3,
        height: 4,
      },
    ],
    Abstract: [
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/aanandvihar-1-300x169.jpg",
        width: 4,
        height: 3,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/niz-1-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/jabal-3-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/jabal-4-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/jabal-5-300x169.jpg",
        width: 3,
        height: 4,
      },
      {
        src: "https://sapphiremedia.co.in/wp-content/uploads/2024/12/jabal-6-300x169.jpg",
        width: 3,
        height: 4,
      },
    ],
  };

  const photos = categories[selectedCategory] || [];

  return (
    <ProtectedRoute>
      {/* Category Tabs */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              backgroundColor: selectedCategory === category ? "#007BFF" : "#f0f0f0",
              color: selectedCategory === category ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <Gallery photos={photos.map((photo, index) => ({...photo, key: `photo-${index}`, }))} onClick={openLightbox} />
 
      {/* Lightbox */}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet || "",
                caption: x.title || "",
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </ProtectedRoute>
  );
};

export default GalleryPage;
