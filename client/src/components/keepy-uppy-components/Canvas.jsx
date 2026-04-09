import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

import Scene from "./Scene";
import { registerListener } from "./logic/utils";
import "./style.css";

export default function Canvas() {
  const sceneContainer = useRef(null);
  const [size, setSize] = useState(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const onResize = () => {
      const { width, height } = sceneContainer.current.getBoundingClientRect();
      setSize({ width, height });
    };
    const unregister = registerListener("resize", onResize);
    onResize();
    return unregister;
  }, []);

  // GSAP entrance — runs once when the scene first mounts
  useEffect(() => {
    if (size && sceneContainer.current && !hasAnimated.current) {
      hasAnimated.current = true;
      gsap.from(sceneContainer.current, {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
      });
    }
  }, [size]);

  return (
    <div className="page">
      <div className="scene-container" ref={sceneContainer}>
        {size && <Scene width={size.width} height={size.height} />}
      </div>
    </div>
  );
}
