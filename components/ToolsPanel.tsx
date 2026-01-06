import React from 'react';
import { X, Pin, PinOff, Sparkles } from 'lucide-react';
import { PanelMode, ToolId } from '../types';
import { AiAssistant } from './tools/AiAssistant';
import { ToolPlaceholder } from './tools/ToolPlaceholder';

interface ToolsPanelProps {
  activeTool: ToolId | null;
  mode: PanelMode;
  onTogglePin: () => void;
  onClose: () => void;
}

export const ToolsPanel: React.FC<ToolsPanelProps> = ({
  activeTool,
  mode,
  onTogglePin,
  onClose
}) => {

  const getToolTitle = () => {
    switch (activeTool) {
      case 'ask-ai': return 'Hỏi Gemini Assistant';
      case 'chat': return 'Community Chat';
      case 'intelligence': return 'Market Intelligence';
      case 'news': return 'AI Curated News';
      default: return 'Tools';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#13171b] border-l border-[#1e2329]">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-[#1e2329] bg-[#1a1f26]">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
            {activeTool === 'ask-ai' && <Sparkles size={16} className="text-[#2962ff]" />}
            {getToolTitle()}
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onTogglePin}
            className={`p-1.5 rounded hover:bg-[#2d3748] transition-colors ${mode === 'pinned' ? 'text-[#2962ff]' : 'text-gray-400'}`}
            title={mode === 'pinned' ? "Unpin panel" : "Pin panel"}
          >
            {mode === 'pinned' ? <PinOff size={16} /> : <Pin size={16} />}
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#2d3748] text-gray-400 hover:text-red-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {activeTool === 'ask-ai' ? (
          <AiAssistant onClose={onClose} />
        ) : (
          <ToolPlaceholder title={getToolTitle()} />
        )}
      </div>
    </div>
  );
};