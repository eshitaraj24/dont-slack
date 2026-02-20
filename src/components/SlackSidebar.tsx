import { Hash, ChevronDown, MessageSquare, MoreHorizontal, Plus, Search, Bell, Pencil } from 'lucide-react';
import { channels } from '@/data/mockData';

interface SlackSidebarProps {
  activeChannel: string;
  onChannelSelect: (id: string) => void;
}

const SlackSidebar = ({ activeChannel, onChannelSelect }: SlackSidebarProps) => {
  return (
    <div className="w-[260px] bg-slack-sidebar flex flex-col h-full shrink-0">
      {/* Workspace header */}
      <div className="px-4 h-[49px] flex items-center justify-between border-b border-slack-sidebar-accent">
        <button className="flex items-center gap-1 text-slack-sidebar-active font-bold text-[17px] hover:opacity-80 transition-opacity">
          Acme Inc
          <ChevronDown className="w-4 h-4 opacity-70" />
        </button>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slack-sidebar-hover transition-colors text-slack-sidebar-text">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Nav items */}
      <div className="px-2 py-3 space-y-0.5">
        <SidebarItem icon={<MessageSquare className="w-4 h-4" />} label="Threads" />
        <SidebarItem icon={<Bell className="w-4 h-4" />} label="Activity" badge={3} />
        <SidebarItem icon={<MoreHorizontal className="w-4 h-4" />} label="More" />
      </div>

      {/* Channels */}
      <div className="px-2 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 py-1.5">
          <button className="flex items-center gap-1 text-slack-sidebar-text text-[13px] font-medium hover:text-slack-sidebar-active transition-colors">
            <ChevronDown className="w-3.5 h-3.5" />
            Channels
          </button>
          <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-slack-sidebar-hover text-slack-sidebar-text transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-0.5">
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-[14px] transition-colors ${
                activeChannel === channel.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-slack-sidebar-text hover:bg-slack-sidebar-hover'
              }`}
            >
              <Hash className="w-3.5 h-3.5 shrink-0 opacity-70" />
              <span className={`truncate ${channel.unread > 0 ? 'font-semibold' : ''}`}>
                {channel.name}
              </span>
              {channel.unread > 0 && (
                <span className="ml-auto bg-slack-sidebar-badge text-slack-sidebar-active text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {channel.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, badge }: { icon: React.ReactNode; label: string; badge?: number }) => (
  <button className="w-full flex items-center gap-2 px-2 py-1 rounded-md text-slack-sidebar-text text-[14px] hover:bg-slack-sidebar-hover transition-colors">
    {icon}
    <span>{label}</span>
    {badge && badge > 0 && (
      <span className="ml-auto bg-slack-sidebar-badge text-slack-sidebar-active text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
        {badge}
      </span>
    )}
  </button>
);

export default SlackSidebar;
