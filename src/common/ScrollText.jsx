import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const ScrollText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <h2 ref={textRef} className="text-6xl font-bold">
      Scroll Driven Motion
    </h2>
  );
};
