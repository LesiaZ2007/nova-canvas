import { settingsStore } from '@/lib/settings';

export default defineBackground(() => {
  // Register the content script on the default Instructure host. Custom school
  // hosts are registered on demand once the user grants permission in options.
  browser.runtime.onInstalled.addListener(async () => {
    await settingsStore.getValue(); // seed defaults on first install
  });
});
