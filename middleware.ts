import {withAuth} from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/"
  }
})

export const config = {
  // /users 로 시작하는 모든 route
  matcher: [
    "/users/:path*"
  ]
}