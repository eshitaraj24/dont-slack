// ─── Shared types ────────────────────────────────────────────────────────────

export interface SlackChannel {
  id: string;
  name: string;
  unread: number;
  isMuted?: boolean;
}

export interface SlackReaction {
  emoji: string;
  count: number;
}

export interface SlackThread {
  count: number;
  lastUser: string;
  lastUserColor: string;
  lastUserAvatar: string;
  lastTime: string;
}

export interface SlackMessage {
  id: string;
  user: string;
  avatar: string;
  avatarColor: string;
  time: string;
  text: string;
  isHighlighted?: boolean;
  codeBlock?: string;
  codeLanguage?: string;
  filePreview?: { name: string; type: string; size: string };
  reactions?: SlackReaction[];
  thread?: SlackThread;
}

export interface ImpactItem {
  id: string;
  type: 'mention' | 'assignment' | 'decision';
  text: string;
  sourceMessageId: string;
  timestamp: string;
  personName: string;
  personAvatar: string;
  personAvatarColor: string;
  suggestedReplies: string[];
}

export interface Decision {
  id: string;
  text: string;
  maker: string;
  makerAvatar: string;
  makerAvatarColor: string;
  timestamp: string;
  sourceMessageId: string;
  suggestedReplies: string[];
}

export interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  assigneeAvatar: string;
  assigneeAvatarColor: string;
  deadline?: string;
  isAssignedToUser: boolean;
  confirmed: boolean;
  sourceMessageId: string;
  suggestedReplies: string[];
}

export interface Participant {
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  isTopContributor?: boolean;
  messageCount: number;
}

// ─── Channels ────────────────────────────────────────────────────────────────

export const channels: SlackChannel[] = [
  { id: '1', name: 'general', unread: 3 },
  { id: '2', name: 'product-launch', unread: 47 },
  { id: '3', name: 'engineering', unread: 12 },
  { id: '4', name: 'design-system', unread: 0 },
  { id: '5', name: 'random', unread: 8 },
  { id: '6', name: 'standup', unread: 0, isMuted: true },
];

// ─── Per-channel participants ─────────────────────────────────────────────────

export const channelParticipants: Record<string, Participant[]> = {
  '1': [
    { name: 'Sarah Chen', role: 'CEO', avatar: 'SC', avatarColor: '#E91E8C', isTopContributor: true, messageCount: 5 },
    { name: 'Marcus Johnson', role: 'Eng Manager', avatar: 'MJ', avatarColor: '#2BAC76', messageCount: 4 },
    { name: 'Dani Park', role: 'Head of Ops', avatar: 'DP', avatarColor: '#FF9800', messageCount: 3 },
    { name: 'Jordan Wei', role: 'Finance Lead', avatar: 'JW', avatarColor: '#607D8B', messageCount: 2 },
    { name: 'Kenji Tanaka', role: 'Backend Eng', avatar: 'KT', avatarColor: '#673AB7', messageCount: 2 },
  ],
  '2': [
    { name: 'Sarah Chen', role: 'Product Lead', avatar: 'SC', avatarColor: '#E91E8C', isTopContributor: true, messageCount: 3 },
    { name: 'Marcus Johnson', role: 'Engineering Manager', avatar: 'MJ', avatarColor: '#2BAC76', messageCount: 3 },
    { name: 'Priya Sharma', role: 'Backend Engineer', avatar: 'PS', avatarColor: '#1D9BD1', messageCount: 2 },
    { name: 'Alex Rivera', role: 'Design Lead', avatar: 'AR', avatarColor: '#E8912D', messageCount: 2 },
    { name: 'James Liu', role: 'DevOps Engineer', avatar: 'JL', avatarColor: '#9C27B0', messageCount: 2 },
  ],
  '3': [
    { name: 'James Liu', role: 'DevOps Engineer', avatar: 'JL', avatarColor: '#9C27B0', isTopContributor: true, messageCount: 6 },
    { name: 'Priya Sharma', role: 'Backend Engineer', avatar: 'PS', avatarColor: '#1D9BD1', messageCount: 5 },
    { name: 'Kenji Tanaka', role: 'Backend Engineer', avatar: 'KT', avatarColor: '#673AB7', messageCount: 4 },
    { name: 'Tom Reeves', role: 'Frontend Engineer', avatar: 'TR', avatarColor: '#00897B', messageCount: 4 },
    { name: 'Nina Okafor', role: 'SRE', avatar: 'NO', avatarColor: '#FF5252', messageCount: 3 },
    { name: 'Leila Nazari', role: 'Backend Engineer', avatar: 'LN', avatarColor: '#F06292', messageCount: 2 },
  ],
  '4': [
    { name: 'Alex Rivera', role: 'Design Lead', avatar: 'AR', avatarColor: '#E8912D', isTopContributor: true, messageCount: 7 },
    { name: 'Maya Torres', role: 'Product Designer', avatar: 'MT', avatarColor: '#26A69A', messageCount: 5 },
    { name: 'Chris Vogel', role: 'Design Engineer', avatar: 'CV', avatarColor: '#5C6BC0', messageCount: 4 },
    { name: 'Sam Bhatt', role: 'Product Designer', avatar: 'SB', avatarColor: '#EF6C00', messageCount: 3 },
    { name: 'Sarah Chen', role: 'CEO', avatar: 'SC', avatarColor: '#E91E8C', messageCount: 1 },
  ],
  '5': [
    { name: 'Marcus Johnson', role: 'Eng Manager', avatar: 'MJ', avatarColor: '#2BAC76', messageCount: 4 },
    { name: 'Dani Park', role: 'Head of Ops', avatar: 'DP', avatarColor: '#FF9800', messageCount: 4 },
    { name: 'Tom Reeves', role: 'Frontend Engineer', avatar: 'TR', avatarColor: '#00897B', messageCount: 3 },
    { name: 'Maya Torres', role: 'Product Designer', avatar: 'MT', avatarColor: '#26A69A', messageCount: 3 },
    { name: 'Kenji Tanaka', role: 'Backend Eng', avatar: 'KT', avatarColor: '#673AB7', messageCount: 2 },
  ],
  '6': [
    { name: 'Sarah Chen', role: 'CEO', avatar: 'SC', avatarColor: '#E91E8C', messageCount: 2 },
    { name: 'Marcus Johnson', role: 'Eng Manager', avatar: 'MJ', avatarColor: '#2BAC76', messageCount: 2 },
    { name: 'James Liu', role: 'DevOps Engineer', avatar: 'JL', avatarColor: '#9C27B0', messageCount: 2 },
    { name: 'Priya Sharma', role: 'Backend Engineer', avatar: 'PS', avatarColor: '#1D9BD1', messageCount: 2 },
    { name: 'Alex Rivera', role: 'Design Lead', avatar: 'AR', avatarColor: '#E8912D', messageCount: 2 },
    { name: 'Tom Reeves', role: 'Frontend Engineer', avatar: 'TR', avatarColor: '#00897B', messageCount: 2 },
  ],
};

// ─── Per-channel unread start message IDs ────────────────────────────────────

