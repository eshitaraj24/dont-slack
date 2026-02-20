import { Hash, Search, Users, Bookmark, ChevronDown, Plus, Smile, Paperclip, Send } from 'lucide-react';
import { messages, channels } from '@/data/mockData';
import CatchUpPill from './CatchUpPill';
import { useRef, useEffect, useState } from 'react';

interface ChannelViewProps {
  channelId: string;
  onOpenCatchUp: () => void;
  showCatchUp: boolean;
  highlightedMessageId: string | null;
}

const ChannelView = ({ channelId, onOpenCatchUp, showCatchUp, highlightedMessageId }: ChannelViewProps) => {
  const channel = channels.find(c => c.id === channelId);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [flashId, setFlashId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedMessageId && messageRefs.current[highlightedMessageId]) {
      messageRefs.current[highlightedMessageId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setFlashId(highlightedMessageId);
      const timer = setTimeout(() => setFlashId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedMessageId]);

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full bg-background">
      {/* Channel header */}
      <div className="h-[49px] px-4 flex items-center justify-between border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-foreground-secondary" />
          <span className="font-bold text-[17px] text-foreground">{channel?.name || 'channel'}</span>
          <ChevronDown className="w-3.5 h-3.5 text-foreground-secondary" />
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground-secondary">
            <Users className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground-secondary">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground-secondary">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-3 relative">
        {/* Catch-Up Pill — shown when channel has many unreads */}
        {channel && channel.unread >= 25 && !showCatchUp && (
          <CatchUpPill unreadCount={channel.unread} onClick={onOpenCatchUp} />
        )}

        {/* Unread divider */}
        {channel && channel.unread > 0 && (
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-destructive/30" />
            <span className="text-destructive text-[12px] font-semibold">New since yesterday</span>
            <div className="flex-1 h-px bg-destructive/30" />
          </div>
        )}

        {/* Messages */}
        <div className="space-y-1">
          {messages.map(msg => (
            <div
              key={msg.id}
              ref={el => { messageRefs.current[msg.id] = el; }}
              className={`flex gap-3 px-2 py-1.5 rounded-md transition-colors hover:bg-muted/50 group ${
                flashId === msg.id ? 'message-highlight' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-slack-sidebar-accent text-slack-sidebar-active text-[13px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {msg.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[15px] text-foreground">{msg.user}</span>
                  <span className="text-[12px] text-foreground-secondary">{msg.time}</span>
                </div>
                <p className="text-[15px] text-foreground leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input */}
      <div className="px-5 pb-4 pt-1 shrink-0">
        <div className="border border-border rounded-lg p-2">
          <div className="h-9 flex items-center px-3 text-foreground-secondary text-[14px]">
            Message #{channel?.name || 'channel'}
          </div>
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-foreground-secondary transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-foreground-secondary transition-colors">
                <Smile className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-foreground-secondary transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-foreground-secondary transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelView;
