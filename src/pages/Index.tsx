import { useState } from 'react';
import SlackSidebar from '@/components/SlackSidebar';
import ChannelView from '@/components/ChannelView';
import CatchUpPanel from '@/components/CatchUpPanel';

const Index = () => {
  const [activeChannel, setActiveChannel] = useState('2');
  const [showCatchUp, setShowCatchUp] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
  const [composerText, setComposerText] = useState('');

  const handleJumpToMessage = (messageId: string) => {
    setHighlightedMessageId(messageId);
    setTimeout(() => setHighlightedMessageId(null), 2500);
  };

  const handleInsertReply = (text: string) => {
    setComposerText(prev => prev ? `${prev}\n${text}` : text);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SlackSidebar activeChannel={activeChannel} onChannelSelect={(id) => { setActiveChannel(id); setShowCatchUp(false); }} />
      <ChannelView
        channelId={activeChannel}
        onOpenCatchUp={() => setShowCatchUp(true)}
        showCatchUp={showCatchUp}
        highlightedMessageId={highlightedMessageId}
        composerText={composerText}
        onComposerChange={setComposerText}
      />
      {showCatchUp && (
        <CatchUpPanel
          onClose={() => setShowCatchUp(false)}
          onJumpToMessage={handleJumpToMessage}
          onInsertReply={handleInsertReply}
        />
      )}
    </div>
  );
};

export default Index;

