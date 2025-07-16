// auth.d.ts
declare module "#auth-utils" {
  interface User {
    sub: string;
    given_name: string;
    family_name: string;
    email: string;
    picture: string;
    displayName: string;
  }

  interface UserSession {
    user: User;
  }

  interface SecureSessionData {
    user: User;
  }
}

export {};
