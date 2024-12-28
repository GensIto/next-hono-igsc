import { updateSession } from "@/middlewares/supabase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  await updateSession(request);
}

export const config = {
  matcher: ["/:path*"],
};
