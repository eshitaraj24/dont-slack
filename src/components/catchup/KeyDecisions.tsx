import { ArrowRight } from 'lucide-react';
import type { Decision } from '@/data/mockData';

interface KeyDecisionsProps {
  decisions: Decision[];
  onJumpToMessage: (messageId: string) => void;
}

const KeyDecisions = ({ decisions, onJumpToMessage }: KeyDecisionsProps) => {
  if (decisions.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-border-light">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-decision-green" />
        <h3 className="text-[13px] font-semibold text-foreground">Key Decisions</h3>
      </div>
      <div className="space-y-2">
        {decisions.map(dec => (
          <button
            key={dec.id}
            onClick={() => onJumpToMessage(dec.sourceMessageId)}
            className="w-full text-left p-2.5 rounded-md bg-decision-green-bg hover:bg-decision-green/10 transition-colors group"
          >
            <p className="text-[13px] text-foreground leading-snug">{dec.text}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-foreground-secondary">{dec.maker} · {dec.timestamp}</span>
              <span className="text-[11px] text-decision-green opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyDecisions;
