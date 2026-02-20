import { Circle, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';
import type { ActionItem } from '@/data/mockData';

interface ActionItemsProps {
  items: ActionItem[];
  onConfirm: (id: string) => void;
  onJumpToMessage: (messageId: string) => void;
}

const ActionItems = ({ items, onConfirm, onJumpToMessage }: ActionItemsProps) => {
  const [composerText, setComposerText] = useState<string | null>(null);

  if (items.length === 0) return null;

  const handleSuggestedReply = (text: string) => {
    setComposerText(text);
  };

  return (
    <div className="px-4 py-1">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`py-2.5 ${i < items.length - 1 ? 'border-b border-border-light' : ''}`}
        >
          <div className="flex gap-2.5">
            <button
              onClick={() => item.isAssignedToUser && !item.confirmed && onConfirm(item.id)}
              className="shrink-0 mt-0.5"
            >
              {item.confirmed ? (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              ) : (
                <Circle className="w-4 h-4 text-foreground-secondary hover:text-foreground transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <button
                onClick={() => onJumpToMessage(item.sourceMessageId)}
                className="text-left w-full"
              >
                <p className={`text-[13px] leading-snug ${item.confirmed ? 'text-foreground-secondary line-through' : 'text-foreground'}`}>
                  {item.task}
                </p>
              </button>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                {item.isAssignedToUser && (
                  <span className="text-[11px] text-foreground-secondary">Assigned to you</span>
                )}
                {!item.isAssignedToUser && (
                  <span className="text-[11px] text-foreground-secondary">{item.assignedTo}</span>
                )}
                {item.deadline && (
                  <span className="text-[11px] text-foreground-secondary flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {item.deadline}
                  </span>
                )}
                {item.isAssignedToUser && !item.confirmed && (
                  <>
                    <span className="text-[11px] text-foreground-secondary">·</span>
                    <button
                      onClick={() => onConfirm(item.id)}
                      className="text-[11px] text-primary hover:underline"
                    >
                      Confirm
                    </button>
                  </>
                )}
                {item.confirmed && (
                  <span className="text-[11px] text-primary">Confirmed</span>
                )}
              </div>

              {/* Suggested replies */}
              {item.isAssignedToUser && !item.confirmed && item.suggestedReplies && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.suggestedReplies.map((reply, ri) => (
                    <button
                      key={ri}
                      onClick={() => handleSuggestedReply(reply)}
                      className="text-[11px] text-foreground-secondary border border-border rounded-full px-2.5 py-1 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Mini composer preview */}
      {composerText && (
        <div className="mt-3 border border-border rounded-lg p-2.5">
          <textarea
            value={composerText}
            onChange={e => setComposerText(e.target.value)}
            className="w-full text-[13px] text-foreground bg-transparent resize-none outline-none leading-snug"
            rows={2}
          />
          <div className="flex items-center justify-between mt-1.5">
            <button
              onClick={() => setComposerText(null)}
              className="text-[11px] text-foreground-secondary hover:text-foreground"
            >
              Cancel
            </button>
            <button className="text-[11px] text-primary font-medium hover:underline">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionItems;
