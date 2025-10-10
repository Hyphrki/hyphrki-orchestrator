export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  expires_in?: number;
  token_type?: string;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  subscription_tier?: string;
  firstName?: string;
  lastName?: string;
  organizationId?: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (passwordData: ChangePasswordRequest) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}
