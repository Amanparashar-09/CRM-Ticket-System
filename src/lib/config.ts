// Application Configuration
export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'CRM Ticket System',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  // Add your Supabase configuration here
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
};

// Validate required environment variables
if (!config.supabase.url || !config.supabase.anonKey) {
  console.error('Missing required Supabase configuration. Please check your .env file.');
}

// Log configuration (only in development)
if (import.meta.env.DEV) {
  console.log('Application Configuration:', {
    appName: config.appName,
    apiUrl: config.apiUrl,
    supabaseUrl: config.supabase.url ? 'Configured' : 'Missing',
    supabaseAnonKey: config.supabase.anonKey ? 'Configured' : 'Missing',
  });
} 