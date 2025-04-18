import { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, Typography, MobileStepper, Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Type for individual image
interface CarouselImage {
  label: string;
  imgPath: string;
}

const images: CarouselImage[] = [
  {
    label: "Bingo Spinning",
    imgPath:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXIzeDFlenpvemdieXpxbXp0OWw4cWVxNHYwejRuanVpaGRqb2d0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LnvLGSXL9vzjixb6kD/giphy.gif",
  },
  {
    label: "Bingo Pointing and Laughing",
    imgPath:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWxmb3d1eWQ0a2RsMmRxNXZpdHEwdG5maXM5bXZ3eGtqczJpbWR5NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XDS5W9foJ0yjGwbekN/giphy.gif",
  },
  {
    label: "Bingo and Bluey giggling",
    imgPath:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWsxbXhtMHo2NHNwZG9tbHd6dDNhbG0zeTZhY2hya25scTN4OGZxcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZBnf7lhfQuRZJN4Z31/giphy.gif",
  },
  {
    label: "Bingo... doing something",
    imgPath:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHJqenVva2ZuaWNkZHFxNjNyZ3ZoMHN4ZGljMW40N3FxbmMyNW0wcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f6ORvWUuYd0UDW5tHA/giphy.gif",
  },
  {
    label: "'Wait, I know!'",
    imgPath:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWZxeGtwNGk3MW41Y3Y1bThvMjdibXRoZW5ibDM0OWFtZm43dTVzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j57tnDrunHQ5lqXPQg/giphy.gif",
  },
  {
    label: "Bluey celebrating",
    imgPath:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTIzcW04eWE3amt2eTNiZTduOXQ4Z3UxMWIxaGNiOXEwZXZyazEzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lq3vVHiMgjQGXOs2H6/giphy.gif",
  },
  {
    label: "Bluey Dancing",
    imgPath:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnVlajdtNnZieTUxaXRwbjdnbWVvb3F3YXZ5ZDh6dTI4dXc2Mm5ydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j6TmWtNerkGPgrpxNF/giphy.gif",
  },
  {
    label: "Bingo Hugging Carrot",
    imgPath:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW9nczMydTVjcWRkcG94dzJlZWtkNTQ1NWxkZDdicHc5ZmlrMHBuNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/StdOGnXLUnxSC3Hx40/giphy.gif",
  },
  {
    label: "'Yay!",
    imgPath:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExczF5d3o3aGR6MmlvbTVjZmd0aHlwdGxxN3Q4bTE4MXY0NG1rbW9pbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cNw6ur8onzMiCYh8Z3/giphy.gif",
  },
  {
    label: "Bluey Hooray",
    imgPath:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXplb2FmNHA2Z29jdjV0cG90bG5jbnZmeHpqNHJucG1vemxlY3cxeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ibXIzo3FSVvM8FTuYr/giphy.gif",
  },
];

export default function GifCarousel(): JSX.Element {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);
  const maxSteps = images.length;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % maxSteps);
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered, maxSteps]);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndXRef.current;

    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? handleNext() : handleBack();
    }
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography variant='h6'>{images[activeStep].label}</Typography>
      </Paper>

      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: "relative",
          height: 350,
          maxWidth: 400,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          component='img'
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={images[activeStep].imgPath}
          alt={images[activeStep].label}
        />
      </Box>

      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
