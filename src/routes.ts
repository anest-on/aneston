// This routes require authentication
export const privateRoutes = ['/settings']

// This routes will redirect logged in users to /settings
export const authRoutes = ['/', '/dashboard']

// Routes that starts with this prefix are used for API authentication purposes
export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/settings'
