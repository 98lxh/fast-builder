export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const DARK_MODE = "DARK_MODE";
const DARK_THEME_CLASS = "dark";
const LIGHT_THEME_CLASS = "light";

const darkMode = ref(Theme.DARK);

export function useDarkMode() {
  let isAppearanceTransition: undefined | boolean = undefined;
  let isDarkMode: boolean | null = null;
  let cacheDarkMode: string | null = null;

  onMounted(() => {
    isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    cacheDarkMode = localStorage.getItem(DARK_MODE) as Theme | null;
    isAppearanceTransition = document.startViewTransition && !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  })

  const initDarkMode = () => {
    if (isDarkMode && !cacheDarkMode) {
      setDarkMode(true);
      return;
    }
    setDarkMode(cacheDarkMode === Theme.DARK);
  };

  const toggleDarkMode = (event: MouseEvent) => {
    const isDark = document.documentElement.classList.contains("dark");

    if (!isAppearanceTransition) {
      setDarkMode(!isDark);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(() => {
      setDarkMode(!isDark);
    });

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      document.documentElement.animate(
        { clipPath: isDark ? clipPath : [...clipPath].reverse() },
        {
          duration: 300, easing: "ease-in", pseudoElement: isDark
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)"
        },
      );
    });
  };

  function setDarkMode(state = false) {
    const themeClass = state ? DARK_THEME_CLASS : LIGHT_THEME_CLASS;
    const themeValue = state ? Theme.DARK : Theme.LIGHT;

    document.documentElement.classList.remove(state ? LIGHT_THEME_CLASS : DARK_THEME_CLASS)
    document.documentElement.classList.add(state ? DARK_THEME_CLASS : LIGHT_THEME_CLASS)

    document.documentElement.setAttribute("data-theme", themeClass);
    darkMode.value = themeValue;
    localStorage.setItem(DARK_MODE, themeValue);
  };

  return {
    toggleDarkMode,
    initDarkMode,
    setDarkMode,
    darkMode,
  };
}
