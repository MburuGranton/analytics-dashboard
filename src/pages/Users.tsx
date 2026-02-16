import React from 'react';
import DataTable from '../components/DataTable';
import { users, User } from '../data/mockData';

const statusBadge = (status: string) => {
  const cls =
    status === 'active'
      ? 'badge-active'
      : status === 'pending'
      ? 'badge-pending'
      : 'badge-inactive';
  return <span className={cls}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
};

const columns = [
  {
    key: 'name' as keyof User,
    label: 'Name',
    sortable: true,
    render: (val: any, row: User) => (
      <div className="flex items-center gap-3">
        <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full" />
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
        </div>
      </div>
    ),
  },
  { key: 'role' as keyof User, label: 'Role', sortable: true },
  {
    key: 'status' as keyof User,
    label: 'Status',
    sortable: true,
    render: (val: any) => statusBadge(val),
  },
  { key: 'joinDate' as keyof User, label: 'Joined', sortable: true },
  { key: 'lastActive' as keyof User, label: 'Last Active', sortable: false },
];

const UsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">User accounts and activity.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
          <p className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-1">{users.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {users.filter((u) => u.status === 'active').length}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-display font-bold text-amber-600 dark:text-amber-400 mt-1">
            {users.filter((u) => u.status === 'pending').length}
          </p>
        </div>
      </div>

      <DataTable
        title="All Users"
        data={users}
        columns={columns}
        searchKeys={['name', 'email', 'role']}
        pageSize={8}
      />
    </div>
  );
};

export default UsersPage;
