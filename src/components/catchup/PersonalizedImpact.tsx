import { ArrowRight, AtSign, ClipboardCheck, GitBranch } from 'lucide-react';
import type { ImpactItem } from '@/data/mockData';

interface PersonalizedImpactProps {
  items: ImpactItem[];
  onJumpToMessage: (messageId: string) => void;
}

const typeConfig = {
  mention: { icon: AtSign, label: 'Mention' },
  assignment: { icon: ClipboardCheck, label: 'Assignment' },
  decision: { icon: GitBranch, label: 'Decision' },
};

const PersonalizedImpact = ({ items, onJumpToMessage }: PersonalizedImpactProps) => {
  if (items.length === 0) return null;

  return (
    <div className="px-4 pb-3">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-impact-blue" />
        <h3 className="text-[13px] font-semibold text-foreground">What changed that affects you</h3>
      </div>
      <div className="space-y-2">
        {items.map(item => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <button
              key={item.id}
              onClick={() => onJumpToMessage(item.sourceMessageId)}
              className="w-full text-left p-2.5 rounded-md bg-impact-blue-bg hover:bg-impact-blue/10 transition-colors group"
            >
              <div className="flex items-start gap-2.5">
                <Icon className="w-3.5 h-3.5 text-impact-blue mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-foreground leading-snug">{item.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-foreground-secondary">{item.timestamp}</span>
                    <span className="text-[11px] text-impact-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                      Jump to message <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalizedImpact;
