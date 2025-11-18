import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    generateStars();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 7000 // Slightly higher density for large screens
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 1.5 + 0.7, // Smaller stars for all screens
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: Math.random() * 6 + 3,
      });
    }

    setStars(newStars);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        minHeight: "320px",
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            position: "absolute",
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${Math.random() * 4}s`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size * 0.5}px rgba(255, 255, 255, ${star.opacity})`,
            minWidth: "2px",
            maxWidth: "6px",
          }}
        />
      ))}
    </div>
  );
};