export const channelUnreadStart: Record<string, string | null> = {
  '1': 'gen-10',
  '2': 'msg-28',
  '3': 'eng-14',
  '4': null,   // 0 unread
  '5': 'rnd-9',
  '6': null,   // muted, 0 unread
};

// ─── #general messages ────────────────────────────────────────────────────────

const generalMessages: SlackMessage[] = [
  { id: 'gen-1', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '8:31 AM', text: 'Morning Nebula Labs 👋 Quick company update: we closed our Series A extension last Friday. $8M additional funding secured. Huge thanks to everyone for the hustle this quarter.' , reactions: [{ emoji: '🎉', count: 18 }, { emoji: '🚀', count: 12 }, { emoji: '🙌', count: 9 }], thread: { count: 14, lastUser: 'Dani Park', lastUserColor: '#FF9800', lastUserAvatar: 'DP', lastTime: '9:04 AM' } },
  { id: 'gen-2', user: 'Dani Park', avatar: 'DP', avatarColor: '#FF9800', time: '8:35 AM', text: 'Massive news Sarah! This is going on the wall in the office 💪' },
  { id: 'gen-3', user: 'Jordan Wei', avatar: 'JW', avatarColor: '#607D8B', time: '8:38 AM', text: 'Runway update coming in the all-hands on Thursday. Short version: we\'re well into 2027 territory now. Breathe easy, everyone.' , reactions: [{ emoji: '😮‍💨', count: 7 }] },
  { id: 'gen-4', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '8:44 AM', text: 'Incredible. Engineering is heads down on the March 15 launch — this funding news is fantastic fuel. Let\'s ship something worthy of it.' , reactions: [{ emoji: '💪', count: 6 }] },
  { id: 'gen-5', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '8:51 AM', text: 'Does this mean we\'re finally getting the espresso machine for the kitchen? Asking for a friend ☕😂', reactions: [{ emoji: '😂', count: 11 }], thread: { count: 5, lastUser: 'Sarah Chen', lastUserColor: '#E91E8C', lastUserAvatar: 'SC', lastTime: '9:12 AM' } },
  { id: 'gen-6', user: 'Dani Park', avatar: 'DP', avatarColor: '#FF9800', time: '9:01 AM', text: 'Reminder: Town Hall is Thursday at 3 PM PST. Sarah and Jordan will cover funding, roadmap, and headcount plans. Please add questions to the shared doc beforehand.', filePreview: { name: 'Q1-townhall-agenda.docx', type: 'Word', size: '48 KB' }, reactions: [{ emoji: '📌', count: 5 }] },
  { id: 'gen-7', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '9:14 AM', text: 'One more thing — we\'re opening 4 new roles this week: Senior BE Eng, Staff FE Eng, Head of Marketing, and a Product Manager. Referrals welcome. Hiring deck attached.', filePreview: { name: 'nebula-labs-hiring-2025.pdf', type: 'PDF', size: '2.1 MB' }, reactions: [{ emoji: '🙋', count: 4 }] },
  { id: 'gen-8', user: 'Jordan Wei', avatar: 'JW', avatarColor: '#607D8B', time: '9:29 AM', text: 'Benefits portal is being upgraded next week — new dental plan, 401k matching increased to 5%, and we\'re adding mental health days (3 per year, no approval needed).' , reactions: [{ emoji: '❤️', count: 14 }, { emoji: '🙏', count: 8 }] },
  { id: 'gen-9', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '9:44 AM', text: 'The engineering team lunch is on for Friday noon at the Cinnamon Room — everyone\'s welcome, not just eng. Come celebrate the funding close with us.' , reactions: [{ emoji: '🍜', count: 9 }] },
  // ── unread starts here (gen-10) ──────────────────────────────────────────
  { id: 'gen-10', user: 'Dani Park', avatar: 'DP', avatarColor: '#FF9800', time: '10:03 AM', text: 'New office wifi network is up: Nebula-HQ-5G. Password in 1Password under "Office". The old network (NebulaMain) stays live until end of month.' },
  { id: 'gen-11', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '10:18 AM', text: 'Connected instantly. Speeds are 🔥 Finally no more video call pixelation in the back conference room.' , reactions: [{ emoji: '🙌', count: 5 }] },
  { id: 'gen-12', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '11:02 AM', text: 'Heads up: we\'re migrating Slack to SSO next Monday. You\'ll get a re-auth prompt. IT has the details — see pinned post.', reactions: [{ emoji: '👀', count: 4 }] },
];

// ─── #product-launch messages ────────────────────────────────────────────────

