
import React from 'react';
import { ProfileSidebar } from './profile/ProfileSidebar';
import { ProfileContent } from './profile/ProfileContent';
import { ExpertProfile } from './constants';

interface ExpertProfileModalProps {
  expert: ExpertProfile;
  onClose: () => void;
}

export const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({ expert, onClose }) => {
  return (
    <div 
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" 
        onClick={(e) => {
            e.stopPropagation(); 
            onClose();
        }}
    >
      <div 
        className="w-full max-w-6xl h-[85vh] bg-[#0b0e11] border border-[#2c2c2e] rounded-xl shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <ProfileSidebar expert={expert} />
        <ProfileContent expert={expert} onClose={onClose} />
      </div>
    </div>
  );
};
