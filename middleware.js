export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile/:path*", "/upload", "/liked_videos"],
};