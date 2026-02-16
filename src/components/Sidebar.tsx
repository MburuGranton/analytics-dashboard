import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileBarChart,
  Settings,
  Sun,
  Moon,
  BarChart3,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/users', icon: Users, label: 'Members' },
  { to: '/reports', icon: FileBarChart, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar: React.FC = () => {
  const { dark, toggle } = useTheme();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-60 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c0e14]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center shrink-0">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900 dark:text-white">AYSE</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
          const isOverviewActive = to === '/' && location.pathname === '/';
          const active = to === '/' ? isOverviewActive : isActive;

          return (
            <NavLink
              key={to}
              to={to}
              className={`sidebar-link ${active ? 'active' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggle}
          className="sidebar-link w-full text-gray-600 dark:text-gray-400"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
          <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
