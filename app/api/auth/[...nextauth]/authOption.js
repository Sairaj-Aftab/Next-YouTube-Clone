import connectMongoDB from "../../../../config/database";
import User from "@/models/user";
import { comparePassword } from "@/utils/hashComPass";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectMongoDB();
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User not found");
        }
        const checkPassword = comparePassword(
          credentials.password,
          user.password
        );

        if (!checkPassword) {
          throw new Error("Wrong password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign",
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.doc = token._doc;
      return session;
    },
  },
};
