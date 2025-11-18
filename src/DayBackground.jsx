import { useEffect, useState } from "react";

export const DayBackground = () => {
  const [clouds, setClouds] = useState([]);
  const [flocks, setFlocks] = useState([]);

  useEffect(() => {
    generateClouds();
    generateFlocks();
  }, []);

  const generateClouds = () => {
    // Very few clouds to keep it light on performance
    const numberOfClouds = 3;
    const newClouds = [];

    for (let i = 0; i < numberOfClouds; i++) {
      newClouds.push({
        id: i,
        width: 18 + Math.random() * 10, // vw
        top: 5 + Math.random() * 40, // vh
        duration: 35 + Math.random() * 25, // seconds
        delay: Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.25,
      });
    }
    setClouds(newClouds);
  };

  const generateFlocks = () => {
    // A few light flocks to keep it subtle and low-power
    const numberOfFlocks = 5;
    const newFlocks = [];
    for (let i = 0; i < numberOfFlocks; i++) {
      const birdsInFlock = 2 + Math.floor(Math.random() * 4);
      const baseSpacing = 12 + Math.random() * 12;
      newFlocks.push({
        id: i,
        birds: Array.from({ length: birdsInFlock }).map((_, idx) => ({
          id: idx,
          offsetX: idx * baseSpacing + (Math.random() - 0.5) * 4,
          offsetY: (Math.random() - 0.5) * 7,
          scale: 0.6 + Math.random() * 0.7,
        })),
        top: 8 + Math.random() * 50,
        baseLeft: Math.random() * 20,
        delay: 4 + Math.random() * 18,
        duration: 12 + Math.random() * 10,
        direction: Math.random() > 0.5 ? 'left' : 'right',
      });
    }
    setFlocks(newFlocks);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: 'none',
        transition: 'background 1s',
        minHeight: '320px',
        width: '100vw',
        height: '100vh',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="day-cloud animate-cloud-drift"
          style={{
            position: "absolute",
            top: `${cloud.top}vh`,
            left: "-25vw",
            width: `${cloud.width * 0.8}vw`, // Slightly smaller clouds
            opacity: cloud.opacity,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
            minWidth: '60px',
            maxWidth: '180px',
          }}
        />
      ))}

      {flocks.map((flock) => (
        <svg
          key={flock.id}
          className={`day-bird-flock ${
            flock.direction === 'left'
              ? 'animate-birds-left'
              : 'animate-birds-right'
          }`}
          style={{
            position: "absolute",
            top: `${flock.top}vh`,
            left: `${
              flock.direction === 'left'
                ? 110
                : -20 + flock.baseLeft
            }vw`,
            animationDuration: `${flock.duration}s`,
            animationDelay: `${flock.delay}s`,
            width: 70, // Smaller flock width
            height: 32, // Smaller flock height
            overflow: 'visible',
            minWidth: '40px',
            maxWidth: '120px',
          }}
        >
          {flock.birds.map((bird) => (
            <path
              key={bird.id}
              d="M2,10 Q8,2 18,10 Q28,2 38,10 Q28,8 18,14 Q8,8 2,10 Z"
              fill="rgba(40,40,60,0.85)"
              opacity={0.9}
              style={{
                transform: `translate(${flock.direction === 'left' ? -bird.offsetX : bird.offsetX},${bird.offsetY}) scale(${bird.scale * 0.8}) ${
                  flock.direction === 'right' ? 'rotateY(180deg)' : ''
                }`,
                transition: 'transform 0.2s',
              }}
            />
          ))}
        </svg>
      ))}
    </div>
  );
};


