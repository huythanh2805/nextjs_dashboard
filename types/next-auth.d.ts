import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    givenName?: string | null;
    preferLanguage?: string | null;
    role?: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    givenName: string | null;
    preferLanguage: string | null;
    role?: string | null;
  }
}