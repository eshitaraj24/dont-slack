import { ArrowRight, Clock, CheckCheck, PenLine } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import type { ActionItem } from '@/data/mockData';

interface ActionItemsProps {
  items: ActionItem[];
  onConfirm: (id: string) => void;
  onJumpToMessage: (messageId: string) => void;
  onInsertReply: (text: string) => void;
  onPrefillComposer: (prefix: string) => void;
}

const SlackAvatar = ({ initials, color, size = 20 }: { initials: string; color: string; size?: number }) => (
  <div
    className="rounded-full flex items-center justify-center shrink-0 font-bold text-white ring-1 ring-black/20"
    style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.38 }}
  >
    {initials}
  </div>
);

const ActionItems = ({ items, onConfirm, onJumpToMessage, onInsertReply, onPrefillComposer }: ActionItemsProps) => {
  const [expandedReply, setExpandedReply] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
          const isChecked = checkedItems.has(item.id);
          return (
            <div
              key={item.id}
              className={`rounded-md transition-all duration-200 ${item.isAssignedToUser ? 'bg-action-amber-bg' : 'bg-card-elevated'} ${isChecked ? 'opacity-50' : ''}`}
            >
              <div className="p-2.5">
                <div className="flex items-start gap-2.5">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleCheck(item.id)}
                    className="mt-0.5 shrink-0 border-foreground-secondary data-[state=checked]:bg-decision-green data-[state=checked]:border-decision-green"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] leading-snug transition-all duration-200 ${isChecked ? 'line-through text-foreground-secondary' : 'text-foreground'}`}>
                      {item.task}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <SlackAvatar initials={item.assigneeAvatar} color={item.assigneeAvatarColor} size={20} />
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
                    {!isChecked && (
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
                    )}
                  </div>
                </div>
              </div>

              {/* Suggested replies */}
              {!isChecked && (
                <div className="px-2.5 pb-2.5 pt-0">
                  {!isExpanded ? (
                    <button
                      onClick={() => setExpandedReply(item.id)}
                      className="text-[11px] text-action-amber hover:underline"
                    >
                      Reply…
                    </button>
                  ) : (
                    <div className="space-y-1.5">
                      {/* Quick suggested replies */}
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
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-border-light my-1" />

                      {/* Structured action reply options */}
                      <div className="flex flex-col gap-1">
                        {/* Done option */}
                        <button
                          onClick={() => {
                            onInsertReply(`${item.task} - Done / I have completed this`);
                            setExpandedReply(null);
                          }}
                          className="flex items-center gap-2 text-[11px] px-2.5 py-1.5 rounded-md border border-decision-green/30 text-decision-green hover:bg-decision-green/10 transition-colors bg-card text-left w-full"
                        >
                          <CheckCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-medium">Done / I have completed this</span>
                        </button>

                        {/* Write your own reply */}
                        <button
                          onClick={() => {
                            onPrefillComposer(`${item.task} - `);
                            setExpandedReply(null);
                          }}
                          className="flex items-center gap-2 text-[11px] px-2.5 py-1.5 rounded-md border border-border text-foreground-secondary hover:border-primary/40 hover:text-primary transition-colors bg-card text-left w-full"
                        >
                          <PenLine className="w-3.5 h-3.5 shrink-0" />
                          <span>Write your own reply…</span>
                        </button>
                      </div>

                      <button onClick={() => setExpandedReply(null)} className="text-[11px] text-foreground-secondary hover:text-foreground">
                        ✕ Close
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionItems;
