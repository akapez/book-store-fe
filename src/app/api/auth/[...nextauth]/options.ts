import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = process.env.API_BASE_URL as string;

// @ts-expect-error: Token type is dynamically determined
async function refreshAccessToken(token) {
  try {
    console.log("BEARER TOKEN:", token.refreshToken);
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });
    const tokens = await res.json();
    if (!res.ok) {
      console.log("ERROR: The token could not be refreshed!");
      throw tokens;
    }
    console.log("SUCCESS: The token has been refreshed.");
    const decodedAccessToken = JSON.parse(
      Buffer.from(tokens.access_token.split(".")[1], "base64").toString()
    );

    return {
      ...token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? token.refreshToken,
      accessTokenExpires: decodedAccessToken["exp"] * 1000,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        if (res.ok && user) {
          return {
            accessToken: user.access_token,
            refreshToken: user.refresh_token,
            role: user.user_info.role,
            email: user.user_info.email,
            id: user.user_info.id,
            firstName: user.user_info.first,
            lastName: user.user_info.last,
            image: user.user_info.image,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user, trigger, session }) => {
      if (
        trigger === "update" &&
        ((session?.firstName && session?.lastName) || session?.image)
      ) {
        token.firstName = session.firstName;
        token.lastName = session.lastName;
        token.image = session.image;
      }
      if (account && user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.image = user.image;
        const decodedAccessToken = JSON.parse(
          Buffer.from(user.accessToken.split(".")[1], "base64").toString()
        );
        if (decodedAccessToken) {
          token.userId = decodedAccessToken["sub"] as string;
          token.accessTokenExpires = decodedAccessToken["exp"] * 1000;
        }
      }
      if (
        (token.accessTokenExpires &&
          Date.now() < Number(token.accessTokenExpires)) ||
        token.error == "RefreshAccessTokenError"
      ) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          role: token.role as string,
          image: token.image as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
        },
        error: token.error,
      };
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
};
