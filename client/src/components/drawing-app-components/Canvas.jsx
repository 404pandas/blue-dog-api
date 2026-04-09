import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

import stampCar        from "../../assets/images/items/drawing-app-fast-car-stamp.png";
import stampTrophy     from "../../assets/images/items/drawing-app-goblet-stamp.png";
import stampHorse      from "../../assets/images/items/drawing-app-horse-stamp.png";
import stampBalloon    from "../../assets/images/items/balloon-ball.png";
import stampBingo      from "../../assets/images/items/balloon-player-bingo.png";
import stampArt        from "../../assets/images/items/art-supplies.png";
import stampBluey      from "../../assets/images/items/bluey-drawing.png";
import stampFan        from "../../assets/images/items/balloon-obstacle-fan.png";
import stampLeafBlower from "../../assets/images/items/balloon-obstacle-leaf-blower.png";
import stampUmbrella   from "../../assets/images/items/balloon-obstacle-umbrella.png";
import stampPopped     from "../../assets/images/items/balloon-popped.png";

import "./style.css";

const PALETTE = [
  "#3b96d2", "#1b6fab", "#0d4f82",
  "#f4845f", "#e85d35",
  "#7cb87e", "#f9d766",
  "#c9a0dc", "#87ceeb",
  "#ffffff", "#888888", "#111111",
];

const STAMPS = [
  { label: "Car",         src: stampCar        },
  { label: "Trophy",      src: stampTrophy     },
  { label: "Horse",       src: stampHorse      },
  { label: "Balloon",     src: stampBalloon    },
  { label: "Bingo",       src: stampBingo      },
  { label: "Art Supplies",src: stampArt        },
  { label: "Bluey",       src: stampBluey      },
  { label: "Fan",         src: stampFan        },
  { label: "Leaf Blower", src: stampLeafBlower },
  { label: "Umbrella",    src: stampUmbrella   },
  { label: "Popped!",     src: stampPopped     },
];

