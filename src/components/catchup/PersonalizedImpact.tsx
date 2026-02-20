import type { ImpactItem } from '@/data/mockData';

interface PersonalizedImpactProps {
  items: ImpactItem[];
  onJumpToMessage: (messageId: string) => void;
}

const typeLabel: Record<ImpactItem['type'], string> = {
  mention: 'Mentioned you',
  assignment: 'Assigned to you',
  decision: 'Affects your work',
};

const PersonalizedImpact = ({ items, onJumpToMessage }: PersonalizedImpactProps) => {
  if (items.length === 0) return null;

  return (
    <div className="px-4 py-1">
      {items.map((item, i) => (
        <button
          key={item.id}
          onClick={() => onJumpToMessage(item.sourceMessageId)}
          className={`w-full text-left flex gap-2.5 py-2.5 hover:bg-muted/50 transition-colors rounded px-1 -mx-1 ${
            i < items.length - 1 ? 'border-b border-border-light' : ''
          }`}
        >
          <img
            src={item.avatar}
            alt={item.user}
            className="w-8 h-8 rounded-full shrink-0 mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[13px] font-bold text-foreground">{item.user}</span>
              <span className="text-[11px] text-foreground-secondary">{item.timestamp}</span>
            </div>
            <p className="text-[13px] text-foreground leading-snug mt-0.5">{item.text}</p>
            <span className="text-[11px] text-foreground-secondary mt-0.5 inline-block">{typeLabel[item.type]}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PersonalizedImpact;
