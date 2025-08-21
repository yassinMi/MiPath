import React from 'react';
import AppIcon from './AppIcon';
import AccountButton from './AccountButton';
import ThemeSwitch from './ThemeSwitch';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
    children?: React.ReactNode;
    onDarkToggle: () => void;
    isDark: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle, children, onDarkToggle , isDark}) => (
    <header className="flex shrink-0 px-6 py-2 bg-white  dark:bg-gray-950 shadow-xl ">
            <div className="flex flex-1 justify-between h-16 items-center">

                {/* Logo / Title */}
                <div className="flex items-center space-x-3">
                
                    <AppIcon></AppIcon>
                    <h1 className="text-2xl font-semibold text-black dark:text-white">{title}</h1>
                </div>

                {/* Search bar */}
                <div className="flex-1 mx-6 max-w-lg">
                    <div className="relative text-gray-400 focus-within:text-gray-600">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <svg
                            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                        </svg>
                    </div>
                </div>

            <ul className="flex flex-row gap-4 p-4">
                <li className="font-bold hover:underline cursor-pointer">Today</li>
                <li className="font-bold hover:underline cursor-pointer">This Week</li>
            </ul>
            <div className="flex flex-row gap-4 p-4 items-center">
                <ThemeSwitch onClick={onDarkToggle} isDark={isDark} ></ThemeSwitch>
                <AccountButton userName="YassinMi" accountInitials="YM" onClick={() => { }}></AccountButton>

</div>
           

            </div>
    </header>
);

export default AppHeader;