import { useState } from 'react';
import SlackSidebar from '@/components/SlackSidebar';
import ChannelView from '@/components/ChannelView';
import CatchUpPanel from '@/components/CatchUpPanel';

const Index = () => {
  const [activeChannel, setActiveChannel] = useState('2');
  const [showCatchUp, setShowCatchUp] = useState(false);
  const [isGlobalCatchUp, setIsGlobalCatchUp] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);

  const handleJumpToMessage = (messageId: string) => {
    setHighlightedMessageId(messageId);
    setTimeout(() => setHighlightedMessageId(null), 2500);
  };

  const handleOpenGlobalCatchUp = () => {
    setIsGlobalCatchUp(true);
    setShowCatchUp(true);
  };

  const handleOpenChannelCatchUp = () => {
    setIsGlobalCatchUp(false);
    setShowCatchUp(true);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SlackSidebar
        activeChannel={activeChannel}
        onChannelSelect={(id) => { setActiveChannel(id); setShowCatchUp(false); setIsGlobalCatchUp(false); }}
        onOpenGlobalCatchUp={handleOpenGlobalCatchUp}
        isGlobalCatchUpActive={isGlobalCatchUp && showCatchUp}
      />
      <ChannelView
        channelId={activeChannel}
        onOpenCatchUp={handleOpenChannelCatchUp}
        showCatchUp={showCatchUp}
        highlightedMessageId={highlightedMessageId}
      />
      {showCatchUp && (
        <CatchUpPanel
          onClose={() => { setShowCatchUp(false); setIsGlobalCatchUp(false); }}
          onJumpToMessage={handleJumpToMessage}
          isGlobal={isGlobalCatchUp}
        />
      )}
    </div>
  );
};

export default Index;
