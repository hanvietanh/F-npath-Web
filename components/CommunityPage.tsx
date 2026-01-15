import React from 'react';
import { CommunityFeed } from './community/CommunityFeed';
import { CommunityRightSidebar } from './community/CommunityRightSidebar';
import { CommunityLeftSidebar } from './community/CommunityLeftSidebar';

interface CommunityPageProps {
    onStockClick?: (symbol: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onStockClick }) => {
  return (
    <div className="flex h-full w-full bg-[#000000] overflow-hidden font-sans">
        {/* Left Sidebar: Navigation List */}
        <CommunityLeftSidebar />

        {/* Middle Column: Chat Feed */}
        <CommunityFeed onStockClick={onStockClick} />
        
        {/* Right Sidebar: Details */}
        <CommunityRightSidebar />
    </div>
  );
};