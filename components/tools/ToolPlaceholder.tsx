import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface ToolPlaceholderProps {
    title: string;
}

export const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({ title }) => {
    return (
        <div className="flex items-center justify-center h-full text-gray-500 flex-col gap-3">
            <div className="w-16 h-16 rounded-full bg-[#1e2329] flex items-center justify-center">
            <MoreHorizontal size={32} />
            </div>
            <p className="text-sm">Content for {title} is coming soon.</p>
        </div>
    );
};