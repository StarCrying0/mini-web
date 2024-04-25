import { loginService, registerService } from "@/app/services/auth.service";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const Authentication = {
  providers: [
    CredentialsProvider({
      async authorize(userInfo) {
        const newUserInfo = {
          email: userInfo.email,
          password: userInfo.password,
        };
        const login = await loginService(newUserInfo);
        if (login.status !== 400) {
          return login;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Adjust this based on your session strategy
  },
  pages: {
    signIn: "/login",
  },
};

const handler = nextAuth(Authentication);
export { handler as GET, handler as POST };

