import { Zap } from 'lucide-react';

interface CatchUpPillProps {
  unreadCount: number;
  onClick: () => void;
}

const CatchUpPill = ({ unreadCount, onClick }: CatchUpPillProps) => {
  return (
    <button
      onClick={onClick}
      className="catch-up-pill-pulse inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary text-primary-foreground rounded-full text-[12px] font-semibold hover:opacity-90 transition-opacity shadow-md"
    >
      <Zap className="w-3 h-3" />
      <span>Catch Up</span>
      {unreadCount > 0 && (
        <span className="text-primary-foreground/70 font-normal">
          · {unreadCount} new
        </span>
      )}
    </button>
  );
};

export default CatchUpPill;
