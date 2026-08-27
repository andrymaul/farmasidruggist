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
  },
  {
    id: 'admin-main-001',
    name: 'Andry Maulana (Super Admin)',
    email: 'andrymaul.aem@gmail.com',
    password: 'admin123',
    phone: '0812-8899-0011',
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
    lastLoginAt: '2026-08-27T09:30:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'admin-main-002',
    name: 'andrymaul.am (Super Admin)',
    email: 'andrymaul.am@gmail.com',
    password: 'admin123',
    phone: '0812-7788-9922',
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
    lastLoginAt: '2026-08-27T09:30:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