export default function DrawingCanvas() {
  const canvasRef      = useRef(null);
  const toolbarRef     = useRef(null);
  const ctxRef         = useRef(null);
  const lastPos        = useRef({ x: 0, y: 0 });
  const isDrawing      = useRef(false);
  const history        = useRef([]);
  const stampDropRef   = useRef(null);

  const [color,       setColor]       = useState("#3b96d2");
  const [size,        setSize]        = useState(14);
  const [opacity,     setOpacity]     = useState(1.0);
  const [tool,        setTool]        = useState("pen");
  const [activeStamp, setActiveStamp] = useState(null);
  const [stampOpen,   setStampOpen]   = useState(false);

  // ── Init canvas & resize ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");

    const resize = () => {
      const tbH = toolbarRef.current
        ? toolbarRef.current.getBoundingClientRect().height
        : 72;
      const imgData = ctxRef.current.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight - tbH;
      ctxRef.current.putImageData(imgData, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── GSAP toolbar entrance ────────────────────────────────────────────────
  useEffect(() => {
    gsap.from(toolbarRef.current, {
      y: -80, opacity: 0, duration: 0.7, ease: "back.out(1.5)",
    });
  }, []);

  // ── Undo (Ctrl/Cmd + Z) ─────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (history.current.length > 0) {
          const canvas = canvasRef.current;
          ctxRef.current.putImageData(history.current.pop(), 0, 0);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Close stamp dropdown on outside click ────────────────────────────────
  useEffect(() => {
    if (!stampOpen) return;
    const handler = (e) => {
      if (stampDropRef.current && !stampDropRef.current.contains(e.target)) {
        setStampOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [stampOpen]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const saveHistory = () => {
    const canvas = canvasRef.current;
    history.current.push(
      ctxRef.current.getImageData(0, 0, canvas.width, canvas.height)
    );
    if (history.current.length > 50) history.current.shift();
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  // ── Drawing events ───────────────────────────────────────────────────────
  const onStart = useCallback((e) => {
    e.preventDefault();
    const pos = getPos(e);

    if (tool === "stamp" && activeStamp) {
      saveHistory();
      const img = new Image();
      img.src = activeStamp;
      img.onload = () => {
        const ctx = ctxRef.current;
        const s   = size * 4;
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, pos.x - s / 2, pos.y - s / 2, s, s);
        ctx.globalAlpha = 1;
      };
      return;
    }

    saveHistory();
    isDrawing.current = true;
    lastPos.current   = pos;
  }, [tool, activeStamp, opacity, size]);

  const onMove = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const ctx = ctxRef.current;
    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineCap  = "round";
    ctx.lineJoin = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth   = size * 2;
      ctx.globalAlpha = 1;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth   = size;
      ctx.globalAlpha = opacity;
    }
    ctx.stroke();
    lastPos.current = pos;
  }, [tool, color, size, opacity]);

  const onEnd = useCallback(() => {
    isDrawing.current = false;
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────
  const clear = () => {
    saveHistory();
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const link    = document.createElement("a");
    link.download = "my-bluey-drawing.png";
    link.href     = canvasRef.current.toDataURL();
    link.click();
  };

  const pickTool = (t, stamp = null) => {
    setTool(t);
    setActiveStamp(stamp);
  };

  // ── Cursor ────────────────────────────────────────────────────────────────
  const cursor =
    tool === "eraser" ? "cell"
    : tool === "stamp" ? "copy"
    : "crosshair";

  const activeStampData = STAMPS.find((s) => s.src === activeStamp);

  return (
    <div className="da-app">
      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div ref={toolbarRef} className="da-toolbar">

        {/* Core tools */}
        <div className="da-group">
          <button
            className={`da-tool-btn ${tool === "pen" ? "active" : ""}`}
            onClick={() => pickTool("pen")}
            title="Pen"
          >✏️</button>
          <button
            className={`da-tool-btn ${tool === "eraser" ? "active" : ""}`}
            onClick={() => pickTool("eraser")}
            title="Eraser"
          >🧹</button>
        </div>

        {/* Colour palette */}
        <div className="da-group">
          {PALETTE.map((hex) => (
            <button
              key={hex}
              className={`da-swatch ${color === hex && tool === "pen" ? "selected" : ""}`}
              style={{ background: hex }}
              onClick={() => { setColor(hex); pickTool("pen"); }}
              title={hex}
            />
          ))}
          <input
            type="color"
            className="da-color-custom"
            value={color}
            onChange={(e) => { setColor(e.target.value); pickTool("pen"); }}
            title="Custom colour"
          />
        </div>

        {/* Sliders */}
        <div className="da-group da-sliders">
          <label>
            <span>Size&nbsp;<b>{size}</b></span>
            <input type="range" min={1} max={60} value={size}
              onChange={(e) => setSize(Number(e.target.value))} />
          </label>
          <label>
            <span>Opacity&nbsp;<b>{Math.round(opacity * 100)}%</b></span>
            <input type="range" min={0.05} max={1} step={0.01} value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))} />
          </label>
        </div>

        {/* Stamp dropdown */}
        <div className="da-stamp-dropdown" ref={stampDropRef}>
          <button
            className={`da-tool-btn da-stamp-trigger ${tool === "stamp" ? "active" : ""}`}
            onClick={() => setStampOpen((o) => !o)}
            title="Stamps"
          >
            {tool === "stamp" && activeStampData
              ? <img src={activeStampData.src} alt={activeStampData.label} className="da-stamp-thumb" />
              : <span>🖼️</span>}
            <span className="da-stamp-caret">{stampOpen ? "▲" : "▼"}</span>
          </button>

          {stampOpen && (
            <div className="da-stamp-panel">
              {STAMPS.map((s) => (
                <button
                  key={s.label}
                  className={`da-stamp-option ${activeStamp === s.src ? "selected" : ""}`}
                  onClick={() => { pickTool("stamp", s.src); setStampOpen(false); }}
                  title={s.label}
                >
                  <img src={s.src} alt={s.label} className="da-stamp-thumb-lg" />
                  <span className="da-stamp-label">{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="da-group">
          <button className="da-action" onClick={clear} title="Clear canvas">Clear</button>
          <button className="da-action da-action-save" onClick={download} title="Save drawing">Save ↓</button>
        </div>
      </div>

      {/* ── Canvas ──────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="da-canvas"
        style={{ cursor }}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      />
    </div>
  );
}
