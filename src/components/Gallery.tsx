import { useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

import awardCeremony from "@/assets/gallery/award-ceremony.jpeg";
import buildingRender1 from "@/assets/gallery/building-render-1.jpeg";
import keyHandover from "@/assets/gallery/key-handover.jpeg";
import swamikrupaHeights from "@/assets/gallery/swamikrupa-heights.jpeg";

const galleryItems = [
  {
    id: 1,
    type: "image" as const,
    src: swamikrupaHeights,
    title: "Swamikrupa Heights",
    description: "Modern residential complex",
  },
  {
    id: 2,
    type: "image" as const,
    src: buildingRender1,
    title: "Commercial Complex",
    description: "Mixed-use development",
  },
  {
    id: 3,
    type: "video" as const,
    src: "/videos/project-walkthrough.mp4",
    thumbnail: swamikrupaHeights,
    title: "Project Walkthrough",
    description: "Virtual tour of our projects",
  },
  {
    id: 4,
    type: "image" as const,
    src: awardCeremony,
    title: "Award Recognition",
    description: "Industry excellence award",
  },
  {
    id: 5,
    type: "image" as const,
    src: keyHandover,
    title: "Happy Homeowners",
    description: "Key handover ceremony",
  },
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const currentItem = selectedItem !== null ? galleryItems.find(item => item.id === selectedItem) : null;

  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedItem === null) return;
    const currentIndex = galleryItems.findIndex(item => item.id === selectedItem);
    if (direction === "prev") {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
      setSelectedItem(galleryItems[newIndex].id);
    } else {
      const newIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
      setSelectedItem(galleryItems[newIndex].id);
    }
    setIsVideoPlaying(false);
  };

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-widest uppercase mb-3">
            Our Work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Project Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our completed projects and ongoing developments
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => {
                setSelectedItem(item.id);
                setIsVideoPlaying(false);
              }}
            >
              <img
                src={item.type === "video" ? item.thumbnail : item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-primary fill-current ml-1" />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-cream text-sm font-semibold truncate">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl w-full p-0 bg-primary border-none">
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center text-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigateGallery("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center text-cream transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigateGallery("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center text-cream transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {currentItem?.type === "video" ? (
                <div className="aspect-video bg-black">
                  {isVideoPlaying ? (
                    <video
                      src={currentItem.src}
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  ) : (
                    <div 
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <img
                        src={currentItem.thumbnail}
                        alt={currentItem.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-gold">
                          <Play className="w-8 h-8 text-primary fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={currentItem?.src}
                  alt={currentItem?.title}
                  className="w-full max-h-[80vh] object-contain"
                />
              )}

              <div className="p-4 bg-primary">
                <h3 className="text-cream font-display text-xl font-semibold">
                  {currentItem?.title}
                </h3>
                <p className="text-cream/70 text-sm">{currentItem?.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
