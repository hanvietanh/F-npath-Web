
import React from 'react';
import { CommunityFeed } from './community/CommunityFeed';
import { CommunityRightSidebar } from './community/CommunityRightSidebar';
import { CommunityLeftSidebar } from './community/CommunityLeftSidebar';

export const CommunityPage: React.FC = () => {
  return (
    <div className="flex h-full w-full bg-[#000000] overflow-hidden font-sans">
        {/* Left Sidebar: Navigation List */}
        <CommunityLeftSidebar />

        {/* Middle Column: Chat Feed */}
        <CommunityFeed />
        
        {/* Right Sidebar: Details */}
        <CommunityRightSidebar />
    </div>
  );
};
