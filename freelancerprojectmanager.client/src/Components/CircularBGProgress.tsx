import React from "react";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
  type CircularProgressProps,
} from "@mui/material/CircularProgress";

interface CircularBgProgressProps extends CircularProgressProps {
  trackColor?: string;
  progressColor?: string;
}

const CircularBgProgress: React.FC<CircularBgProgressProps> = ({
  trackColor,
  progressColor,
  ...props
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        aria-valuenow={100}
        size={props.size ?? 40}
        thickness={props.thickness ?? 4}
        sx={(theme) => ({
          color: trackColor ?? theme.palette.grey[200],
          ...theme.applyStyles("dark", {
            color: trackColor ?? theme.palette.grey[800],
          }),
        })}
        {...props}
        value={100}
      />
<CircularProgress
        variant="indeterminate"
        disableShrink
        color="success"
        size={props.size ?? 40}
        thickness={props.thickness ?? 4}
        sx={(theme) => ({
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
         
        })}
        {...props}
      />
      
    </Box>
  );
};

export default CircularBgProgress;
