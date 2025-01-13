/**
 * This is route by default will be redirected when user login
 * @type {string}
 */
export const defaultRouteRedirect = "/"
/**
 * This is api auth prefix
 * @type {string}
 */
export const authApiPrefix = "/api/auth"
/**
 * These are public routes
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
]
/**
 * These are auth routes
 * @type {string[]}
 */
export const authRoutes = [
  '/login',
  '/register',
  '/verificationToken'
]