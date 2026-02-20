import { ArrowRight, AtSign, ClipboardCheck, GitBranch } from 'lucide-react';
import { useState } from 'react';
import type { ImpactItem } from '@/data/mockData';

interface PersonalizedImpactProps {
  items: ImpactItem[];
  onJumpToMessage: (messageId: string) => void;
  onInsertReply: (text: string) => void;
}

const typeConfig = {
  mention: { icon: AtSign, label: 'Mention' },
  assignment: { icon: ClipboardCheck, label: 'Assignment' },
  decision: { icon: GitBranch, label: 'Decision' },
};

const SlackAvatar = ({ initials, color, size = 22 }: { initials: string; color: string; size?: number }) => (
  <div
    className="rounded-full flex items-center justify-center shrink-0 font-bold text-white ring-1 ring-black/20"
    style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.38 }}
  >
    {initials}
  </div>
);

const PersonalizedImpact = ({ items, onJumpToMessage, onInsertReply }: PersonalizedImpactProps) => {
  const [expandedReply, setExpandedReply] = useState<string | null>(null);

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
          const isExpanded = expandedReply === item.id;
          return (
            <div key={item.id} className="rounded-md bg-impact-blue-bg">
              <button
                onClick={() => onJumpToMessage(item.sourceMessageId)}
                className="w-full text-left p-2.5 hover:bg-impact-blue/10 transition-colors group rounded-md"
              >
                <div className="flex items-start gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-impact-blue mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-foreground leading-snug">{item.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <SlackAvatar initials={item.personAvatar} color={item.personAvatarColor} size={16} />
                      <span className="text-[11px] text-foreground-secondary">{item.personName} · {item.timestamp}</span>
                      <span className="text-[11px] text-impact-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        Jump <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              {/* Suggested replies */}
              <div className="px-2.5 pb-2.5 pt-0">
                {!isExpanded ? (
                  <button
                    onClick={() => setExpandedReply(item.id)}
                    className="text-[11px] text-impact-blue hover:underline"
                  >
                    Reply…
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {item.suggestedReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => { onInsertReply(reply); setExpandedReply(null); }}
                        className="text-[11px] px-2 py-1 rounded-full border border-border text-foreground-secondary hover:border-impact-blue hover:text-impact-blue transition-colors bg-card"
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

export default PersonalizedImpact;
