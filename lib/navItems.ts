/** Global-nav items we let the user re-icon, mapped to their stable link ids. */
export const NAV_ITEMS: { key: string; label: string; selector: string; defaultEmoji: string }[] = [
  { key: 'account', label: 'Account', selector: '#global_nav_profile_link', defaultEmoji: '👤' },
  { key: 'dashboard', label: 'Dashboard', selector: '#global_nav_dashboard_link', defaultEmoji: '🏠' },
  { key: 'courses', label: 'Courses', selector: '#global_nav_courses_link', defaultEmoji: '📚' },
  { key: 'groups', label: 'Groups', selector: '#global_nav_groups_link', defaultEmoji: '👥' },
  { key: 'calendar', label: 'Calendar', selector: '#global_nav_calendar_link', defaultEmoji: '📅' },
  { key: 'inbox', label: 'Inbox', selector: '#global_nav_conversations_link', defaultEmoji: '✉️' },
  { key: 'history', label: 'History', selector: '#global_nav_history_link', defaultEmoji: '🕘' },
  { key: 'commons', label: 'Commons', selector: '#global_nav_commons_link', defaultEmoji: '🌐' },
  { key: 'help', label: 'Help', selector: '#global_nav_help_link', defaultEmoji: '❓' },
];