const productLaunchMessages: SlackMessage[] = [
  { id: 'msg-1', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '8:02 AM', text: 'Good morning everyone 👋 Big day — kicking off final sprint for the March 15 launch. Let\'s make it count.', reactions: [{ emoji: '🚀', count: 6 }, { emoji: '💪', count: 4 }] },
  { id: 'msg-2', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '8:07 AM', text: 'Morning! Already had two coffees. Let\'s ship. ☕☕' },
  { id: 'msg-3', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '8:09 AM', text: 'FYI — prod deploy from last night is stable. No regression alerts. All green.', reactions: [{ emoji: '✅', count: 5 }] },
  { id: 'msg-4', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '8:14 AM', text: 'Nice. I\'ll pick up the GraphQL migration for reporting endpoints this morning. Was blocked on auth yesterday but that\'s resolved now.' },
  { id: 'msg-5', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '8:18 AM', text: 'Updated all icon sizes in the design system — Figma tokens are synced. Check the "v2.4 – Launch" page.', reactions: [{ emoji: '🎨', count: 3 }], thread: { count: 4, lastUser: 'Sarah Chen', lastUserColor: '#E91E8C', lastUserAvatar: 'SC', lastTime: '8:42 AM' } },
  { id: 'msg-6', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '8:23 AM', text: 'Quick heads up: the analytics event for "Onboarding Completed" was firing twice on mobile. Fixed in PR #412 — needs a review from someone on infra.' },
  { id: 'msg-7', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '8:31 AM', text: 'On it @Nina. Will review #412 now.', reactions: [{ emoji: '👍', count: 2 }] },
  { id: 'msg-8', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '8:45 AM', text: 'Standup notes from yesterday are in Notion if anyone needs context. Link in the topic.', thread: { count: 2, lastUser: 'Alex Rivera', lastUserColor: '#E8912D', lastUserAvatar: 'AR', lastTime: '9:01 AM' } },
  { id: 'msg-9', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '9:03 AM', text: 'Found the root cause of the N+1 query issue on the dashboard. The `getUserProjects` resolver was fetching nested org data on every row. Here\'s the fix:',
    codeBlock: `// Before (N+1)
async getUserProjects(userId: string) {
  const projects = await db.projects.findMany({ where: { userId } });
  return projects.map(p => ({ ...p, org: await db.orgs.findOne(p.orgId) }));
}

// After (batched)
async getUserProjects(userId: string) {
  return db.projects.findMany({
    where: { userId },
    include: { org: true },
  });
}`,
    codeLanguage: 'typescript', reactions: [{ emoji: '🔥', count: 7 }, { emoji: '👏', count: 5 }], thread: { count: 8, lastUser: 'James Liu', lastUserColor: '#9C27B0', lastUserAvatar: 'JL', lastTime: '9:44 AM' } },
  { id: 'msg-10', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '9:14 AM', text: 'That\'s huge. Dashboard was taking 4.2s on average. Let me run load tests on staging after this merges.' },
  { id: 'msg-11', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '9:22 AM', text: 'Reviewed the new wireframes in Figma — navigation changes look solid. One concern: mobile breakpoint at 768px feels cramped with the new sidebar. Can we test at 375px too?' },
  { id: 'msg-12', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '9:28 AM', text: 'Good call Marcus. I\'ve already added 375 and 390 breakpoints. Sharing updated screens now.', filePreview: { name: 'mobile-breakpoints-v3.fig', type: 'Figma', size: '4.2 MB' }, reactions: [{ emoji: '🙌', count: 4 }] },
  { id: 'msg-13', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '9:31 AM', text: '@you We need your sign-off on the API schema changes before EOD. The new endpoints affect the dashboard module.', reactions: [{ emoji: '👀', count: 3 }] },
  { id: 'msg-14', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '9:35 AM', text: 'Reminder that the prod read replica is getting replaced at 11 PM tonight. 10-min read-only window. Heads up for anyone with cron jobs.' },
  { id: 'msg-15', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '9:38 AM', text: 'Pausing the nightly report cron at 10:45 PM, resuming at midnight. Done ✅', reactions: [{ emoji: '✅', count: 3 }] },
  { id: 'msg-16', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '9:45 AM', text: 'Decision: We\'re going with Option B for the pricing page layout. Marketing signed off yesterday afternoon. Here\'s the final comp:', filePreview: { name: 'pricing-page-option-B-final.png', type: 'Image', size: '1.8 MB' }, reactions: [{ emoji: '🎉', count: 8 }, { emoji: '✅', count: 6 }], thread: { count: 11, lastUser: 'Marcus Johnson', lastUserColor: '#2BAC76', lastUserAvatar: 'MJ', lastTime: '10:22 AM' } },
  { id: 'msg-17', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '9:52 AM', text: 'Launch date confirmed for March 15. All feature PRs must be merged by March 10 COB. No exceptions — that gives QA 5 full days.' },
  { id: 'msg-18', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '9:55 AM', text: '5 days for QA feels tight. Are we bringing in the contractor team for regression?' },
  { id: 'msg-19', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '9:58 AM', text: 'Yes, Lena\'s team is on standby. They start March 11 morning.', reactions: [{ emoji: '👍', count: 4 }] },
  { id: 'msg-20', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '10:04 AM', text: 'My reporting GraphQL endpoints are passing schema validation. Switching to integration tests now. ETA 2 hours for a PR.' },
  { id: 'msg-21', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '10:08 AM', text: 'CI pipeline is green again. Fixed the flaky test in the auth module — was a timing issue with the token refresh mock.', reactions: [{ emoji: '🟢', count: 4 }, { emoji: '💯', count: 2 }] },
  { id: 'msg-22', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '10:12 AM', text: 'Anyone know why Sentry is showing a spike in `TypeError: Cannot read properties of undefined` in the billing module? Started around 9:30 AM.' },
  { id: 'msg-23', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '10:15 AM', text: '@you Assigning the docs update for the new API to you. Can you have a draft by Thursday?', reactions: [{ emoji: '🙏', count: 1 }] },
  { id: 'msg-24', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '10:19 AM', text: 'That Sentry error is mine — I accidentally left a null check out of the billing context provider. Hotfix deploying now.', thread: { count: 3, lastUser: 'Nina Okafor', lastUserColor: '#FF5252', lastUserAvatar: 'NO', lastTime: '10:31 AM' } },
  { id: 'msg-25', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '10:24 AM', text: 'Design system components updated — new button variants, updated spacing tokens, and fixed the dark mode color for disabled states. Storybook is live.', filePreview: { name: 'storybook-changelog.md', type: 'Markdown', size: '12 KB' }, reactions: [{ emoji: '📚', count: 3 }] },
  { id: 'msg-26', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '10:28 AM', text: 'This query plan diff shows the N+1 fix impact:',
    codeBlock: `-- Before: 312 sequential scans
Seq Scan on projects (cost=0.00..4.21 rows=1)
  Filter: (user_id = $1)
  -> Seq Scan on orgs (cost=0.00..1.05 rows=1)  [x312]

-- After: 1 join
Hash Join (cost=1.09..5.43 rows=1)
  Hash Cond: (projects.org_id = orgs.id)`,
    codeLanguage: 'sql', reactions: [{ emoji: '📊', count: 5 }] },
  { id: 'msg-27', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '10:28 AM', text: 'Decision: Switching from REST to GraphQL for the reporting endpoints. Performance benchmarks showed 40% improvement in p95 latency.', reactions: [{ emoji: '📈', count: 5 }, { emoji: '🚀', count: 3 }], thread: { count: 6, lastUser: 'James Liu', lastUserColor: '#9C27B0', lastUserAvatar: 'JL', lastTime: '11:02 AM' } },
  // ── unread divider ──────────────────────────────────────────────────────────
  { id: 'msg-28', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '10:55 AM', text: 'Reminder: Design review at 2 PM today. Everyone should have their section ready. Agenda in Notion.', reactions: [{ emoji: '📅', count: 6 }] },
  { id: 'msg-29', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '10:58 AM', text: 'On it. I\'ll have the pricing page + onboarding flow ready to walk through.', reactions: [{ emoji: '✅', count: 2 }] },
  { id: 'msg-30', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '11:02 AM', text: 'Will the review be recorded for async folks?' },
  { id: 'msg-31', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '11:04 AM', text: 'Yes, Loom recording + summary notes in Notion within 1 hour of meeting end.', reactions: [{ emoji: '🙌', count: 4 }] },
  { id: 'msg-32', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '11:08 AM', text: 'Performance audit is done. Main bundle dropped from 1.2MB to 890KB after tree-shaking + lazy loading routes. 26% reduction 🎉', reactions: [{ emoji: '🎉', count: 9 }, { emoji: '🏆', count: 4 }, { emoji: '💪', count: 3 }], thread: { count: 7, lastUser: 'Sarah Chen', lastUserColor: '#E91E8C', lastUserAvatar: 'SC', lastTime: '11:34 AM' } },
  { id: 'msg-33', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '11:15 AM', text: 'That\'s massive James. Core Web Vitals should improve significantly. @you can you review the bundle analysis report when you get a chance?' },
  { id: 'msg-34', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '11:22 AM', text: 'GraphQL migration PR is up: #418. 847 lines changed. Has unit tests and updated schema docs. Requesting 2 reviewers.', filePreview: { name: 'graphql-migration-schema.graphql', type: 'GraphQL', size: '32 KB' }, reactions: [{ emoji: '👀', count: 5 }], thread: { count: 4, lastUser: 'Marcus Johnson', lastUserColor: '#2BAC76', lastUserAvatar: 'MJ', lastTime: '11:55 AM' } },
  { id: 'msg-35', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '11:29 AM', text: 'Flagging a UX issue in the onboarding flow — the "Skip for now" CTA is below the fold on iPhone SE. Screenshots attached.', filePreview: { name: 'onboarding-iphoneSE-bug.png', type: 'Image', size: '890 KB' }, reactions: [{ emoji: '😬', count: 4 }, { emoji: '🐛', count: 2 }] },
  { id: 'msg-36', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '11:33 AM', text: 'Critical — that needs to be fixed before March 10. Alex can you file a ticket and assign it?' },
  { id: 'msg-37', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '11:35 AM', text: 'Filed as PROD-2241. Assigning to myself, targeting fix by tomorrow EOD.', reactions: [{ emoji: '✅', count: 3 }] },
  { id: 'msg-38', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '11:41 AM', text: 'Hotfix is deployed. Sentry errors dropped to zero in billing module. 🟢', reactions: [{ emoji: '🙌', count: 5 }, { emoji: '✅', count: 4 }] },
  { id: 'msg-39', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '11:48 AM', text: 'Quick question — are we feature-flagging the new reporting endpoints or shipping them fully enabled on launch?', thread: { count: 5, lastUser: 'Priya Sharma', lastUserColor: '#1D9BD1', lastUserAvatar: 'PS', lastTime: '12:15 PM' } },
  { id: 'msg-40', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '11:52 AM', text: 'Fully enabled. They\'re additive — old REST endpoints stay alive for 2 more weeks as fallback.', reactions: [{ emoji: '👍', count: 5 }] },
  { id: 'msg-41', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '11:58 AM', text: 'Docker image sizes after optimization:',
    codeBlock: `BEFORE:
nebula-api        2.1GB
nebula-worker     1.8GB
nebula-frontend   890MB

AFTER:
nebula-api        680MB  (-68%)
nebula-worker     540MB  (-70%)
nebula-frontend   220MB  (-75%)`,
    codeLanguage: 'bash', reactions: [{ emoji: '🐋', count: 6 }, { emoji: '🔥', count: 5 }] },
  { id: 'msg-42', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '12:04 PM', text: 'Incredible week team. This is exactly the momentum we needed heading into launch. 🚀 Keep it up.' },
  { id: 'msg-43', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '12:11 PM', text: 'New fonts are loaded via `font-display: swap` now — no more layout shift on first paint. Lighthouse score went from 71 → 94 on mobile.', reactions: [{ emoji: '🏎️', count: 7 }, { emoji: '💯', count: 4 }] },
  { id: 'msg-44', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '12:19 PM', text: 'Sync with legal is done — ToS and privacy policy are updated for the new data retention rules. Legal approved the wording this morning.' },
  { id: 'msg-45', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '12:26 PM', text: 'Setting up PagerDuty rotation for launch week. Who\'s on call March 14–16? Need 3 people willing to be primary/secondary/tertiary.', reactions: [{ emoji: '🙋', count: 2 }] },
  { id: 'msg-46', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '12:30 PM', text: 'I\'ll take primary March 14.' },
  { id: 'msg-47', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '12:32 PM', text: 'Secondary March 14-15 works for me.' },
  { id: 'msg-48', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '12:35 PM', text: 'I can do tertiary all 3 days.' },
  { id: 'msg-49', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '12:37 PM', text: 'Perfect. Rotation is set up. You\'ll get PagerDuty invites shortly.', reactions: [{ emoji: '🙏', count: 3 }] },
  { id: 'msg-50', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '12:45 PM', text: 'Feature freeze checklist is in Notion. Please mark your items as done by March 8 EOD.', filePreview: { name: 'feature-freeze-checklist.md', type: 'Markdown', size: '8 KB' }, reactions: [{ emoji: '📋', count: 5 }] },
  { id: 'msg-51', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '1:03 PM', text: 'Design tokens are exported and the iOS/Android handoff package is ready. Zeplin link pinned in topic.' },
  { id: 'msg-52', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '1:18 PM', text: 'Staging env is synced with prod schema. Safe to run full regression now.', reactions: [{ emoji: '✅', count: 4 }] },
  { id: 'msg-53', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '1:34 PM', text: 'PR #418 has 2/2 approvals. Merging into `main` now.', reactions: [{ emoji: '🎉', count: 6 }, { emoji: '🚀', count: 4 }] },
  { id: 'msg-54', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '1:42 PM', text: 'Random: the #nebula-labs-social channel hit 200 members. The company has officially scaled past "recognise everyone in the office" stage 😅', reactions: [{ emoji: '😂', count: 9 }, { emoji: '🎂', count: 5 }] },
  { id: 'msg-55', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '1:50 PM', text: 'Monitoring dashboard for the new reporting endpoints:',
    codeBlock: `Endpoint         | p50    | p95    | p99    | Errors
-----------------+--------+--------+--------+-------
/api/gql/report  | 42ms   | 118ms  | 201ms  | 0.00%
/api/gql/metrics | 38ms   | 99ms   | 180ms  | 0.01%
/api/rest/report | 180ms  | 612ms  | 1.4s   | 0.03%  [deprecated]`,
    codeLanguage: 'text', reactions: [{ emoji: '📊', count: 6 }] },
  { id: 'msg-56', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '2:01 PM', text: 'Design review starting in Zoom. Link in the calendar invite. Come with questions!' },
  { id: 'msg-57', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '2:03 PM', text: 'In the call. Sharing screen now.' },
  { id: 'msg-58', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '2:04 PM', text: 'Joining in 2 mins — on another call' },
  { id: 'msg-59', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '2:58 PM', text: 'Load tests complete on staging. The batched query fix cut dashboard load time from 4.2s → 0.9s under 500 concurrent users.', reactions: [{ emoji: '🤯', count: 8 }, { emoji: '🔥', count: 7 }, { emoji: '💪', count: 4 }], thread: { count: 9, lastUser: 'Priya Sharma', lastUserColor: '#1D9BD1', lastUserAvatar: 'PS', lastTime: '3:22 PM' } },
  { id: 'msg-60', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '3:11 PM', text: 'That\'s a 4.7x improvement. Shipping this.' },
  { id: 'msg-61', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '3:18 PM', text: 'Error budget for this sprint is at 94% — we\'re in great shape. Haven\'t burned this little budget in 6 months.', reactions: [{ emoji: '💚', count: 6 }] },
  { id: 'msg-62', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '3:29 PM', text: 'Export of final design system to Figma complete. Version 2.4 is locked. Do not make any more visual changes after today without PM sign-off.' },
  { id: 'msg-63', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '3:41 PM', text: 'Confirmed. Design system v2.4 is frozen. Changes go through the change request process from now on.', reactions: [{ emoji: '🔒', count: 7 }] },
  { id: 'msg-64', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '3:55 PM', text: 'EOD engineering update: 11 PRs merged today, 3 open (non-blocking), CI green, bundle size -26%, staging healthy. Good day team. 💪', reactions: [{ emoji: '🔥', count: 8 }, { emoji: '🙌', count: 6 }, { emoji: '💯', count: 5 }] },
];

