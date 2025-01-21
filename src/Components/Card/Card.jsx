import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import CardImage from "../../Assets/Cards/3_spades.png";

export default function Card() {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const rotateBaseX = useMotionValue(0);
  const rotateBaseY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateBaseY, { stiffness: 500, damping: 20 });
  const smoothRotateY = useSpring(rotateBaseX, { stiffness: 500, damping: 20 });
  const rotateX = useTransform(smoothRotateX, [-500, 500], [10, -10]);
  const rotateY = useTransform(smoothRotateY, [-500, 500], [-15, 15]);

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const dragX = useSpring(cardX, { stiffness: 1250, damping: 75 });
  const dragY = useSpring(cardY, { stiffness: 1250, damping: 75 });

  const velocityX = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = dragX.onChange(() => {
      velocityX.set(dragX.getVelocity());
    });
    return () => unsubscribe();
  }, [dragX, velocityX]);

  const velocityZ = useTransform(velocityX, [-1000, 1000], [-25, 25]);

  const rotateZ = useSpring(velocityZ, {
    stiffness: 1500,
    damping: 100,
  });

  const shadowX = useTransform(dragX, (value) => value * (isDragging ? 0.90 : 0.98));
  const shadowY = useTransform(dragY, (value) => value + (isDragging ? 50 : 15));

  const handleMouseMove = (event, element) => {
    if (isDragging) return;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;
    rotateBaseX.set(offsetX);
    rotateBaseY.set(offsetY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    rotateBaseX.set(0);
    rotateBaseY.set(0);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    cardX.set(0);
    cardY.set(0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 800,
        perspectiveOrigin: "center",
        width: "min-content",
        height: "min-content",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          borderRadius: ".5vw",
          backgroundColor: "black",
          opacity: 0.2,
          width: "9vw",
          aspectRatio: "2.5/3.5",
          transformStyle: "preserve-3d",
          rotateZ,
          x: shadowX,
          y: shadowY,
        }}
        animate={{ scale: isDragging ? 1.1 : isHovering ? 1.05 : 1 }}
        transition={{
          scale: { type: "spring", stiffness: 1500, damping: 20 },
        }}
      />
      <motion.div
        style={{
          position: "relative",
          cursor: isDragging ? "grabbing" : "grab",
          borderRadius: ".5vw",
          backgroundColor: "white",
          backgroundImage: `url(${CardImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 5%",
          width: "9vw",
          aspectRatio: "2.5/3.5",
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          rotateZ,
          x: dragX,
          y: dragY,
        }}
        animate={{ scale: isDragging ? 1.1 : isHovering ? 1.05 : 1 }}
        transition={{
          scale: { type: "spring", stiffness: 1500, damping: 20 },
        }}
        drag
        dragMomentum={false}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDragEnd={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseMove={(event) => handleMouseMove(event, event.currentTarget)}
        onMouseLeave={handleMouseLeave}
      />
    </motion.div>
  );
}
