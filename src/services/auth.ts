export class AuthService {
  private isAuthenticated = false;
  
  login(username: string, password: string): boolean {
    // Mock authentication logic
    this.isAuthenticated = username === 'admin' && password === 'password';
    return this.isAuthenticated;
  }
  
  logout(): void {
    this.isAuthenticated = false;
  }
  
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}