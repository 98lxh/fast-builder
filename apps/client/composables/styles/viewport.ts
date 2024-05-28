import { useDebounceFn, tryOnMounted, tryOnUnmounted } from "@vueuse/core";

export interface ViewportOptions {
  wait: number;
  immediate: boolean;
}

const defaultOptions: ViewportOptions = {
  wait: 150,
  immediate: true
}

export function useViewport({ wait, immediate } = defaultOptions) {
  const viewport = shallowReactive({ width: 0, height: 0 });

  const resize = useDebounceFn(listener, wait);
  function listener() {
    const { innerWidth, innerHeight } = window;
    viewport.height = innerHeight;
    viewport.width = innerWidth;
  }

  function start() {
    if (immediate) { listener() };
    window.addEventListener("resize", resize);
  }

  const end = () => window.removeEventListener("resize", resize);
  tryOnMounted(start);
  tryOnUnmounted(end);
  return viewport;
}


export function useIsMobile() {
  const viewport = useViewport()
  const isMobile = computed(() => viewport.width <= 997)
  return isMobile
}
