import { useEffect, useState } from 'react';
import './App.css';
import ProjectComponent from './Components/ProjectComponent';
import ProjectsList from './Components/ProjectsList';
import type { Project } from './Model/Project';
import AppHeader from './Components/AppHeader';
import AppIcon from './Components/AppIcon';
import { createTheme, ThemeProvider, useColorScheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet, Route, Routes } from 'react-router-dom';
import { SnackbarContent } from '@mui/material';
import { SnackbarProvider } from './Components/SnackbarContext';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [darkMode, setDarkMode] = useState(prefersDark);
     const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const { mode, setMode } = useColorScheme();
    if(!mode){
        setMode("system")
    }
 
   
      useEffect(() => {
    const root = document.documentElement;

    
      root.style.setProperty("color-scheme", darkMode?"dark":"light");
    
  }, [darkMode]);

   
    const onDarkToggle = () => {
        if (mode == "light") {
            setMode("dark")
            setDarkMode(true)
        }
        else {
            setMode("light")
            setDarkMode(false)
        }
    }
  

    return (
        <div style={{colorScheme:darkMode?"dark":"light"}} className={`app-main min-h-screen  scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100
            dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800  flex flex-col text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 ${darkMode ? "dark" : "light"}`}>
            <AppHeader onDarkToggle={onDarkToggle} isDark={darkMode} subtitle="Projects" title="Freelancer Project Manager"></AppHeader>
              <Outlet></Outlet>
             
    
           
        </div>
       
    );

    
}


const theme = createTheme({
   
  colorSchemes: {
    dark: {
        palette:{
primary: {
     main: "#2737b0ff", // purple
        dark: "#2737b0ff", // purple
                light: "#2737b0ff"
      
        
      },
      
      secondary: {
         main: "#06962fff", // blue
        dark: "#106829ff",
        light: "#06962fff",

      },
        }
    },
    light:{
   palette:{
primary: {
     main: "#2737b0ff", // purple
        dark: "#2737b0ff", // purple
                light: "#2737b0ff"
      
        
      },
      
      secondary: {
         main: "#06962fff", // blue
        dark: "#106829ff",
        light: "#06962fff",

      },
        }
    },
  },



});

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
         <App />
      </SnackbarProvider>
       
    </ThemeProvider>
  );
}
