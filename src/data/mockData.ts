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
  avatarColor: string;
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

export const channels: SlackChannel[] = [
  { id: '1', name: 'general', unread: 3 },
  { id: '2', name: 'product-launch', unread: 47 },
  { id: '3', name: 'engineering', unread: 12 },
  { id: '4', name: 'design-system', unread: 0 },
  { id: '5', name: 'random', unread: 8 },
  { id: '6', name: 'standup', unread: 0, isMuted: true },
];

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
  isBotMessage?: boolean;
}

export const messages: SlackMessage[] = [
  // ── MORNING BURST ───────────────────────────────────────────────────────────
  { id: 'msg-1', user: 'Sarah Chen', avatar: 'SC', avatarColor: '#E91E8C', time: '8:02 AM', text: 'Good morning everyone 👋 Big day — kicking off final sprint for the March 15 launch. Let\'s make it count.', reactions: [{ emoji: '🚀', count: 6 }, { emoji: '💪', count: 4 }] },
  { id: 'msg-2', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '8:07 AM', text: 'Morning! Already had two coffees. Let\'s ship. ☕☕' },
  { id: 'msg-3', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '8:09 AM', text: 'FYI — prod deploy from last night is stable. No regression alerts. All green.', reactions: [{ emoji: '✅', count: 5 }] },
  { id: 'msg-4', user: 'Priya Sharma', avatar: 'PS', avatarColor: '#1D9BD1', time: '8:14 AM', text: 'Nice. I\'ll pick up the GraphQL migration for reporting endpoints this morning. Was blocked on auth yesterday but that\'s resolved now.' },
  { id: 'msg-5', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '8:18 AM', text: 'Updated all icon sizes in the design system — Figma tokens are synced. Check the "v2.4 – Launch" page.', reactions: [{ emoji: '🎨', count: 3 }], thread: { count: 4, lastUser: 'Sarah Chen', lastUserColor: '#E91E8C', lastUserAvatar: 'SC', lastTime: '8:42 AM' } },
  { id: 'msg-6', user: 'Nina Okafor', avatar: 'NO', avatarColor: '#FF5252', time: '8:23 AM', text: 'Quick heads up: the analytics event for "Onboarding Completed" was firing twice on mobile. Fixed in PR #412 — needs a review from someone on infra.' },
  { id: 'msg-7', user: 'James Liu', avatar: 'JL', avatarColor: '#9C27B0', time: '8:31 AM', text: 'On it @Nina. Will review #412 now.', reactions: [{ emoji: '👍', count: 2 }] },
  { id: 'msg-8', user: 'Marcus Johnson', avatar: 'MJ', avatarColor: '#2BAC76', time: '8:45 AM', text: 'Standup notes from yesterday are in Notion if anyone needs context. Link in the topic.', thread: { count: 2, lastUser: 'Alex Rivera', lastUserColor: '#E8912D', lastUserAvatar: 'AR', lastTime: '9:01 AM' } },

  // ── TECHNICAL DEEP DIVE ──────────────────────────────────────────────────────
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

  // ── DESIGN FEEDBACK THREAD ───────────────────────────────────────────────────
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

  // ── UNREAD DIVIDER HERE (msg-28 onwards) ─────────────────────────────────────
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
  { id: 'msg-43', user: 'Alex Rivera', avatar: 'AR', avatarColor: '#E8912D', time: '12:11 PM', text: 'New fonts are loaded via `font-display: swap` now — no more layout shift on first paint. Lighthouse score went from 71 → 94 on mobile.', reactions: [{ emoji: '🏎️', count: 7 }, { emoji: '💯', count: 4 }], thread: { count: 3, lastUser: 'Nina Okafor', lastUserColor: '#FF5252', lastUserAvatar: 'NO', lastTime: '12:28 PM' } },
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

export const impactItems: ImpactItem[] = [
  {
    id: 'imp-1', type: 'mention',
    text: 'Priya requested your sign-off on API schema changes before EOD',
    sourceMessageId: 'msg-3', timestamp: '9:31 AM',
    personName: 'Priya Sharma', personAvatar: 'PS', personAvatarColor: '#1D9BD1',
    suggestedReplies: ["I'll review and sign off by EOD", "Can we push to tomorrow morning?", "On it — sending feedback shortly"],
  },
  {
    id: 'imp-2', type: 'assignment',
    text: 'Marcus assigned you the docs update for the new API — draft due Thursday',
    sourceMessageId: 'msg-7', timestamp: '10:15 AM',
    personName: 'Marcus Johnson', personAvatar: 'MJ', personAvatarColor: '#2BAC76',
    suggestedReplies: ["Acknowledged, I'll have a draft by Thursday", "Need more context before I start", "Can we sync on scope first?"],
  },
  {
    id: 'imp-3', type: 'decision',
    text: 'Reporting endpoints switching from REST to GraphQL — affects dashboard module',
    sourceMessageId: 'msg-8', timestamp: '10:28 AM',
    personName: 'Priya Sharma', personAvatar: 'PS', personAvatarColor: '#1D9BD1',
    suggestedReplies: ["Noted, I'll update the dashboard accordingly", "Can you share the new schema?", "This impacts my timeline — let's discuss"],
  },
  {
    id: 'imp-4', type: 'mention',
    text: 'Marcus asked you to review the bundle analysis report',
    sourceMessageId: 'msg-12', timestamp: '11:20 AM',
    personName: 'Marcus Johnson', personAvatar: 'MJ', personAvatarColor: '#2BAC76',
    suggestedReplies: ["I'll look at this today", "Adding to my queue — expect feedback by EOD", "Can you link the report here?"],
  },
];

export const decisions: Decision[] = [
  {
    id: 'dec-1', text: 'Going with Option B for the pricing page layout',
    maker: 'Alex Rivera', makerAvatar: 'AR', makerAvatarColor: '#E8912D',
    timestamp: '9:45 AM', sourceMessageId: 'msg-4',
    suggestedReplies: ["Acknowledged, updating my designs now", "Can you clarify the reasoning?", "I'll confirm with the marketing team"],
  },
  {
    id: 'dec-2', text: 'Launch date confirmed for March 15 — PRs merged by March 10',
    maker: 'Sarah Chen', makerAvatar: 'SC', makerAvatarColor: '#E91E8C',
    timestamp: '9:52 AM', sourceMessageId: 'msg-5',
    suggestedReplies: ["Confirmed, I'll hit the March 10 deadline", "I may need a 1-day extension — can we discuss?", "On track, no blockers"],
  },
  {
    id: 'dec-3', text: 'Switching from REST to GraphQL for reporting endpoints',
    maker: 'Priya Sharma', makerAvatar: 'PS', makerAvatarColor: '#1D9BD1',
    timestamp: '10:28 AM', sourceMessageId: 'msg-8',
    suggestedReplies: ["Noted, I'll update the integration layer", "Can you clarify the migration timeline?", "I'll confirm with design on impact"],
  },
];

export const actionItems: ActionItem[] = [
  {
    id: 'act-1', task: 'Sign off on API schema changes',
    assignedTo: 'You', assigneeAvatar: 'ME', assigneeAvatarColor: '#1D9BD1',
    deadline: 'Today EOD', isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-3',
    suggestedReplies: ["Acknowledged, I'll take this", "Need clarification first", "On it — will confirm by EOD"],
  },
  {
    id: 'act-2', task: 'Write draft docs for new API',
    assignedTo: 'You', assigneeAvatar: 'ME', assigneeAvatarColor: '#1D9BD1',
    deadline: 'Thursday', isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-7',
    suggestedReplies: ["Acknowledged, I'll take this", "Can you clarify the scope?", "I'll have a draft ready Thursday"],
  },
  {
    id: 'act-3', task: 'Review bundle analysis report',
    assignedTo: 'You', assigneeAvatar: 'ME', assigneeAvatarColor: '#1D9BD1',
    isAssignedToUser: true, confirmed: false, sourceMessageId: 'msg-12',
    suggestedReplies: ["Acknowledged, reviewing now", "Where is the report linked?", "I'll send feedback today"],
  },
  {
    id: 'act-4', task: 'Merge all feature PRs',
    assignedTo: 'All engineers', assigneeAvatar: 'AE', assigneeAvatarColor: '#9AA1A9',
    deadline: 'March 10', isAssignedToUser: false, confirmed: false, sourceMessageId: 'msg-5',
    suggestedReplies: ["My PRs are ready for review", "Will merge by March 10", "I have a blocker — need help"],
  },
];

export const conversationSummary = `The team focused on finalizing the product launch for March 15. Wireframes were updated and reviewed with feedback on mobile breakpoints. Two key architectural decisions were made: adopting Option B for the pricing page and migrating reporting endpoints from REST to GraphQL. The CI pipeline was stabilized, and bundle size was reduced by 26%. Several tasks were assigned ahead of the launch deadline.`;

export const participants: Participant[] = [
  { name: 'Sarah Chen', role: 'Product Lead', avatar: 'SC', avatarColor: '#E91E8C', isTopContributor: true, messageCount: 3 },
  { name: 'Marcus Johnson', role: 'Engineering Manager', avatar: 'MJ', avatarColor: '#2BAC76', messageCount: 3 },
  { name: 'Priya Sharma', role: 'Backend Engineer', avatar: 'PS', avatarColor: '#1D9BD1', messageCount: 2 },
  { name: 'Alex Rivera', role: 'Design Lead', avatar: 'AR', avatarColor: '#E8912D', messageCount: 2 },
  { name: 'James Liu', role: 'DevOps Engineer', avatar: 'JL', avatarColor: '#9C27B0', messageCount: 2 },
];