// ─── #engineering messages ────────────────────────────────────────────────────

const engineeringMessages: SlackMessage[] = [
  { id: 'eng-1', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '8:14 AM', text: 'k8s rolling update is done. All pods healthy, no evictions. HPA scaled down from 12 → 6 replicas overnight as expected.', reactions: [{ emoji: '✅', count: 5 }] },
  { id: 'eng-2', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '8:22 AM', text: 'Pagerduty fired at 3:42 AM for a latency spike on `/api/v2/search`. Turned out to be an ES index rebuild — auto-resolved. Adding a suppress rule for scheduled rebuilds.' },
  { id: 'eng-3', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '8:29 AM', text: 'Working on the rate limiter for public API. Here\'s the sliding window impl:',
    codeBlock: `class SlidingWindowRateLimiter {
  constructor(private redis: Redis, private limit: number, private windowMs: number) {}

  async isAllowed(key: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const pipe = this.redis.pipeline();
    pipe.zremrangebyscore(key, 0, windowStart);
    pipe.zadd(key, now, \`\${now}-\${Math.random()}\`);
    pipe.zcard(key);
    pipe.expire(key, Math.ceil(this.windowMs / 1000));
    const results = await pipe.exec();
    const count = results?.[2]?.[1] as number;
    return count <= this.limit;
  }
}`,
    codeLanguage: 'typescript', reactions: [{ emoji: '🔥', count: 6 }, { emoji: '👀', count: 4 }], thread: { count: 7, lastUser: 'Priya Sharma', lastUserColor: '#1D9BD1', lastUserAvatar: 'PS', lastTime: '9:11 AM' } },
  { id: 'eng-4', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '8:41 AM', text: 'Love it. Should we use Lua scripting for atomicity, or is the pipeline approach safe enough with the current Redis cluster config?' },
  { id: 'eng-5', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '8:46 AM', text: 'Pipeline is fine for our consistency requirements. Lua adds latency overhead that\'s not worth it at our scale yet.' },
  { id: 'eng-6', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '8:53 AM', text: 'React Query v5 migration is done. Removed 2,400 lines of manual fetch logic. All existing tests passing.', reactions: [{ emoji: '🎉', count: 8 }, { emoji: '💪', count: 5 }] },
  { id: 'eng-7', user: 'Leila Nazari', avatar: 'LN', avatarColor: '#F06292', time: '9:02 AM', text: 'Opened RFC for async job queue architecture. We\'re outgrowing BullMQ for the heavy report generation jobs. Proposing Temporal for durable execution. Please leave feedback before Friday.', filePreview: { name: 'RFC-004-temporal-job-queue.md', type: 'Markdown', size: '28 KB' }, reactions: [{ emoji: '👀', count: 6 }], thread: { count: 9, lastUser: 'James Liu', lastUserColor: '#9C27B0', lastUserAvatar: 'JL', lastTime: '10:02 AM' } },
  { id: 'eng-8', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '9:17 AM', text: 'Strong +1 on Temporal. We hit BullMQ\'s retry limits twice last month on the export pipeline. The durability story alone is worth the migration cost.' },
  { id: 'eng-9', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '9:28 AM', text: 'Postgres VACUUM ran on the events table. Bloat was at 38%. Down to 4% now. Query times on that table dropped noticeably.', reactions: [{ emoji: '🧹', count: 4 }] },
  { id: 'eng-10', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '9:41 AM', text: 'Quick frontend perf note: our Largest Contentful Paint was tanking on the Reports page because we were loading the full chart library eagerly. Lazy-loaded it behind a dynamic import.',
    codeBlock: `// Before
import { BarChart, LineChart, PieChart } from 'recharts';

// After
const BarChart = lazy(() => import('recharts').then(m => ({ default: m.BarChart })));
const LineChart = lazy(() => import('recharts').then(m => ({ default: m.LineChart })));`,
    codeLanguage: 'typescript', reactions: [{ emoji: '🏎️', count: 5 }] },
  { id: 'eng-11', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '9:52 AM', text: 'LCP improvement on Reports page?'},
  { id: 'eng-12', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '9:54 AM', text: '4.8s → 1.9s on slow 3G sim. Real user data pending.' , reactions: [{ emoji: '🤯', count: 7 }] },
  { id: 'eng-13', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '10:08 AM', text: 'GraphQL schema conflict on `UserConnection` — the pagination type is defined twice in the gateway. One in accounts-service, one in billing-service. Need to consolidate. Filing INFRA-887.', reactions: [{ emoji: '🐛', count: 3 }] },
  // ── unread divider ──────────────────────────────────────────────────────────
  { id: 'eng-14', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '10:21 AM', text: 'Approved INFRA-887. Priya, grab Kenji on this one — he owns the gateway federation config.' },
  { id: 'eng-15', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '10:25 AM', text: 'On it. Should have a fix in the next hour.' },
  { id: 'eng-16', user: 'Leila Nazari', avatar: 'LN', avatarColor: '#F06292', time: '10:44 AM', text: 'Temporal Cloud trial is provisioned. I\'ve ported the PDF export workflow as a proof of concept. It\'s running. Results:', filePreview: { name: 'temporal-poc-results.md', type: 'Markdown', size: '14 KB' }, reactions: [{ emoji: '🔥', count: 9 }, { emoji: '👏', count: 6 }] },
  { id: 'eng-17', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '10:58 AM', text: 'Cert rotation is scheduled for tonight at midnight UTC. Services will do a hot reload — no downtime expected. Monitoring alerts muted 11:55 PM – 12:05 AM.' },
  { id: 'eng-18', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '11:12 AM', text: 'New Grafana dashboard for API latency p50/p95/p99 per endpoint is live. Link in topic. Way better visibility than our old Datadog setup.', reactions: [{ emoji: '📊', count: 7 }] },
  { id: 'eng-19', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '11:31 AM', text: 'E2E test suite is now running on Playwright. Replaced Cypress entirely. Test runtime dropped from 18 min → 6 min with parallel workers.', reactions: [{ emoji: '⚡', count: 8 }, { emoji: '🎉', count: 5 }] },
  { id: 'eng-20', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '11:49 AM', text: 'INFRA-887 fixed and PR open. Consolidated `UserConnection` to a shared `@core/pagination` module that both services import. Clean.', reactions: [{ emoji: '✅', count: 5 }] },
  { id: 'eng-21', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '12:05 PM', text: 'Reviewed. LGTM. One nit: rename `edges` → `nodes` for GraphQL Relay spec compliance, but non-blocking. Approving.' , reactions: [{ emoji: '👍', count: 3 }] },
  { id: 'eng-22', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '12:22 PM', text: 'Merged. Deploying to staging. Will monitor for 30 min before promoting to prod.', reactions: [{ emoji: '🚀', count: 4 }] },
  { id: 'eng-23', user: 'Leila Nazari', avatar: 'LN', avatarColor: '#F06292', time: '12:45 PM', text: 'Temporal RFC updated with PoC results. Performance numbers are compelling. Suggesting we schedule the migration for Q2. Cost estimate added.', thread: { count: 5, lastUser: 'Priya Sharma', lastUserColor: '#1D9BD1', lastUserAvatar: 'PS', lastTime: '1:10 PM' } },
  { id: 'eng-24', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '1:03 PM', text: 'SLO dashboard updated. We\'re at 99.97% availability for the past 30 days. Error budget: 79% remaining.', reactions: [{ emoji: '💚', count: 6 }] },
  { id: 'eng-25', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '1:28 PM', text: 'Dependency audit done. 3 packages with known vulns updated. All high/critical. No user-facing impact.', reactions: [{ emoji: '🛡️', count: 5 }] },
];

