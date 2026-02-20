export interface SlackChannel {
  id: string;
  name: string;
  unread: number;
  isMuted?: boolean;
}

export interface SlackMessage {
  id: string;
  user: string;
  avatar: string;
  time: string;
  text: string;
  isHighlighted?: boolean;
}

export interface ImpactItem {
  id: string;
  type: 'mention' | 'assignment' | 'decision';
  text: string;
  sourceMessageId: string;
  timestamp: string;
}

export interface Decision {
  id: string;
  text: string;
  maker: string;
  timestamp: string;
  sourceMessageId: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  deadline?: string;
  isAssignedToUser: boolean;
  confirmed: boolean;
  sourceMessageId: string;
}

export interface Participant {
  name: string;
  role: string;
  avatar: string;
  isTopContributor?: boolean;
  messageCount: number;
}

export const channels: SlackChannel[] = [
  { id: '1', name: 'general', unread: 3 },
  { id: '2', name: 'product-launch', unread: 47 },
  { id: '3', name: 'engineering', unread: 12 },
  { id: '4', name: 'design-system', unread: 0 },
  { id: '5', name: 'random', unread: 8 },
  { id: '6', name: 'standup', unread: 0, isMuted: true },
];

export const messages: SlackMessage[] = [
  { id: 'msg-1', user: 'Sarah Chen', avatar: 'SC', time: '9:14 AM', text: 'Good morning team! Just pushed the updated wireframes to Figma.' },
  { id: 'msg-2', user: 'Marcus Johnson', avatar: 'MJ', time: '9:22 AM', text: 'Reviewed them — the navigation changes look solid. One concern about the mobile breakpoint at 768px.' },
  { id: 'msg-3', user: 'Priya Sharma', avatar: 'PS', time: '9:31 AM', text: '@you We need your sign-off on the API schema changes before EOD. The new endpoints affect the dashboard module.' },
  { id: 'msg-4', user: 'Alex Rivera', avatar: 'AR', time: '9:45 AM', text: 'Decision: We\'re going with Option B for the pricing page layout. Marketing approved it yesterday.' },
  { id: 'msg-5', user: 'Sarah Chen', avatar: 'SC', time: '9:52 AM', text: 'Also — launch date confirmed for March 15. All feature PRs need to be merged by March 10.' },
  { id: 'msg-6', user: 'James Liu', avatar: 'JL', time: '10:03 AM', text: 'The CI pipeline is green again. Fixed the flaky test in the auth module.' },
  { id: 'msg-7', user: 'Marcus Johnson', avatar: 'MJ', time: '10:15 AM', text: '@you Assigning the docs update for the new API to you. Can you have a draft by Thursday?' },
  { id: 'msg-8', user: 'Priya Sharma', avatar: 'PS', time: '10:28 AM', text: 'Decision: Switching from REST to GraphQL for the reporting endpoints. Performance benchmarks showed 40% improvement.' },
  { id: 'msg-9', user: 'Alex Rivera', avatar: 'AR', time: '10:41 AM', text: 'Updated the component library — new button variants are live in Storybook.' },
  { id: 'msg-10', user: 'Sarah Chen', avatar: 'SC', time: '10:55 AM', text: 'Reminder: Design review at 2 PM today. Please have your sections ready.' },
  { id: 'msg-11', user: 'James Liu', avatar: 'JL', time: '11:08 AM', text: 'Performance audit results are in. Main bundle dropped from 1.2MB to 890KB after the tree-shaking fix.' },
  { id: 'msg-12', user: 'Marcus Johnson', avatar: 'MJ', time: '11:20 AM', text: 'Great work James. @you can you review the bundle analysis report when you get a chance?' },
];

export const impactItems: ImpactItem[] = [
  { id: 'imp-1', type: 'mention', text: 'Priya requested your sign-off on API schema changes before EOD', sourceMessageId: 'msg-3', timestamp: '9:31 AM' },
  { id: 'imp-2', type: 'assignment', text: 'Marcus assigned you the docs update for the new API — draft due Thursday', sourceMessageId: 'msg-7', timestamp: '10:15 AM' },
  { id: 'imp-3', type: 'decision', text: 'Reporting endpoints switching from REST to GraphQL — affects dashboard module', sourceMessageId: 'msg-8', timestamp: '10:28 AM' },
  { id: 'imp-4', type: 'mention', text: 'Marcus asked you to review the bundle analysis report', sourceMessageId: 'msg-12', timestamp: '11:20 AM' },
];

export const decisions: Decision[] = [
  { id: 'dec-1', text: 'Going with Option B for the pricing page layout', maker: 'Alex Rivera', timestamp: '9:45 AM', sourceMessageId: 'msg-4' },
  { id: 'dec-2', text: 'Launch date confirmed for March 15 — PRs merged by March 10', maker: 'Sarah Chen', timestamp: '9:52 AM', sourceMessageId: 'msg-5' },
  { id: 'dec-3', text: 'Switching from REST to GraphQL for reporting endpoints', maker: 'Priya Sharma', timestamp: '10:28 AM', sourceMessageId: 'msg-8' },
];

export const actionItems: ActionItem[] = [
  { id: 'act-1', task: 'Sign off on API schema changes', assignedTo: 'You', deadline: 'Today EOD', isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-3' },
  { id: 'act-2', task: 'Write draft docs for new API', assignedTo: 'You', deadline: 'Thursday', isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-7' },
  { id: 'act-3', task: 'Review bundle analysis report', assignedTo: 'You', isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-12' },
  { id: 'act-4', task: 'Merge all feature PRs', assignedTo: 'All engineers', deadline: 'March 10', isAssignedToUser: false, confirmed: false, sourceMessageId: 'msg-5' },
];

export const conversationSummary = `The team focused on finalizing the product launch for March 15. Wireframes were updated and reviewed with feedback on mobile breakpoints. Two key architectural decisions were made: adopting Option B for the pricing page and migrating reporting endpoints from REST to GraphQL. The CI pipeline was stabilized, and bundle size was reduced by 26%. Several tasks were assigned ahead of the launch deadline.`;

export const participants: Participant[] = [
  { name: 'Sarah Chen', role: 'Product Lead', avatar: 'SC', isTopContributor: true, messageCount: 3 },
  { name: 'Marcus Johnson', role: 'Engineering Manager', avatar: 'MJ', messageCount: 3 },
  { name: 'Priya Sharma', role: 'Backend Engineer', avatar: 'PS', messageCount: 2 },
  { name: 'Alex Rivera', role: 'Design Lead', avatar: 'AR', messageCount: 2 },
  { name: 'James Liu', role: 'DevOps Engineer', avatar: 'JL', messageCount: 2 },
];
