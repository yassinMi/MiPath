

import React from 'react';
import LightIcon from '@mui/icons-material/LightMode';
import DarkIcon from '@mui/icons-material/DarkMode';
export interface ThemeSwitchProps {
    isDark: boolean;
    onClick: () => void,
    className?: string
}
const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDark, onClick, className }) => { 

    return <button className={`bg-[#00000022] dark:bg-[#ffffff12]  ml-4 hover:bg-[#00000044] dark:hover:bg-[#ffffff24] cursor-pointer text-gray-900 dark:text-gray-100 w-8 h-8 rounded-full ${className}`} title={"switch dark mode"} onClick={onClick}>
        {isDark ? <DarkIcon></DarkIcon> : <LightIcon></LightIcon>}
    </button>
}

export default ThemeSwitch