// ─── #design-system messages ─────────────────────────────────────────────────

const designSystemMessages: SlackMessage[] = [
  { id: 'dsn-1', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '9:00 AM', text: 'Design system v2.4 sprint starts today. Priorities: token audit, button component refactor, and dark mode color ramp for semantic tokens. Board is updated.' },
  { id: 'dsn-2', user: 'Maya Torres', avatar: 'MT', avatarColor: '#26A69A', time: '9:08 AM', text: 'I\'ve been going through the color ramp in the last few days. Our neutral grays are not perceptually linear. We\'re jumping too hard between 400–500 in dark mode. Screenshot:',
    filePreview: { name: 'neutral-ramp-analysis.png', type: 'Image', size: '1.1 MB' }, reactions: [{ emoji: '👀', count: 5 }] },
  { id: 'dsn-3', user: 'Chris Vogel', avatar: 'CV', avatarColor: '#5C6BC0', time: '9:14 AM', text: 'Maya this has been bugging me too. Our APCA contrast scores on neutral-500/background are borderline for body text. We should fix before v2.4 ships.' },
  { id: 'dsn-4', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '9:19 AM', text: 'Agreed — adding it to the sprint. Maya can you own the color ramp fix and PR into the Figma library? Chris, please update the CSS tokens once Figma is done.' },
  { id: 'dsn-5', user: 'Sam Bhatt', avatar: 'SB', avatarColor: '#EF6C00', time: '9:28 AM', text: 'Question on the button component refactor: are we going with a single polymorphic `Button` or keeping `Button` + `IconButton` as separate components?', thread: { count: 8, lastUser: 'Alex Rivera', lastUserColor: '#E8912D', lastUserAvatar: 'AR', lastTime: '10:04 AM' } },
  { id: 'dsn-6', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '9:34 AM', text: 'Single polymorphic. Here\'s the API we agreed on last week:',
    codeBlock: `<Button variant="primary" size="md" leftIcon={<PlusIcon />}>
  Create project
</Button>

<Button variant="ghost" size="sm" iconOnly>
  <TrashIcon />
</Button>

<Button as="a" href="/dashboard" variant="secondary">
  Go to dashboard
</Button>`,
    codeLanguage: 'tsx', reactions: [{ emoji: '👌', count: 6 }] },
  { id: 'dsn-7', user: 'Chris Vogel', avatar: 'CV', avatarColor: '#5C6BC0', time: '9:51 AM', text: 'PR for the button refactor is up: DS-114. Storybook previews are auto-generated. 8 stories covering all size/variant combos.', filePreview: { name: 'button-component-v2.fig', type: 'Figma', size: '6.8 MB' }, reactions: [{ emoji: '✅', count: 4 }] },
  { id: 'dsn-8', user: 'Maya Torres', avatar: 'MT', avatarColor: '#26A69A', time: '10:09 AM', text: 'New neutral ramp is done in Figma. APCA scores now 75+ across all body text pairs in dark mode. Sharing the before/after side-by-side:', filePreview: { name: 'color-ramp-v2-comparison.png', type: 'Image', size: '2.4 MB' }, reactions: [{ emoji: '🎨', count: 7 }, { emoji: '✨', count: 5 }] },
  { id: 'dsn-9', user: 'Sam Bhatt', avatar: 'SB', avatarColor: '#EF6C00', time: '10:18 AM', text: 'Huge difference on neutral-500. The old version was definitely straining on OLED screens. Looks way more balanced now.' },
  { id: 'dsn-10', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '10:26 AM', text: 'Approved. Chris, go ahead and pull the new values into CSS tokens once this merges to the Figma library. We\'ll do a patch release today.' },
  { id: 'dsn-11', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '10:44 AM', text: 'This is fantastic work. The consistency across product and the design system has been a recurring theme in user interviews — people actually notice. Keep it up 🙌', reactions: [{ emoji: '❤️', count: 9 }] },
  { id: 'dsn-12', user: 'Chris Vogel', avatar: 'CV', avatarColor: '#5C6BC0', time: '11:02 AM', text: 'CSS tokens updated and published to npm as `@nebula/tokens@2.4.1`. Patch is non-breaking — just color value changes.', reactions: [{ emoji: '📦', count: 4 }] },
  { id: 'dsn-13', user: 'Maya Torres', avatar: 'MT', avatarColor: '#26A69A', time: '11:15 AM', text: 'Starting the icon audit next. We\'ve got 3 different "settings" icons in production. Proposing we canonicalize on the Lucide `Settings2` variant.', reactions: [{ emoji: '🙈', count: 3 }], thread: { count: 4, lastUser: 'Alex Rivera', lastUserColor: '#E8912D', lastUserAvatar: 'AR', lastTime: '11:38 AM' } },
  { id: 'dsn-14', user: 'Sam Bhatt', avatar: 'SB', avatarColor: '#EF6C00', time: '11:34 AM', text: 'Also found 2 different loading spinner implementations. Can we just export a single `<Spinner />` from the DS and deprecate the custom ones in the app?' },
  { id: 'dsn-15', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '11:40 AM', text: 'Yes. Chris — can you own the Spinner component? Maya handles icon consolidation. Both targeting DS-sprint-7 completion.' },
  { id: 'dsn-16', user: 'Chris Vogel', avatar: 'CV', avatarColor: '#5C6BC0', time: '12:01 PM', text: '`<Spinner />` done. Three sizes (sm/md/lg), theme-aware color, accessible `role="status"` + `aria-label`. DS-119.', reactions: [{ emoji: '⚡', count: 6 }, { emoji: '✅', count: 4 }] },
  { id: 'dsn-17', user: 'Maya Torres', avatar: 'MT', avatarColor: '#26A69A', time: '12:18 PM', text: 'Icon audit spreadsheet is in Notion — 47 icons reviewed, 12 duplicates flagged, 3 to deprecate. Standardising on Lucide v0.462 icons across the board.', filePreview: { name: 'icon-audit-mar-2025.xlsx', type: 'Spreadsheet', size: '88 KB' }, reactions: [{ emoji: '📊', count: 4 }] },
  { id: 'dsn-18', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '1:02 PM', text: 'Sprint review: all 3 DS-sprint-7 tickets resolved. Patch release 2.4.1 shipped. This sprint was clean. Great work everyone 🎨', reactions: [{ emoji: '🎉', count: 7 }, { emoji: '🚀', count: 4 }] },
];

