

import React from 'react';
import AccountIcon from '@mui/icons-material/AccountCircle'

export interface AccountButtonProps {
    accountInitials: string;
    userName?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>
}
const AccountButton: React.FC<AccountButtonProps> = ({ accountInitials, userName, onClick }) => { 

   if(!userName){
    return <button className="bg-gray-100 hover:bg-gray-400 dark:bg-gray-900 dark:hover:bg-gray-600 flex-col items-center justify-center cursor-pointer text-white w-12 h-12 rounded-full" title={"not logged in"} onClick={onClick}>
        <AccountIcon className='text-gray-500 dark:text-gray-500' fontSize='large'></AccountIcon>
    </button>

   }

    return <button className="bg-[#1E40AF] hover:bg-[#2563EB] cursor-pointer text-white w-12 h-12 rounded-full" title={userName} onClick={onClick}>{accountInitials}</button>
}

export default AccountButton