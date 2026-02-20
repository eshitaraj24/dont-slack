interface ConversationSummaryProps {
  summary: string;
}

const ConversationSummary = ({ summary }: ConversationSummaryProps) => {
  return (
    <div className="px-4 py-3 border-t border-border-light">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-summary-purple" />
        <h3 className="text-[13px] font-semibold text-foreground">Conversation Summary</h3>
      </div>
      <p className="text-[13px] text-foreground-secondary leading-relaxed">{summary}</p>
    </div>
  );
};

export default ConversationSummary;
