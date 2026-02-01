/**
 * Utility service configuration object.
 * Contains URLs and path definitions for utility/helper services.
 */
export const utilityConfig = {
    /** Utility service base URL */
    baseUrl: process.env.UTILITY_URL,
    /** Utility API paths */
    paths: {
        EXAMPLE: '/api/v2/example',
        // Add additional paths as needed
    },
};
