import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
const middleware = (req) => {
  return NextResponse.next();
};
export default withAuth(middleware, {
  secret: "QKKfCJCaPqzmAlK+xDYCVQ==",
  callbacks: {
    async authorized({ req, token }) {
      if (req.nextUrl.pathname === "/admin") {
        return token?.role === "Admin";
      } else if (req.nextUrl.pathname === "/gudang") {
        return token?.role === "Gudang";
      } else if (req.nextUrl.pathname === "/kasir") {
        return token?.role === "Kasir";
      }
    },
  },
});
export const config = {
  matcher: ["/admin", "/gudang", "/kasir"],
};
