import { defineConfig } from 'wxt';

// WXT config — https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Nova Canvas',
    description: 'Restyle and customize the Canvas LMS UI — a friendlier Canvas, your way.',
    // host_permissions are kept broad-but-opt-in: the default Instructure host plus
    // optional_host_permissions for whatever custom school domain the user adds.
    permissions: ['storage'],
    host_permissions: ['*://*.instructure.com/*'],
    optional_host_permissions: ['*://*/*'],
  },
});
