

import React from 'react';

export interface AccountButtonProps {
    accountInitials: string;
    userName?: string;
    onClick: () => void
}
const AccountButton: React.FC<AccountButtonProps> = ({ accountInitials, userName, onClick }) => { 



    return <button className="bg-[#1E40AF] hover:bg-[#2563EB] cursor-pointer text-white w-12 h-12 rounded-full" title={userName} onClick={onClick}>{accountInitials}</button>
}

export default AccountButton