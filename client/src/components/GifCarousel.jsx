import React from "react";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
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

export default function GifCarousel() {
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
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
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component='img'
                sx={{
                  height: 350,
                  display: "block",
                  maxWidth: 400,
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
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
