/**
 * Application configuration object.
 * Contains URLs and path definitions for the main application.
 */
export const appConfig = {
    /** Frontend application URL */
    appUrl: process.env.APP_URL,
    /** Backend API URL */
    apiUrl: process.env.API_URL,
    /** Application route paths */
    paths: {
        HOME: '/',
        LOGIN: '/login',
        DASHBOARD: '/dashboard',
        // Add additional paths as needed
    },
};
