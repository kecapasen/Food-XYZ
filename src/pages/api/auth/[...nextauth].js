import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/libs/pool";
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: "QKKfCJCaPqzmAlK+xDYCVQ==",
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { username, password } = credentials;
        const connection = await pool.getConnection();
        try {
          const [result, _] = await connection.query(
            "select id, tipe_user, username, password from tb_user where username = ?",
            [username]
          );
          const key = password || null;
          const match = result.length === 1 && result[0].password === key;
          if (match) {
            try {
              await connection.query(
                "insert into tb_log (id_user, aktivitas) values (?, ?)",
                [result[0].id, "Login"]
              );
              return {
                id: result[0].id,
                username: result[0].username,
                role: result[0].tipe_user,
              };
            } catch (error) {
              console.error("Error during authorization:", error.message);
            } finally {
              connection.release();
            }
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error.message);
        } finally {
          connection.release();
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  events: {
    signOut: async ({ token }) => {
      const connection = await pool.getConnection();
      try {
        await connection.query(
          "insert into tb_log (id_user, aktivitas) values (?, ?)",
          [token.id, "Logout"]
        );
      } catch (error) {
        console.error("Error during authorization:", error.message);
      } finally {
        connection.release();
      }
    },
  },
});
