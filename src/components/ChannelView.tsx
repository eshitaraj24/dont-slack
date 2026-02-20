import { Hash, Search, Users, Bookmark, ChevronDown, Plus, Smile, Paperclip, Send, Sparkles } from 'lucide-react';
import { messages, channels, participants } from '@/data/mockData';
import { useRef, useEffect, useState } from 'react';
import slackScreenshot from '@/assets/slack-screenshot.jpg';

interface ChannelViewProps {
  channelId: string;
  onOpenCatchUp: () => void;
  showCatchUp: boolean;
  highlightedMessageId: string | null;
  composerText: string;
  onComposerChange: (text: string) => void;
}

const SlackAvatar = ({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) => (
  <div
    className="rounded-lg flex items-center justify-center shrink-0 font-bold text-white ring-1 ring-black/20"
    style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.36 }}
  >
    {initials}
  </div>
);

const AvatarStack = () => {
  const stackParticipants = participants.slice(0, 4);
  return (
    <div className="flex items-center -space-x-1.5">
      {stackParticipants.map((p, i) => (
        <div
          key={p.name}
          title={p.name}
          className="rounded-full flex items-center justify-center font-bold text-white ring-2 ring-[#1A1D21] shrink-0"
          style={{
            width: 22,
            height: 22,
            backgroundColor: p.avatarColor,
            fontSize: 8,
            zIndex: stackParticipants.length - i,
          }}
        >
          {p.avatar}
        </div>
      ))}
      <span className="ml-2 text-[12px] text-foreground-secondary font-medium pl-0.5">
        {participants.length}
      </span>
    </div>
  );
};

const ChannelView = ({ channelId, onOpenCatchUp, showCatchUp, highlightedMessageId, composerText, onComposerChange }: ChannelViewProps) => {
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
    <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
      {/* Slack screenshot as base layer */}
      <img
        src={slackScreenshot}
        alt="Slack channel background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.07] pointer-events-none select-none"
      />

      {/* Actual channel UI on top */}
      <div className="relative flex flex-col h-full bg-background/95">
        {/* Channel header */}
        <div className="h-[49px] px-4 flex items-center justify-between border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-foreground-secondary" />
            <span className="font-bold text-[17px] text-foreground">{channel?.name || 'channel'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-foreground-secondary" />
          </div>
          <div className="flex items-center gap-1">
            {/* Avatar stack + People icon */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors cursor-pointer">
              <AvatarStack />
              <Users className="w-4 h-4 text-foreground-secondary" />
            </div>
            <div className="w-px h-4 bg-border mx-0.5" />
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground-secondary">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-foreground-secondary">
              <Search className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border mx-0.5" />
            {/* Catch-Up toolbar button */}
            <button
              onClick={onOpenCatchUp}
              className={`flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-medium transition-colors ${
                showCatchUp
                  ? 'bg-primary/20 text-primary'
                  : 'text-foreground-secondary hover:bg-muted hover:text-foreground'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Catch Up</span>
              {(channel?.unread ?? 0) > 0 && (
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${showCatchUp ? 'bg-primary/30 text-primary' : 'bg-muted text-foreground-secondary'}`}>
                  {channel?.unread}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-5 py-3 relative">
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
                <SlackAvatar initials={msg.avatar} color={msg.avatarColor} size={36} />
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
        <div className="px-5 pb-4 pt-1 shrink-0 relative">
          <div className="border border-border rounded-lg bg-card">
            <textarea
              value={composerText}
              onChange={e => onComposerChange(e.target.value)}
              placeholder={`Message #${channel?.name || 'channel'}`}
              rows={composerText ? 2 : 1}
              className="w-full px-4 py-2.5 text-[14px] text-foreground bg-transparent resize-none outline-none placeholder:text-foreground-secondary leading-relaxed"
            />
            <div className="flex items-center justify-between px-2 pb-2">
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
              <button className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${composerText ? 'bg-primary text-primary-foreground' : 'text-foreground-secondary hover:bg-muted'}`}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelView;
