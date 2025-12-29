import React from 'react';
import { ChevronDown } from 'lucide-react';

export const ToolbarButton = ({ icon: Icon, active = false }: { icon: any, active?: boolean }) => (
  <button className={`p-2 rounded hover:bg-[#2a2e39] transition-colors ${active ? 'text-[#2962ff]' : 'text-gray-400'}`}>
    <Icon size={18} strokeWidth={1.5} />
  </button>
);

export const TopBarButton = ({ label, icon: Icon, active = false, hasDropdown = false }: { label?: string, icon?: any, active?: boolean, hasDropdown?: boolean }) => (
  <button className={`h-8 px-2 flex items-center gap-1 rounded hover:bg-[#2a2e39] transition-colors ${active ? 'text-[#2962ff]' : 'text-gray-300'} text-xs font-medium`}>
    {Icon && <Icon size={16} strokeWidth={1.5} />}
    {label && <span>{label}</span>}
    {hasDropdown && <ChevronDown size={12} className="opacity-70 ml-0.5" />}
  </button>
);