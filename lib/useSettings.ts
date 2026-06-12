import { useEffect, useState, useCallback } from 'react';
import { getSettings, settingsStore, resolveTokens, DEFAULT_SETTINGS, type NovaSettings } from './settings';
import type { ThemeTokens } from './tokens';

/** React hook: live settings, resolved tokens, and writers back to chrome.storage. */
export function useSettings() {
  const [settings, setSettings] = useState<NovaSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    getSettings().then((s) => {
      if (active) {
        setSettings(s);
        setLoaded(true);
      }
    });
    const unwatch = settingsStore.watch((next) => next && setSettings(next));
    return () => {
      active = false;
      unwatch();
    };
  }, []);

  const patch = useCallback(
    (p: Partial<NovaSettings>) => {
      setSettings((cur) => {
        const next = { ...cur, ...p };
        settingsStore.setValue(next);
        return next;
      });
    },
    [],
  );

  /** Override a single design token (writes into settings.overrides). */
  const setToken = useCallback(<K extends keyof ThemeTokens>(key: K, value: ThemeTokens[K]) => {
    setSettings((cur) => {
      const next = { ...cur, overrides: { ...cur.overrides, [key]: value } };
      settingsStore.setValue(next);
      return next;
    });
  }, []);

  /** Snapshot the current look (active theme + overrides) as a reusable saved theme. */
  const saveTheme = useCallback((name: string, emoji = '⭐') => {
    setSettings((cur) => {
      const tokens = resolveTokens(cur);
      const id = `custom-${Date.now().toString(36)}`;
      const preset = { id, name: name.trim() || 'My theme', emoji, blurb: 'Saved theme', tokens };
      const next = { ...cur, customThemes: [...(cur.customThemes ?? []), preset], themeId: id, overrides: {} };
      settingsStore.setValue(next);
      return next;
    });
  }, []);

  const deleteTheme = useCallback((id: string) => {
    setSettings((cur) => {
      const customThemes = (cur.customThemes ?? []).filter((p) => p.id !== id);
      const themeId = cur.themeId === id ? 'midnight' : cur.themeId;
      const next = { ...cur, customThemes, themeId };
      settingsStore.setValue(next);
      return next;
    });
  }, []);

  const tokens = resolveTokens(settings);
  return { settings, tokens, patch, setToken, saveTheme, deleteTheme, loaded };
}