// ─── #random messages ────────────────────────────────────────────────────────

const randomMessages: SlackMessage[] = [
  { id: 'rnd-1', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '8:48 AM', text: 'Every Friday I tell myself I\'ll have inbox zero by Monday. Every Monday I remember I was lying to myself. 📬😭', reactions: [{ emoji: '😂', count: 12 }, { emoji: '💀', count: 7 }] },
  { id: 'rnd-2', user: 'Dani Park', avatar: 'DP', avatarColor: '#FF9800', time: '8:52 AM', text: 'Someone left a half-eaten birthday cake in the second floor kitchen. It\'s fair game after 48 hours per the Office Food Treaty of 2023. Proceed accordingly.' , reactions: [{ emoji: '🎂', count: 6 }, { emoji: '🏃', count: 5 }] },
  { id: 'rnd-3', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '9:01 AM', text: 'BREAKING: someone replaced the break room whiteboard with an actual window. I now have nowhere to draw bad system diagrams and call them "architecture". 10/10 upgrade.' , reactions: [{ emoji: '😂', count: 9 }] },
  { id: 'rnd-4', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '9:17 AM', text: 'Hot take: standing desks should have a mandatory 10-minute sitting break every hour. My knees are filing a formal complaint.' , reactions: [{ emoji: '🦵', count: 8 }, { emoji: '💀', count: 5 }], thread: { count: 6, lastUser: 'Maya Torres', lastUserColor: '#26A69A', lastUserAvatar: 'MT', lastTime: '9:38 AM' } },
  { id: 'rnd-5', user: 'Maya Torres', avatar: 'MT', avatarColor: '#26A69A', time: '9:33 AM', text: 'Spotted a raccoon outside the back entrance this morning. He looked directly at me. He knew things.' , reactions: [{ emoji: '🦝', count: 11 }, { emoji: '👁️', count: 6 }] },
  { id: 'rnd-6', user: 'Dani Park', avatar: 'DP', avatarColor: '#FF9800', time: '9:44 AM', text: 'That raccoon is Gerald. He\'s been around since Q3. Dani has officially been here long enough to name the wildlife.' , reactions: [{ emoji: '😂', count: 14 }] },
  { id: 'rnd-7', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '10:02 AM', text: 'Went to make tea this morning, somehow ended up alphabetising the coffee pods. No notes, brain just did it.' , reactions: [{ emoji: '🧠', count: 7 }, { emoji: '✅', count: 4 }] },
  { id: 'rnd-8', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '10:19 AM', text: 'Found a USB drive labelled "DO NOT OPEN" in the server room. Reader, I did not open it. I am a coward and I am at peace with that.' , reactions: [{ emoji: '😂', count: 13 }, { emoji: '🏆', count: 5 }] },
  // ── unread starts here ──────────────────────────────────────────────────────
  { id: 'rnd-9', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '11:05 AM', text: 'Spotify Wrapped for your git commits when? "You wrote 3,412 lines of TypeScript this year. Your top genre: null pointer exceptions." 🎧', reactions: [{ emoji: '😂', count: 16 }, { emoji: '💀', count: 9 }], thread: { count: 8, lastUser: 'Tom Reeves', lastUserColor: '#00897B', lastUserAvatar: 'TR', lastTime: '11:32 AM' } },
  { id: 'rnd-10', user: 'Maya Torres', avatar: 'MT', avatarColor: '#26A69A', time: '11:21 AM', text: 'I would have "You spent 47% of your year resizing modals. Your vibe: perfectionist chaos."' , reactions: [{ emoji: '😭', count: 10 }] },
  { id: 'rnd-11', user: 'Dani Park', avatar: 'DP', avatarColor: '#FF9800', time: '11:44 AM', text: 'PSA: the office plant collection now has 11 members. Terracotta row B (left of the stairs) has a new succulent. She has no name yet. Suggestions welcome.' , reactions: [{ emoji: '🪴', count: 7 }] },
  { id: 'rnd-12', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '11:47 AM', text: 'Patricia.' , reactions: [{ emoji: '👍', count: 11 }] },
  { id: 'rnd-13', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '11:48 AM', text: 'Sergei.' , reactions: [{ emoji: '😂', count: 8 }] },
  { id: 'rnd-14', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '11:49 AM', text: 'webpack.' , reactions: [{ emoji: '💀', count: 14 }, { emoji: '🏆', count: 6 }] },
  { id: 'rnd-15', user: 'Dani Park', avatar: 'DP', avatarColor: '#FF9800', time: '12:03 PM', text: 'After careful deliberation: her name is Patricia. Kenji you are unwell. 🌵' , reactions: [{ emoji: '😂', count: 9 }] },
  { id: 'rnd-16', user: 'Maya Torres', avatar: 'MT', avatarColor: '#26A69A', time: '2:14 PM', text: 'Afternoon low: I just said "let\'s take this offline" on a Zoom call with one other person. I need a vacation.' , reactions: [{ emoji: '😭', count: 12 }, { emoji: '💀', count: 7 }] },
];

