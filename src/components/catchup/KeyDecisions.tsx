import type { Decision } from '@/data/mockData';

interface KeyDecisionsProps {
  decisions: Decision[];
  onJumpToMessage: (messageId: string) => void;
}

const KeyDecisions = ({ decisions, onJumpToMessage }: KeyDecisionsProps) => {
  if (decisions.length === 0) return null;

  return (
    <div className="px-4 py-1">
      {decisions.map((dec, i) => (
        <button
          key={dec.id}
          onClick={() => onJumpToMessage(dec.sourceMessageId)}
          className={`w-full text-left flex gap-2.5 py-2.5 hover:bg-muted/50 transition-colors rounded px-1 -mx-1 ${
            i < decisions.length - 1 ? 'border-b border-border-light' : ''
          }`}
        >
          <img
            src={dec.makerAvatar}
            alt={dec.maker}
            className="w-8 h-8 rounded-full shrink-0 mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[13px] font-bold text-foreground">{dec.maker}</span>
              <span className="text-[11px] text-foreground-secondary">{dec.timestamp}</span>
            </div>
            <p className="text-[13px] text-foreground leading-snug mt-0.5">
              <span className="text-foreground-secondary">Decision: </span>
              {dec.text}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default KeyDecisions;
