import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { Decision } from '@/data/mockData';

interface KeyDecisionsProps {
  decisions: Decision[];
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

const KeyDecisions = ({ decisions, onJumpToMessage, onInsertReply }: KeyDecisionsProps) => {
  const [expandedReply, setExpandedReply] = useState<string | null>(null);

  if (decisions.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-border-light">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-decision-green" />
        <h3 className="text-[13px] font-semibold text-foreground">Key Decisions</h3>
      </div>
      <div className="space-y-2">
        {decisions.map(dec => {
          const isExpanded = expandedReply === dec.id;
          return (
            <div key={dec.id} className="rounded-md bg-decision-green-bg">
              <button
                onClick={() => onJumpToMessage(dec.sourceMessageId)}
                className="w-full text-left p-2.5 hover:bg-decision-green/10 transition-colors group rounded-md"
              >
                <p className="text-[13px] text-foreground leading-snug">{dec.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <SlackAvatar initials={dec.makerAvatar} color={dec.makerAvatarColor} size={16} />
                  <span className="text-[11px] text-foreground-secondary">{dec.maker} · {dec.timestamp}</span>
                  <span className="text-[11px] text-decision-green opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
              {/* Suggested replies */}
              <div className="px-2.5 pb-2.5 pt-0">
                {!isExpanded ? (
                  <button
                    onClick={() => setExpandedReply(dec.id)}
                    className="text-[11px] text-decision-green hover:underline"
                  >
                    Reply…
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {dec.suggestedReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => { onInsertReply(reply); setExpandedReply(null); }}
                        className="text-[11px] px-2 py-1 rounded-full border border-border text-foreground-secondary hover:border-decision-green hover:text-decision-green transition-colors bg-card"
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

export default KeyDecisions;
