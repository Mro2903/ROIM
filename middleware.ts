/**
 * Next.js middleware for handling authentication and route protection.
 * This middleware manages access control for different routes based on authentication status.
 * 
 * Routes are categorized into:
 * - Auth Routes: Pages that should only be accessible to non-authenticated users
 * - Protected Routes: Pages that require authentication
 * - API Routes: Backend endpoints that bypass this middleware
 */

import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

/** Routes that should only be accessible to non-authenticated users */
const AuthRoutes = ["/login", "/register", "/verify-email", "/forgot", "/reset-password"]

/** Routes that require authentication to access */
const ProtectedRoutes = ["/u"];

const { auth: middleware } = NextAuth(authConfig)

/**
 * Middleware function that handles route protection and authentication redirects
 * @param {NextRequest} req - The incoming request object
 * @returns {Response|undefined} - Redirect response or undefined to continue
 */
export default middleware(async function middleware(req: NextRequest) {
    const isAuth = !!req.auth
    const isAuthRoute = AuthRoutes.includes(req.nextUrl.pathname)
    const isProtectedRoute = ProtectedRoutes.includes(req.nextUrl.pathname)
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")
    
    // Skip middleware for API routes
    if (isApiRoute) return;
    
    // Handle unauthenticated users
    if (!isAuth) {
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        return;
    } else {
        // Redirect authenticated users away from auth pages
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }
})

/** Middleware configuration to specify which routes should be processed */
export const config = { matcher: ['/((?!api|_next/static|_next/image|logo.png).*)'] }