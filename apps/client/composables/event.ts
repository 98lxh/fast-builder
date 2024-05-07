export interface MoveListenerOptions {
  startX: number
  startY: number
  currentX: number
  currentY: number
  lastX: number
  lastY: number
}

interface DocumentMouseEventListener {
  down?(evt?: MouseEvent, ...args: any[]): void | boolean
  move(options?: MoveListenerOptions, ...args: any[]): void
  up?(evt?: MouseEvent): void
}

export function useDocumentMouseEvent(listener: DocumentMouseEventListener) {
  let valve = true;

  function onMousedown(downEvent: MouseEvent, ...args: any[]) {
    const result = (listener.down && listener.down(downEvent, ...args));
    result === false ? (valve = false) : (valve = true)

    const startX = downEvent.clientX
    const startY = downEvent.clientY

    let lastX = startX;
    let lastY = startY;

    function onMousemove(moveEvent: MouseEvent) {
      if (valve === false) {
        return
      }

      const currentX = moveEvent.clientX
      const currentY = moveEvent.clientY
      listener.move({ startX, startY, currentX, currentY, lastX, lastY }, ...args)
      lastX = currentX
      lastY = currentY
    }

    function onMouseup(upEvent: MouseEvent) {
      listener.up && listener.up(upEvent)
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)

  }

  return onMousedown
}

interface EventOutsideOptions {
  event: 'click' | 'mousedown',
  isOnlyChildContains: boolean
}

const defaultEventOutsideOptions: EventOutsideOptions = {
  event: 'click',
  isOnlyChildContains: false,
}

export function useEventOutside(options = defaultEventOutsideOptions, callback: () => void) {
  const target = ref<HTMLElement | null>(null)
  const { event, isOnlyChildContains } = options

  function listener(evt: MouseEvent) {
    if (!target.value) {
      return
    }

    const isContains = isOnlyChildContains
      ? ([...target.value.childNodes]).some(el => el.contains(evt.target as HTMLElement))
      : target.value.contains(evt.target as HTMLElement)

    if (isContains) {
      return
    }

    callback()
  }

  onMounted(() => nextTick(() => document.documentElement.addEventListener(event, listener)))
  onUnmounted(() => document.documentElement.removeEventListener(event, listener))
  return target
}
