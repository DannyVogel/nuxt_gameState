// auth.d.ts
declare module "#auth-utils" {
  interface User {
    sub: string;
  }

  interface UserSession {
    user: User;
  }

  interface SecureSessionData {
    user: User;
  }
}

export {};
