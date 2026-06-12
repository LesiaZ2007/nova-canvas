import ReactDOM from 'react-dom/client';
import { Panel } from '@/components/Panel';
import '@/components/panel.css';

// Mounts the in-page Nova Canvas control panel (floating button + drawer) inside
// a shadow root so its styles never clash with Canvas. Lets the user switch
// themes and edit colors live, right on the Canvas page.
export default defineContentScript({
  matches: ['*://*.instructure.com/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'nova-canvas-panel',
      position: 'overlay',
      zIndex: 2147483646,
      anchor: 'body',
      append: 'last',
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<Panel />);
        return root;
      },
      onRemove: (root) => root?.unmount(),
    });
    ui.mount();
  },
});
