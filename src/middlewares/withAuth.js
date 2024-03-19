const { getToken } = require("next-auth/jwt");
const { NextResponse } = require("next/server");
const withAuth = (middleware, requireAuth = []) => {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({ req, secret: "QKKfCJCaPqzmAlK+xDYCVQ==" });
      if (!token) {
        const url = new URL("/auth/login", req.url);
        return NextResponse.redirect(url);
      }
      return middleware(req, next);
    }
  };
};
export default withAuth;
