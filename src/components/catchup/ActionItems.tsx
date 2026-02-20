import { ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useState } from 'react';
import type { ActionItem } from '@/data/mockData';

interface ActionItemsProps {
  items: ActionItem[];
  onConfirm: (id: string) => void;
  onJumpToMessage: (messageId: string) => void;
  onInsertReply: (text: string) => void;
}

const SlackAvatar = ({ initials, color, size = 20 }: { initials: string; color: string; size?: number }) => (
  <div
    className="rounded-full flex items-center justify-center shrink-0 font-bold text-white ring-1 ring-black/20"
    style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.38 }}
  >
    {initials}
  </div>
);

const ActionItems = ({ items, onConfirm, onJumpToMessage, onInsertReply }: ActionItemsProps) => {
  const [expandedReply, setExpandedReply] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-border-light">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-action-amber" />
        <h3 className="text-[13px] font-semibold text-foreground">Action Items</h3>
      </div>
      <div className="space-y-2">
        {items.map(item => {
          const isExpanded = expandedReply === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-md transition-colors ${item.isAssignedToUser ? 'bg-action-amber-bg' : 'bg-card-elevated'}`}
            >
              <div className="p-2.5">
                <div className="flex items-start gap-2.5">
                  {item.confirmed ? (
                    <CheckCircle2 className="w-4 h-4 text-decision-green mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-foreground-secondary mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-foreground leading-snug">{item.task}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <SlackAvatar initials={item.assigneeAvatar} color={item.assigneeAvatarColor} size={16} />
                      <span className={`text-[11px] font-medium ${item.isAssignedToUser ? 'text-action-amber' : 'text-foreground-secondary'}`}>
                        {item.assignedTo}
                      </span>
                      {item.deadline && (
                        <span className="text-[11px] text-foreground-secondary flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {item.deadline}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {item.isAssignedToUser && !item.confirmed && (
                        <button
                          onClick={() => onConfirm(item.id)}
                          className="text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors px-2 py-0.5 rounded border border-primary/30 hover:border-primary/50"
                        >
                          Confirm Ownership
                        </button>
                      )}
                      {item.confirmed && (
                        <span className="text-[11px] text-decision-green font-medium">Confirmed ✓</span>
                      )}
                      <button
                        onClick={() => onJumpToMessage(item.sourceMessageId)}
                        className="text-[11px] text-foreground-secondary hover:text-primary transition-colors flex items-center gap-0.5"
                      >
                        View source <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Suggested replies */}
              <div className="px-2.5 pb-2.5 pt-0">
                {!isExpanded ? (
                  <button
                    onClick={() => setExpandedReply(item.id)}
                    className="text-[11px] text-action-amber hover:underline"
                  >
                    Reply…
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {item.suggestedReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => { onInsertReply(`${item.task} - ${reply}`); setExpandedReply(null); }}
                        className="text-[11px] px-2 py-1 rounded-full border border-border text-foreground-secondary hover:border-action-amber hover:text-action-amber transition-colors bg-card"
                      >
                        {reply}
                      </button>
                    ))}
                    <button onClick={() => setExpandedReply(null)} className="text-[11px] text-foreground-secondary hover:text-foreground px-1">✕</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionItems;
