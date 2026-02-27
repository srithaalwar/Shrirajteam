import React, { useEffect, useRef, useState } from "react";
import "./WebHome.css";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Categories from "./Categories";
import { baseurl } from "../BaseURL/BaseURL";
import Footer from "../Footer/Footer";
import ElectronicAndMobilesCarousel from "../ElectronicAndMobilesCarousel/Carousel";
import ClothingAndGarmentsCarousel from "../ClothingAndGarmentsCarousel/Carousel";
import GroceryAndKiranamCarousel from "../GroceryAndKiranamCarousel/Carousel";
import FootWearCarousel from "../FootWearCarousel/Carousel";

const WebHome = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [loading, setLoading]               = useState(true);
  const videoRef                            = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoSlide, setIsVideoSlide]     = useState(false);
  const touchStartX                         = useRef(null);

  /* ── Fetch banner slides ── */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseurl}/carousel/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCarouselImages(Array.isArray(data.results) ? data.results : []);
      } catch {
        setCarouselImages([
          { image: "https://images.unsplash.com/photo-1600585154340-043cd447c909?auto=format&fit=crop&w=1400&q=80" },
          { image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1400&q=80" },
          { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ── Auto-slide (skip for video) ── */
  useEffect(() => {
    if (!carouselImages.length) return;
    if (isVideo(carouselImages[currentIndex])) return;
    const id = setInterval(() => {
      setCurrentIndex((p) => (p === carouselImages.length - 1 ? 0 : p + 1));
    }, 4500);
    return () => clearInterval(id);
  }, [carouselImages, currentIndex]);

  /* ── Track video slide ── */
  useEffect(() => {
    const item = carouselImages[currentIndex];
    if (item && isVideo(item)) {
      setIsVideoSlide(true);
      setIsVideoPlaying(false);
    } else {
      setIsVideoSlide(false);
      setIsVideoPlaying(false);
    }
  }, [currentIndex, carouselImages]);

  /* ── Auto-play video ── */
  useEffect(() => {
    if (!isVideoSlide || !videoRef.current) return;
    const t = setTimeout(() => videoRef.current?.play(), 600);
    return () => clearTimeout(t);
  }, [isVideoSlide]);

  /* ── Helpers ── */
  const isVideo = (item) => item?.video && item.video !== "";

  const getUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return `${baseurl}${path}`;
    return path;
  };

  const goTo = (idx) => setCurrentIndex(idx);
  const prev = () => setCurrentIndex((p) => (p === 0 ? carouselImages.length - 1 : p - 1));
  const next = () => setCurrentIndex((p) => (p === carouselImages.length - 1 ? 0 : p + 1));

  const toggleVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
  };

  /* ── Touch swipe ── */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div>
      <WebsiteNavbar />

      <div className="mani-as-home-wrap">

        {/* ══════════════════════════════════ */}
        {/* ════  MAIN BANNER CAROUSEL  ═════ */}
        {/* ══════════════════════════════════ */}
        <div
          className="mani-as-banner-wrap"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="mani-as-banner-media">
            {!loading && carouselImages.length > 0 && carouselImages[currentIndex] && (
              isVideo(carouselImages[currentIndex]) ? (
                <div className="mani-as-video-box" onClick={toggleVideo}>
                  <video
                    ref={videoRef}
                    className="mani-as-banner-vid"
                    src={getUrl(carouselImages[currentIndex].video)}
                    muted
                    playsInline
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={next}
                    onError={(e) => console.error("Video error:", e.target.src)}
                  />
                  <span className="mani-as-vid-icon">
                    {isVideoPlaying ? "⏸" : "▶"}
                  </span>
                </div>
              ) : (
                <img
                  key={currentIndex}
                  src={getUrl(carouselImages[currentIndex].image)}
                  alt={`Slide ${currentIndex + 1}`}
                  className="mani-as-banner-img"
                />
              )
            )}
          </div>

          {/* Overlay */}
          <div className="mani-as-banner-overlay" />

          {/* Arrows */}
          <button className="mani-as-slide-btn mani-as-slide-prev" onClick={prev} aria-label="Previous">‹</button>
          <button className="mani-as-slide-btn mani-as-slide-next" onClick={next} aria-label="Next">›</button>

          {/* Dots */}
          <div className="mani-as-dots-row">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                className={`mani-as-dot ${i === currentIndex ? "mani-as-dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Categories ── */}
        <Categories />

        {/* ══════════════════════════════════ */}
        {/* ════  PRODUCT CAROUSELS  ════════ */}
        {/* ══════════════════════════════════ */}
        <div className="mani-as-section-card">
          <ElectronicAndMobilesCarousel />
        </div>
        <div className="mani-as-section-card">
          <ClothingAndGarmentsCarousel />
        </div>
        <div className="mani-as-section-card">
          <GroceryAndKiranamCarousel />
        </div>
        <div className="mani-as-section-card">
          <FootWearCarousel />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default WebHome;