// ─── #standup messages ────────────────────────────────────────────────────────

const standupMessages: SlackMessage[] = [
  { id: 'std-1', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '9:01 AM', text: '**Yesterday:** Investor update call, reviewed Q1 roadmap with board. **Today:** Product review at 2 PM, 1:1s with Alex and Marcus. **Blockers:** None.' },
  { id: 'std-2', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '9:04 AM', text: '**Yesterday:** Sprint planning, 3 PR reviews, unblocked Tom on auth flow. **Today:** Engineering sync, reviewing Leila\'s RFC, pair with Kenji on rate limiter. **Blockers:** None.' },
  { id: 'std-3', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '9:05 AM', text: '**Yesterday:** k8s rollout, VACUUM on events table, cert rotation prep. **Today:** Deploy INFRA-887 fix, Grafana dashboard update, monitor staging post-deploy. **Blockers:** None.' },
  { id: 'std-4', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '9:07 AM', text: '**Yesterday:** GraphQL schema consolidation (INFRA-887). **Today:** Integration tests for reporting endpoints, PR review for DS-114. **Blockers:** Need Kenji to review schema change before I can merge.' },
  { id: 'std-5', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '9:09 AM', text: '**Yesterday:** Button component refactor, icon audit spreadsheet. **Today:** Pricing page final comps, handoff to eng for the onboarding flow. **Blockers:** Waiting on Sarah\'s sign-off on pricing copy.' },
  { id: 'std-6', user: 'Tom Reeves', avatar: 'TR', avatarColor: '#00897B', time: '9:11 AM', text: '**Yesterday:** React Query v5 migration, Playwright setup. **Today:** Fix onboarding "Skip" CTA on iPhone SE, lazy-load charts on Reports page. **Blockers:** None, unblocked by Priya yesterday.' },
  { id: 'std-7', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '9:13 AM', text: '@Priya tagging @Kenji on your blocker now.' , reactions: [{ emoji: '👍', count: 2 }] },
  { id: 'std-8', user: 'Kenji Tanaka', avatar: 'KT', avatarColor: '#673AB7', time: '9:15 AM', text: '**Yesterday:** Rate limiter implementation, pair with James on cert rotation. **Today:** Schema review for Priya\'s PR first thing, then finish gateway federation cleanup. **Blockers:** None.' },
  { id: 'std-9', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '9:17 AM', text: '**Yesterday:** PagerDuty rotation setup, Sentry alert tuning for ES rebuilds. **Today:** SLO review, monitoring cert rotation tonight, finalize on-call schedule for launch week. **Blockers:** None.' },
  { id: 'std-10', user: 'Leila Nazari', avatar: 'LN', avatarColor: '#F06292', time: '9:19 AM', text: '**Yesterday:** Temporal PoC running, RFC updated with results. **Today:** Demo Temporal PoC to Marcus and James, update RFC cost estimate. **Blockers:** Need Marcus\' approval to expense Temporal Cloud trial ($50/mo).' },
  { id: 'std-11', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '9:20 AM', text: 'Approved Leila, will process by EOD.' , reactions: [{ emoji: '✅', count: 3 }] },
  { id: 'std-12', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '9:21 AM', text: 'Great standup everyone. Tight sprint, strong focus. Let\'s have another clean green day. 🟢' , reactions: [{ emoji: '🚀', count: 5 }] },
];

