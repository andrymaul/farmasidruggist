import { AdminUser } from '../types';

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin-main-000',
    name: 'System Administrator (Admin Utama System)',
    email: 'admin@farmasidruggist.com',
    password: 'admin123',
    phone: '0811-0000-9999',
    roleType: 'Super Admin',
    permissions: {
      canManageDrugs: true,
      canManageInteractions: true,
      canManageSubscriptions: true,
      canManagePricing: true,
      canManageFoodInteractions: true,
      canViewAuditLogs: true,
      canManageTeamAdmins: true
    },
    status: 'active',
    lastLoginAt: '2026-08-14T09:30:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

