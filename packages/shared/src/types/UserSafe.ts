export interface UserSafe {
  id: string;
  email: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  emailVerified: boolean;
  role: 'admin' | 'user' | 'superadmin';
  createdAt: string;
}
