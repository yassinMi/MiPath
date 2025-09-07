import React, { useState } from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

interface Duration {
  hours: number;
  minutes: number;
}
interface DurationPickerProps{
  durationMinutes?:number
  onChangeDuration:(duration?:number)=>void
}

function minutesToDuration(minutes?:number):Duration{
    if(minutes===undefined) return {hours:0,minutes:0}
    return {hours:Math.floor(minutes/60), minutes: minutes%60}
}
function durationToMinutes(duration:Duration):number|undefined{
    if(duration===undefined) return undefined;
    if(duration.hours==0 && duration.minutes==0) return undefined
    return (duration.hours*60) + duration.minutes
}
const DurationPicker: React.FC<DurationPickerProps> = ({durationMinutes, onChangeDuration}) => {
  const [duration, setDuration] = useState<Duration>(minutesToDuration(durationMinutes));

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    const newDuration = { ...duration, [name]: Number(value) } as Duration;
    setDuration(newDuration);
    onChangeDuration(durationToMinutes(newDuration));
    
  };

  return (
    <Box sx={{ maxWidth: 400,  }}>
      <Grid container spacing={2} alignItems="center">
        <Grid  component="div">
          <FormControl size="small">
            <InputLabel>Hours</InputLabel>
            <Select
              name="hours"
              value={duration.hours}
              onChange={(e)=>handleChange(e)}
              label="Hours"
            >
              {[...Array(24).keys()].map((h) => (
                <MenuItem key={h} value={h}>
                  {h}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid component="div">
          <FormControl size="small">
            <InputLabel>Minutes</InputLabel>
            <Select
              name="minutes"
              value={duration.minutes}
              onChange={handleChange}
              label="Minutes"
            >
              {[...Array(60).keys()].map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid  component="div">
          <TextField
            fullWidth
            size="small"
            label="Total Duration"
            value={!duration.hours&&!duration.minutes?'unset': `${duration.hours} hours ${duration.minutes} minutes`}
            slotProps={{input:{readOnly:true}}}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DurationPicker;
