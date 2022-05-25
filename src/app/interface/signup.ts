export interface Signup {
  username: string;
  email: string;
  password: string;
  roles: 'admin' | 'user';
}
