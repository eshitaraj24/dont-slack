import type { Participant } from '@/data/mockData';

interface KeyParticipantsProps {
  participants: Participant[];
}

const KeyParticipants = ({ participants }: KeyParticipantsProps) => {
  return (
    <div className="px-4 py-3 border-t border-border-light">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-participant-gray" />
        <h3 className="text-[13px] font-semibold text-foreground">Key Participants</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {participants.map(p => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slack-sidebar-accent text-slack-sidebar-active text-[11px] font-bold flex items-center justify-center">
              {p.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-medium text-foreground">{p.name}</span>
                {p.isTopContributor && (
                  <span className="text-[10px] text-primary font-medium px-1.5 py-0.5 bg-impact-blue-bg rounded-full">
                    Top
                  </span>
                )}
              </div>
              <span className="text-[11px] text-foreground-secondary">{p.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyParticipants;
