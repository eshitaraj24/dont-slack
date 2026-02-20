import { X, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import PersonalizedImpact from './catchup/PersonalizedImpact';
import KeyDecisions from './catchup/KeyDecisions';
import ActionItems from './catchup/ActionItems';
import ConversationSummary from './catchup/ConversationSummary';
import KeyParticipants from './catchup/KeyParticipants';
import {
  impactItems,
  decisions,
  actionItems as initialActionItems,
  conversationSummary,
  participants,
} from '@/data/mockData';
import type { ActionItem } from '@/data/mockData';

interface CatchUpPanelProps {
  onClose: () => void;
  onJumpToMessage: (messageId: string) => void;
  onInsertReply: (text: string) => void;
  onPrefillComposer: (prefix: string) => void;
}

const CatchUpPanel = ({ onClose, onJumpToMessage, onInsertReply, onPrefillComposer }: CatchUpPanelProps) => {
  const [showConfidence, setShowConfidence] = useState(false);
  const [actions, setActions] = useState<ActionItem[]>(initialActionItems);
  const totalMessages = 47;

  const handleConfirmAction = (actionId: string) => {
    setActions(prev =>
      prev.map(a => (a.id === actionId ? { ...a, confirmed: true } : a))
    );
  };

  return (
    <div className="w-[400px] border-l border-border bg-card h-full flex flex-col panel-slide-in shrink-0">
      {/* Header */}
      <div className="h-[49px] px-4 flex items-center justify-between border-b border-border shrink-0">
        <h2 className="text-[15px] font-bold text-foreground truncate">
          Catch-Up Since Yesterday, 6:30 PM
        </h2>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground-secondary">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground-secondary"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Activity indicator */}
      <div className="px-4 py-2.5 border-b border-border-light bg-card-elevated">
        <p className="text-[12px] text-foreground-secondary">
          <span className="font-semibold text-foreground">{impactItems.length} key updates</span> out of {totalMessages} messages
        </p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-3 space-y-1">
          {/* Priority 1: Personalized Impact */}
          <PersonalizedImpact items={impactItems} onJumpToMessage={onJumpToMessage} onInsertReply={onInsertReply} />

          {/* Priority 2: Key Decisions */}
          <KeyDecisions decisions={decisions} onJumpToMessage={onJumpToMessage} onInsertReply={onInsertReply} />

          {/* Priority 3: Action Items */}
          <ActionItems
            items={actions}
            onConfirm={handleConfirmAction}
            onJumpToMessage={onJumpToMessage}
            onInsertReply={onInsertReply}
            onPrefillComposer={onPrefillComposer}
          />

          {/* Priority 4: Summary */}
          <ConversationSummary summary={conversationSummary} />

          {/* Priority 5: Key Participants */}
          <KeyParticipants participants={participants} />
        </div>

        {/* Confidence toggle */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowConfidence(!showConfidence)}
            className="flex items-center gap-1.5 text-[12px] text-foreground-secondary hover:text-foreground transition-colors"
          >
            {showConfidence ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            Confidence levels
          </button>
          {showConfidence && (
            <div className="mt-2 p-3 bg-card-elevated rounded-md text-[12px] text-foreground-secondary space-y-1.5">
              <div className="flex justify-between"><span>Personalized Impact</span><span className="text-decision-green font-medium">High</span></div>
              <div className="flex justify-between"><span>Decisions</span><span className="text-decision-green font-medium">High</span></div>
              <div className="flex justify-between"><span>Action Items</span><span className="text-action-amber font-medium">Medium</span></div>
              <div className="flex justify-between"><span>Summary</span><span className="text-decision-green font-medium">High</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatchUpPanel;
