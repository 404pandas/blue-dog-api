import { useEffect, useRef, useState } from "react";
import "./style.css";

// mui import
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

function Canvas() {
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(10);
  const [opacity, setOpacity] = useState(0.1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvasCTX(canvasContext);
  }, [canvasRef]);

  const SetPos = (e) => {
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const Draw = (e) => {
    if (e.buttons !== 1) return;
    const drawContext = canvasCTX;
    drawContext.beginPath();
    drawContext.moveTo(mouseData.x, mouseData.y);
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
    drawContext.lineTo(e.clientX, e.clientY);
    drawContext.strokeStyle = color;
    drawContext.lineWidth = size;
    drawContext.lineCap = "round";
    drawContext.globalAlpha = opacity;
    drawContext.stroke();
  };

  console.log(opacity);

  return (
    <div id='bluey-canvas'>
      <canvas
        ref={canvasRef}
        onMouseEnter={(e) => SetPos(e)}
        onMouseUp={(e) => SetPos(e)}
        onMouseDown={(e) => SetPos(e)}
        onMouseMove={(e) => Draw(e)}
      ></canvas>

      <Grid
        container
        spacing={3}
        className='controlpanel'
        id='drawing-control-panel'
        style={{
          position: "absolute",
          top: "56px",
          left: "0",
        }}
      >
        {/* Size */}
        <Grid xs={4}>
          <Typography variant='h6'>Size</Typography>{" "}
          <Slider
            className='drawing-slider'
            type='range'
            value={size}
            max={40}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </Grid>
        {/* Color */}
        <Grid xs={1}>
          <Typography variant='h6'>Color</Typography>{" "}
          <input
            id='color-input'
            type='color'
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </Grid>

        <Grid xs={4}>
          <Typography variant='h6'>Opacity</Typography>{" "}
          <Slider
            className='drawing-slider'
            type='range'
            step={0.01}
            value={opacity}
            min={0.0}
            max={1.0}
            onChange={(e) => {
              setOpacity(e.target.value);
            }}
          />
        </Grid>

        <Grid xs={2}>
          <Button
            variant='contained'
            onClick={() => {
              const ctx = canvasCTX;
              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Canvas;