// ─── Channel message map (used by ChannelView) ────────────────────────────────

export const channelMessages: Record<string, SlackMessage[]> = {
  '1': generalMessages,
  '2': productLaunchMessages,
  '3': engineeringMessages,
  '4': designSystemMessages,
  '5': randomMessages,
  '6': standupMessages,
};

// ─── Backwards-compat exports (used by CatchUpPanel) ─────────────────────────

export const messages = productLaunchMessages;

export const participants: Participant[] = channelParticipants['2'];

// ─── CatchUp panel data (product-launch channel) ─────────────────────────────

export const impactItems: ImpactItem[] = [
  {
    id: 'imp-1', type: 'mention',
    text: 'Priya requested your sign-off on API schema changes before EOD',
    sourceMessageId: 'msg-13', timestamp: '9:31 AM',
    personName: 'Priya Sharma', personAvatar: 'PS', personAvatarColor: '#1D9BD1',
    suggestedReplies: ["I'll review and sign off by EOD", "Can we push to tomorrow morning?", "On it — sending feedback shortly"],
  },
  {
    id: 'imp-2', type: 'assignment',
    text: 'Marcus assigned you the docs update for the new API — draft due Thursday',
    sourceMessageId: 'msg-23', timestamp: '10:15 AM',
    personName: 'Marcus Johnson', personAvatar: 'MJ', personAvatarColor: '#2BAC76',
    suggestedReplies: ["Acknowledged, I'll have a draft by Thursday", "Need more context before I start", "Can we sync on scope first?"],
  },
  {
    id: 'imp-3', type: 'decision',
    text: 'Reporting endpoints switching from REST to GraphQL — affects dashboard module',
    sourceMessageId: 'msg-27', timestamp: '10:28 AM',
    personName: 'Priya Sharma', personAvatar: 'PS', personAvatarColor: '#1D9BD1',
    suggestedReplies: ["Noted, I'll update the dashboard accordingly", "Can you share the new schema?", "This impacts my timeline — let's discuss"],
  },
  {
    id: 'imp-4', type: 'mention',
    text: 'Marcus asked you to review the bundle analysis report',
    sourceMessageId: 'msg-33', timestamp: '11:20 AM',
    personName: 'Marcus Johnson', personAvatar: 'MJ', personAvatarColor: '#2BAC76',
    suggestedReplies: ["I'll look at this today", "Adding to my queue — expect feedback by EOD", "Can you link the report here?"],
  },
];

export const decisions: Decision[] = [
  {
    id: 'dec-1', text: 'Going with Option B for the pricing page layout',
    maker: 'Alex Rivera', makerAvatar: 'AR', makerAvatarColor: '#E8912D',
    timestamp: '9:45 AM', sourceMessageId: 'msg-16',
    suggestedReplies: ["Acknowledged, updating my designs now", "Can you clarify the reasoning?", "I'll confirm with the marketing team"],
  },
  {
    id: 'dec-2', text: 'Launch date confirmed for March 15 — PRs merged by March 10',
    maker: 'Sarah Chen', makerAvatar: 'SC', makerAvatarColor: '#E91E8C',
    timestamp: '9:52 AM', sourceMessageId: 'msg-17',
    suggestedReplies: ["Confirmed, I'll hit the March 10 deadline", "I may need a 1-day extension — can we discuss?", "On track, no blockers"],
  },
  {
    id: 'dec-3', text: 'Switching from REST to GraphQL for reporting endpoints',
    maker: 'Priya Sharma', makerAvatar: 'PS', makerAvatarColor: '#1D9BD1',
    timestamp: '10:28 AM', sourceMessageId: 'msg-27',
    suggestedReplies: ["Noted, I'll update the integration layer", "Can you clarify the migration timeline?", "I'll confirm with design on impact"],
  },
];

export const actionItems: ActionItem[] = [
  {
    id: 'act-1', task: 'Sign off on API schema changes',
    assignedTo: 'You', assigneeAvatar: 'ME', assigneeAvatarColor: '#1D9BD1',
    deadline: 'Today EOD', isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-13',
    suggestedReplies: ["Acknowledged, I'll take this", "Need clarification first", "On it — will confirm by EOD"],
  },
  {
    id: 'act-2', task: 'Write draft docs for new API',
    assignedTo: 'You', assigneeAvatar: 'ME', assigneeAvatarColor: '#1D9BD1',
    deadline: 'Thursday', isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-23',
    suggestedReplies: ["Acknowledged, I'll take this", "Can you clarify the scope?", "I'll have a draft ready Thursday"],
  },
  {
    id: 'act-3', task: 'Review bundle analysis report',
    assignedTo: 'You', assigneeAvatar: 'ME', assigneeAvatarColor: '#1D9BD1',
    isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-33',
    suggestedReplies: ["Acknowledged, reviewing now", "Where is the report linked?", "I'll send feedback today"],
  },
  {
    id: 'act-4', task: 'Merge all feature PRs',
    assignedTo: 'All engineers', assigneeAvatar: 'AE', assigneeAvatarColor: '#9AA1A9',
    deadline: 'March 10', isAssignedToUser: false, confirmed: false, sourceMessageId: 'msg-17',
    suggestedReplies: ["My PRs are ready for review", "Will merge by March 10", "I have a blocker — need help"],
  },
];

export const conversationSummary = `The team focused on finalizing the product launch for March 15. Wireframes were updated and reviewed with feedback on mobile breakpoints. Two key architectural decisions were made: adopting Option B for the pricing page and migrating reporting endpoints from REST to GraphQL. The CI pipeline was stabilized, and bundle size was reduced by 26%. Several tasks were assigned ahead of the launch deadline.`;
