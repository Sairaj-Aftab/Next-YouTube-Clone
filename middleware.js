// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/profile/:path*", "/upload", "/liked_videos"],
// };
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let cookie = request.cookies.get("next-auth.session-token");
  if (!request.cookies.has("__Secure-next-auth.session-token")) {
    return NextResponse.redirect(new URL("/sign", request.url));
  }
  if (!request.cookies.has("next-auth.session-token")) {
    return NextResponse.redirect(new URL("/sign", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*", "/upload", "/liked_videos"],
};
