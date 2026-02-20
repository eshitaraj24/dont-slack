import { useState } from 'react';
import SlackSidebar from '@/components/SlackSidebar';
import ChannelView from '@/components/ChannelView';
import CatchUpPanel from '@/components/CatchUpPanel';

const Index = () => {
  const [activeChannel, setActiveChannel] = useState('2'); // product-launch (47 unread)
  const [showCatchUp, setShowCatchUp] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);

  const handleJumpToMessage = (messageId: string) => {
    setHighlightedMessageId(messageId);
    // Reset after animation
    setTimeout(() => setHighlightedMessageId(null), 2500);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SlackSidebar activeChannel={activeChannel} onChannelSelect={(id) => { setActiveChannel(id); setShowCatchUp(false); }} />
      <ChannelView
        channelId={activeChannel}
        onOpenCatchUp={() => setShowCatchUp(true)}
        showCatchUp={showCatchUp}
        highlightedMessageId={highlightedMessageId}
      />
      {showCatchUp && (
        <CatchUpPanel
          onClose={() => setShowCatchUp(false)}
          onJumpToMessage={handleJumpToMessage}
        />
      )}
    </div>
  );
};

export default Index;
