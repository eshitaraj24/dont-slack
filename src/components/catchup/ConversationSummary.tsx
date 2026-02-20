interface ConversationSummaryProps {
  summary: string;
}

const ConversationSummary = ({ summary }: ConversationSummaryProps) => {
  return (
    <div className="px-4 py-3">
      <p className="text-[13px] text-foreground leading-relaxed">{summary}</p>
    </div>
  );
};

export default ConversationSummary;
