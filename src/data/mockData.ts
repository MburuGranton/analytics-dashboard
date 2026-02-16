export interface MembershipDataPoint {
  month: string;
  members: number;
  previousMembers: number;
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

export interface AcquisitionChannel {
  source: string;
  members: number;
  color: string;
}

export interface ProgramStat {
  program: string;
  enrolled: number;
  completed: number;
  avgRating: string;
  completionRate: number;
}

export interface ChapterStat {
  name: string;
  share: number;
  color: string;
}

export interface EngagementDataPoint {
  date: string;
  activeMembers: number;
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
  totalMembers: { value: '1,247', change: 14.3, period: 'vs last quarter' },
  activeMembers: { value: '843', change: 8.7, period: 'vs last quarter' },
  eventsHeld: { value: '32', change: 23.1, period: 'vs last quarter' },
  retentionRate: { value: '78.6%', change: -3.2, period: 'vs last quarter' },
};

// Membership growth (12 months)
export const membershipData: MembershipDataPoint[] = [
  { month: 'Jan', members: 680, previousMembers: 520 },
  { month: 'Feb', members: 725, previousMembers: 548 },
  { month: 'Mar', members: 710, previousMembers: 590 },
  { month: 'Apr', members: 790, previousMembers: 615 },
  { month: 'May', members: 845, previousMembers: 640 },
  { month: 'Jun', members: 820, previousMembers: 672 },
  { month: 'Jul', members: 910, previousMembers: 695 },
  { month: 'Aug', members: 880, previousMembers: 710 },
  { month: 'Sep', members: 965, previousMembers: 740 },
  { month: 'Oct', members: 1020, previousMembers: 780 },
  { month: 'Nov', members: 1130, previousMembers: 810 },
  { month: 'Dec', members: 1247, previousMembers: 843 },
];

// How members found the association
export const acquisitionChannels: AcquisitionChannel[] = [
  { source: 'University Chapters', members: 485, color: '#2563eb' },
  { source: 'Referrals', members: 312, color: '#3b82f6' },
  { source: 'Social Media', members: 198, color: '#60a5fa' },
  { source: 'Tech Events', members: 142, color: '#93c5fd' },
  { source: 'Website', members: 78, color: '#bfdbfe' },
  { source: 'Other', members: 32, color: '#dbeafe' },
];

// Members list (25 members)
const firstNames = ['Amani', 'Brian', 'Cynthia', 'David', 'Eunice', 'Felix', 'Grace', 'Hassan', 'Irene', 'James', 'Kamau', 'Linda', 'Martin', 'Nancy', 'Oliver', 'Priscilla', 'Quentin', 'Rose', 'Steve', 'Tabitha', 'Udi', 'Vivian', 'Wilson', 'Ximena', 'Yusuf'];
const lastNames = ['Otieno', 'Kariuki', 'Njeri', 'Kipchoge', 'Wanjiku', 'Mwangi', 'Achieng', 'Omondi', 'Kamau', 'Nyongo', 'Mutua', 'Wambui', 'Kimani', 'Odhiambo', 'Chebet', 'Njoroge', 'Ruto', 'Muthoni', 'Ochieng', 'Wairimu', 'Barasa', 'Ndungu', 'Korir', 'Moreno', 'Ahmed'];
const roles = ['Chapter Lead', 'Member', 'Mentor', 'Committee Chair', 'Member'];
const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'active', 'active', 'inactive', 'pending'];

export const users: User[] = firstNames.map((first, i) => ({
  id: i + 1,
  name: `${first} ${lastNames[i]}`,
  email: `${first.toLowerCase()}.${lastNames[i].toLowerCase()}@ayse.org`,
  role: roles[i % roles.length],
  status: statuses[i % statuses.length],
  joinDate: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  lastActive: `${Math.floor(Math.random() * 23) + 1}h ago`,
  avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${first}+${lastNames[i]}&backgroundColor=3b82f6&textColor=ffffff`,
}));

// Programs & workshops performance
export const programStats: ProgramStat[] = [
  { program: 'Intro to Open Source', enrolled: 186, completed: 142, avgRating: '4.7', completionRate: 76.3 },
  { program: 'Web Dev Bootcamp', enrolled: 154, completed: 98, avgRating: '4.5', completionRate: 63.6 },
  { program: 'Career Readiness', enrolled: 130, completed: 112, avgRating: '4.8', completionRate: 86.2 },
  { program: 'Mobile App Sprint', enrolled: 92, completed: 61, avgRating: '4.3', completionRate: 66.3 },
  { program: 'Cloud & DevOps', enrolled: 78, completed: 45, avgRating: '4.4', completionRate: 57.7 },
  { program: 'UI/UX Workshop', enrolled: 110, completed: 89, avgRating: '4.6', completionRate: 80.9 },
  { program: 'Hackathon Prep', enrolled: 64, completed: 58, avgRating: '4.9', completionRate: 90.6 },
  { program: 'Data Science Intro', enrolled: 88, completed: 52, avgRating: '4.2', completionRate: 59.1 },
];

// Chapter distribution
export const chapterStats: ChapterStat[] = [
  { name: 'Nairobi', share: 38.4, color: '#1d4ed8' },
  { name: 'Mombasa', share: 18.2, color: '#3b82f6' },
  { name: 'Kisumu', share: 14.6, color: '#60a5fa' },
  { name: 'Nakuru', share: 12.1, color: '#93c5fd' },
  { name: 'Others', share: 16.7, color: '#dbeafe' },
];

// Daily active members (30 days)
export const engagementData: EngagementDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 1, i + 1);
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    activeMembers: Math.floor(320 + Math.random() * 180 + Math.sin(i / 3) * 80),
  };
});

// Recent activity
export const recentActivity: Activity[] = [
  { id: 1, user: 'Amani Otieno', action: 'registered for', target: 'Web Dev Bootcamp', time: '5 min ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AO&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 2, user: 'Brian Kariuki', action: 'completed', target: 'Intro to Open Source', time: '22 min ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BK&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 3, user: 'Cynthia Njeri', action: 'submitted project for', target: 'Hackathon Prep', time: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CN&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 4, user: 'David Kipchoge', action: 'joined chapter', target: 'Nakuru', time: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DK&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 5, user: 'Eunice Wanjiku', action: 'rated', target: 'Career Readiness (5 stars)', time: '3 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EW&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 6, user: 'Felix Mwangi', action: 'became mentor for', target: 'Mobile App Sprint', time: '5 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FM&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 7, user: 'Grace Achieng', action: 'exported', target: 'Q4 Membership Report', time: '6 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GA&backgroundColor=3b82f6&textColor=ffffff' },
  { id: 8, user: 'Hassan Omondi', action: 'created event', target: 'Nairobi Tech Meetup', time: '8 hours ago', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HO&backgroundColor=3b82f6&textColor=ffffff' },
];
