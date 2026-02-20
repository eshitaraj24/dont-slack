import { Zap } from 'lucide-react';

interface CatchUpPillProps {
  unreadCount: number;
  onClick: () => void;
}

const CatchUpPill = ({ unreadCount, onClick }: CatchUpPillProps) => {
  return (
    <div className="flex justify-center mb-3">
      <button
        onClick={onClick}
        className="catch-up-pill-pulse inline-flex items-center gap-2.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>Catch Up</span>
        <span className="text-primary-foreground/70 font-normal">
          · {unreadCount} messages since you were away
        </span>
      </button>
    </div>
  );
};

export default CatchUpPill;
