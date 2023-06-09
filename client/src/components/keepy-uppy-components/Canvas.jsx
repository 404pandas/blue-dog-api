import React, { useRef, useEffect, useState } from "react";

// local imports
import Scene from "./Scene";
import { registerListener } from "./logic/utils";
import "./style.css";

export default function Canvas() {
  const sceneContainer = useRef();
  const [size, setSize] = useState();

  useEffect(() => {
    const onResize = () => {
      const { width, height } = sceneContainer.current.getBoundingClientRect();
      setSize({ width, height });
    };
    const unregisterResizeListener = registerListener("resize", onResize);
    onResize();
    return unregisterResizeListener;
  }, []);

  return (
    <div className='page'>
      <div className='scene-container' ref={sceneContainer}>
        {size && <Scene width={size.width} height={size.height} />}
      </div>
    </div>
  );
}
