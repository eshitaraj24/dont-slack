import { X, RefreshCw, Hash, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import PersonalizedImpact from './catchup/PersonalizedImpact';
import KeyDecisions from './catchup/KeyDecisions';
import ActionItems from './catchup/ActionItems';
import ConversationSummary from './catchup/ConversationSummary';
import {
  impactItems,
  decisions,
  actionItems as initialActionItems,
  conversationSummary,
  globalChannelSummaries,
} from '@/data/mockData';
import type { ActionItem } from '@/data/mockData';

interface CatchUpPanelProps {
  onClose: () => void;
  onJumpToMessage: (messageId: string) => void;
  isGlobal?: boolean;
  channelName?: string;
}

type TabId = 'impact' | 'decisions' | 'actions' | 'summary';

const tabs: { id: TabId; label: string }[] = [
  { id: 'impact', label: 'For You' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'actions', label: 'Action Items' },
  { id: 'summary', label: 'Summary' },
];

const CatchUpPanel = ({ onClose, onJumpToMessage, isGlobal = false, channelName }: CatchUpPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('impact');
  const [viewMode, setViewMode] = useState<'channel' | 'workspace'>(isGlobal ? 'workspace' : 'channel');
  const [actions, setActions] = useState<ActionItem[]>(initialActionItems);

  const handleConfirmAction = (actionId: string) => {
    setActions(prev =>
      prev.map(a => (a.id === actionId ? { ...a, confirmed: true } : a))
    );
  };

  const totalMessages = 47;
  const keyUpdates = impactItems.length;

  return (
    <div className="w-[380px] border-l border-border bg-background h-full flex flex-col panel-slide-in shrink-0">
      {/* Header */}
      <div className="h-[49px] px-4 flex items-center justify-between border-b border-border shrink-0">
        <h2 className="text-[15px] font-bold text-foreground truncate">
          Catch-Up · Since Yesterday 6:30 PM
        </h2>
        <div className="flex items-center gap-0.5">
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-foreground-secondary">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-foreground-secondary"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Activity + scope toggle */}
      <div className="px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-[12px] text-foreground-secondary">
          {viewMode === 'workspace'
            ? `8 key updates · 3 channels`
            : `${keyUpdates} key updates · ${totalMessages} messages`}
        </span>
        <div className="flex items-center bg-muted rounded p-0.5">
          <button
            onClick={() => setViewMode('channel')}
            className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
              viewMode === 'channel' ? 'bg-background text-foreground shadow-sm' : 'text-foreground-secondary'
            }`}
          >
            Channel
          </button>
          <button
            onClick={() => setViewMode('workspace')}
            className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
              viewMode === 'workspace' ? 'bg-background text-foreground shadow-sm' : 'text-foreground-secondary'
            }`}
          >
            Workspace
          </button>
        </div>
      </div>

      {viewMode === 'workspace' ? (
        /* Global workspace view */
        <div className="flex-1 overflow-y-auto">
          {/* Still show tabs for global */}
          <div className="px-4 pt-2 pb-0 border-b border-border flex gap-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[12px] px-2.5 pb-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary font-medium'
                    : 'text-foreground-secondary hover:text-foreground'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {activeTab === 'impact' && (
            <div className="py-2">
              <PersonalizedImpact items={impactItems} onJumpToMessage={onJumpToMessage} />
              {/* Channel groups */}
              <div className="mt-3 px-4">
                <p className="text-[11px] font-medium text-foreground-secondary uppercase tracking-wider mb-2">By channel</p>
                {globalChannelSummaries.map(ch => (
                  <button
                    key={ch.channelId}
                    className="w-full flex items-center gap-2.5 py-2 border-b border-border-light hover:bg-muted/50 transition-colors group text-left"
                  >
                    <Hash className="w-3.5 h-3.5 text-foreground-secondary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[13px] font-medium text-foreground">{ch.channelName}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-foreground-secondary">{ch.decisionsCount} decisions</span>
                        <span className="text-[11px] text-foreground-secondary">· {ch.actionItemsCount} actions</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-foreground-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'decisions' && (
            <div className="py-2">
              <KeyDecisions decisions={decisions} onJumpToMessage={onJumpToMessage} />
            </div>
          )}
          {activeTab === 'actions' && (
            <div className="py-2">
              <ActionItems items={actions} onConfirm={handleConfirmAction} onJumpToMessage={onJumpToMessage} />
            </div>
          )}
          {activeTab === 'summary' && (
            <div className="py-2">
              <ConversationSummary summary={conversationSummary} />
            </div>
          )}
        </div>
      ) : (
        /* Channel-level view */
        <>
          {/* Tabs */}
          <div className="px-4 pt-2 pb-0 border-b border-border flex gap-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[12px] px-2.5 pb-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary font-medium'
                    : 'text-foreground-secondary hover:text-foreground'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'impact' && (
              <PersonalizedImpact items={impactItems} onJumpToMessage={onJumpToMessage} />
            )}
            {activeTab === 'decisions' && (
              <KeyDecisions decisions={decisions} onJumpToMessage={onJumpToMessage} />
            )}
            {activeTab === 'actions' && (
              <ActionItems items={actions} onConfirm={handleConfirmAction} onJumpToMessage={onJumpToMessage} />
            )}
            {activeTab === 'summary' && (
              <ConversationSummary summary={conversationSummary} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CatchUpPanel;
