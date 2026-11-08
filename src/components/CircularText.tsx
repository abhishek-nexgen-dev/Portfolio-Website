import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

type HoverMode = "slowDown" | "speedUp" | "pause" | "goBonkers";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: HoverMode;
  direction?: "clockwise" | "counterclockwise";
  size?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  color?: string;
  startAngle?: number;
  fill?: boolean;
  repeat?: number;
  ring?: boolean;
  ringColor?: string;
  tilt?: number;
  hoverTilt?: number;
  draggable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const HOVER_SPEED: Record<HoverMode, number> = {
  slowDown: 0.4,
  speedUp: 3.2,
  pause: 0,
  goBonkers: 12,
};

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  direction = "clockwise",
  size = 200,
  fontSize = 24,
  fontWeight = 900,
  color = "",
  startAngle = 0,
  repeat = 1,
  ring = false,
  ringColor = "",
  tilt = 0,
  hoverTilt = 0,
  children,
  className = "",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const glyphs = useMemo(() => Array.from(text ?? ""), [text]);
  const copies = Math.max(1, Math.round(repeat) || 1);
  const letters = useMemo(
    () => Array.from({ length: copies }, () => glyphs).flat(),
    [glyphs, copies]
  );

  const angles = useMemo(() => {
    if (!letters.length) return [];
    return letters.map((_, i) => startAngle + (360 / letters.length) * i);
  }, [letters, startAngle]);

  useEffect(() => {
    if (!ringRef.current) return;
    const dir = direction === "counterclockwise" ? -360 : 360;

    tweenRef.current = gsap.to(ringRef.current, {
      rotation: `+=${dir}`,
      duration: spinDuration,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [direction, spinDuration]);

  const handlePointerEnter = () => {
    if (!tweenRef.current) return;
    const targetScale = HOVER_SPEED[onHover] ?? 1;
    gsap.to(tweenRef.current, { timeScale: targetScale, duration: 0.35 });
  };

  const handlePointerLeave = () => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    if (rootRef.current && hoverTilt) {
      gsap.to(rootRef.current, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hoverTilt || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    gsap.to(rootRef.current, {
      rotateX: -ny * hoverTilt,
      rotateY: nx * hoverTilt,
      duration: 0.25,
      ease: "power1.out",
    });
  };

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto rounded-full text-center cursor-pointer select-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize,
        fontWeight,
        color: color || undefined,
        perspective: size * 2.5,
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ transform: tilt ? `rotateX(${tilt}deg)` : undefined }}
      >
        <span
          className="absolute inset-[1.3em] rounded-full border-solid border-current pointer-events-none transition-opacity duration-300"
          style={{
            borderWidth: Math.max(1, fontSize / 16),
            borderColor: ringColor || undefined,
            opacity: ring ? 1 : 0,
          }}
        />
        <div
          ref={ringRef}
          className="absolute inset-0"
          role="img"
          aria-label={text}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              className="absolute inset-0 inline-block whitespace-pre"
              style={{ transform: `rotate(${angles[i] ?? 0}deg)` }}
            >
              <span>{letter}</span>
            </span>
          ))}
        </div>
      </div>
      {children != null && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default CircularText;
