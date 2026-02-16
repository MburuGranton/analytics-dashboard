export interface RevenueDataPoint {
  month: string;
  revenue: number;
  previousRevenue: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  avatar: string;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  color: string;
}

export interface PageStat {
  page: string;
  views: number;
  uniqueVisitors: number;
  avgTime: string;
  bounceRate: number;
}

export interface BrowserStat {
  name: string;
  share: number;
  color: string;
}

export interface SessionDataPoint {
  date: string;
  sessions: number;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

// KPI Metrics
export const kpiMetrics = {
  revenue: { value: '$48,352', change: 12.5, period: 'vs last month' },
  users: { value: '12,847', change: 8.2, period: 'vs last month' },
  conversion: { value: '3.24%', change: -1.8, period: 'vs last month' },
  bounceRate: { value: '42.3%', change: -5.1, period: 'vs last month' },
};

// Revenue trend (12 months)
export const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 32000, previousRevenue: 28000 },
  { month: 'Feb', revenue: 35000, previousRevenue: 30000 },
  { month: 'Mar', revenue: 31000, previousRevenue: 32000 },
  { month: 'Apr', revenue: 38000, previousRevenue: 33000 },
  { month: 'May', revenue: 42000, previousRevenue: 35000 },
  { month: 'Jun', revenue: 39000, previousRevenue: 37000 },
  { month: 'Jul', revenue: 44000, previousRevenue: 38000 },
  { month: 'Aug', revenue: 41000, previousRevenue: 39000 },
  { month: 'Sep', revenue: 46000, previousRevenue: 40000 },
  { month: 'Oct', revenue: 43000, previousRevenue: 42000 },
  { month: 'Nov', revenue: 47000, previousRevenue: 43000 },
  { month: 'Dec', revenue: 48352, previousRevenue: 45000 },
];

// Traffic sources
export const trafficSources: TrafficSource[] = [
  { source: 'Organic Search', visitors: 4520, color: '#2563eb' },
  { source: 'Direct', visitors: 3210, color: '#3b82f6' },
  { source: 'Social Media', visitors: 2840, color: '#60a5fa' },
  { source: 'Referral', visitors: 1650, color: '#93c5fd' },
  { source: 'Email', visitors: 980, color: '#bfdbfe' },
  { source: 'Paid Ads', visitors: 647, color: '#dbeafe' },
];

// Users list (25 users)
const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ivan', 'Julia', 'Kevin', 'Laura', 'Marcus', 'Nina', 'Oscar', 'Patricia', 'Quincy', 'Rachel', 'Samuel', 'Tanya', 'Ulrich', 'Vera', 'Walter', 'Xena', 'Yusuf'];
const lastNames = ['Anderson', 'Brooks', 'Chen', 'Davis', 'Evans', 'Fischer', 'Garcia', 'Hayes', 'Ibrahim', 'Johnson', 'Kim', 'Lee', 'Martinez', 'Nakamura', 'Owens', 'Patel', 'Quinn', 'Robinson', 'Singh', 'Taylor', 'Ueda', 'Vasquez', 'Wang', 'Xavier', 'Young'];
const roles = ['Admin', 'Editor', 'Viewer', 'Analyst', 'Manager'];
const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'active', 'active', 'inactive', 'pending'];

export const users: User[] = firstNames.map((first, i) => ({
  id: i + 1,
  name: `${first} ${lastNames[i]}`,
  email: `${first.toLowerCase()}.${lastNames[i].toLowerCase()}@example.com`,
  role: roles[i % roles.length],
  status: statuses[i % statuses.length],
  joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  lastActive: `${Math.floor(Math.random() * 23) + 1}h ago`,
  avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${first}+${lastNames[i]}&backgroundColor=3b82f6&textColor=ffffff`,
}));

// Top pages
export const pageStats: PageStat[] = [
  { page: '/dashboard', views: 12450, uniqueVisitors: 8320, avgTime: '4m 32s', bounceRate: 22.1 },
  { page: '/products', views: 8730, uniqueVisitors: 6540, avgTime: '3m 18s', bounceRate: 35.4 },
  { page: '/pricing', views: 6290, uniqueVisitors: 5120, avgTime: '2m 45s', bounceRate: 41.2 },
  { page: '/blog', views: 5840, uniqueVisitors: 4230, avgTime: '5m 12s', bounceRate: 28.7 },
  { page: '/about', views: 3210, uniqueVisitors: 2890, avgTime: '1m 56s', bounceRate: 52.3 },
  { page: '/contact', views: 2150, uniqueVisitors: 1870, avgTime: '2m 10s', bounceRate: 38.9 },
  { page: '/docs', views: 4670, uniqueVisitors: 3560, avgTime: '6m 05s', bounceRate: 19.8 },
  { page: '/signup', views: 3890, uniqueVisitors: 3450, avgTime: '1m 42s', bounceRate: 45.6 },
];

// Browser stats
export const browserStats: BrowserStat[] = [
  { name: 'Chrome', share: 58.2, color: '#1d4ed8' },
  { name: 'Safari', share: 19.4, color: '#3b82f6' },
  { name: 'Firefox', share: 10.8, color: '#60a5fa' },
  { name: 'Edge', share: 7.3, color: '#93c5fd' },
  { name: 'Other', share: 4.3, color: '#dbeafe' },
];

// Session data (30 days)
export const sessionData: SessionDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 1, i + 1);
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sessions: Math.floor(800 + Math.random() * 600 + Math.sin(i / 3) * 200),
  };
});

// Recent activity
export const recentActivity: Activity[] = [
  { id: 1, user: 'Alice Anderson', action: 'created', target: 'Q4 Revenue Report', time: '2 min ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AA&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 2, user: 'Bob Brooks', action: 'updated', target: 'User Permissions', time: '15 min ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BB&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 3, user: 'Charlie Chen', action: 'deleted', target: 'Old Campaign Data', time: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CC&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 4, user: 'Diana Davis', action: 'exported', target: 'Monthly Analytics', time: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DD&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 5, user: 'Ethan Evans', action: 'commented on', target: 'Traffic Analysis', time: '3 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EE&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 6, user: 'Fiona Fischer', action: 'shared', target: 'Dashboard Link', time: '5 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FF&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 7, user: 'George Garcia', action: 'approved', target: 'Budget Request', time: '6 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GG&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 8, user: 'Hannah Hayes', action: 'uploaded', target: 'Product Images', time: '8 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HH&backgroundColor=3b82f6&textColor=ffffff' },
];
