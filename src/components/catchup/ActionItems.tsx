import { ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import type { ActionItem } from '@/data/mockData';

interface ActionItemsProps {
  items: ActionItem[];
  onConfirm: (id: string) => void;
  onJumpToMessage: (messageId: string) => void;
}

const ActionItems = ({ items, onConfirm, onJumpToMessage }: ActionItemsProps) => {
  if (items.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-border-light">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-action-amber" />
        <h3 className="text-[13px] font-semibold text-foreground">Action Items</h3>
      </div>
      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className={`p-2.5 rounded-md transition-colors ${
              item.isAssignedToUser ? 'bg-action-amber-bg' : 'bg-card-elevated'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {item.confirmed ? (
                <CheckCircle2 className="w-4 h-4 text-decision-green mt-0.5 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-foreground-secondary mt-0.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-foreground leading-snug">{item.task}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
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
        ))}
      </div>
    </div>
  );
};

export default ActionItems;
