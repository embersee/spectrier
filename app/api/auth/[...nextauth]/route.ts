import { AuthDataValidator, objectToAuthDataMap } from "@telegram-auth/server";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: {},
      async authorize(credentials, req) {
        const validator = new AuthDataValidator({
          botToken: `${process.env.BOT_TOKEN}`,
        });

        const data = objectToAuthDataMap(req.query || {});

        const user = await validator.validate(data);

        if (user.username) {
          return {
            id: user.id.toString(),
            name: user.username,
            image: user.photo_url,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, //'supersecret' // also in vercel env variables
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    error: "/error",
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
