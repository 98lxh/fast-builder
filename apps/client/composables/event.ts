import { isBoolean, isFunction } from "@h5-designer/shared"

export interface MoveListenerOptions<T = any> {
  startX: number
  startY: number
  currentX: number
  currentY: number
  lastX: number
  lastY: number
  deltaX: number
  deltaY: number
  result: T
}

interface DocumentMouseEventListener<T = any> {
  down?(evt?: MouseEvent, ...args: any[]): void | boolean | T
  move(options?: MoveListenerOptions<T>, ...args: any[]): void
  up?(evt?: MouseEvent): void
}

export function useDocumentMouseEvent(listener: DocumentMouseEventListener) {
  let valve = true;

  function onMousedown(downEvent: MouseEvent, ...args: any[]) {
    const result = (listener.down && listener.down(downEvent, ...args))

    if (isBoolean(result)) {
      result === false ? (valve = false) : (valve = true)
    }

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
      const deltaX = currentX - lastX
      const deltaY = currentY - lastY

      listener.move({ startX, startY, currentX, currentY, deltaX, deltaY, lastX, lastY, result }, ...args,)
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
  isOnlyChildContains?: boolean
}

const defaultEventOutsideOptions: EventOutsideOptions = {
  event: 'click',
  isOnlyChildContains: false,
}

export function useEventOutside(options = defaultEventOutsideOptions, callback: () => void) {
  const target = ref<HTMLElement | null>(null)
  let { event, isOnlyChildContains } = options
  let header: HTMLElement | null = null
  let attributePanel: HTMLElement | null = null

  function listener(evt: MouseEvent) {
    if (!target.value) { return }
    const evtTarget = evt.target as HTMLElement
    let isContains = isOnlyChildContains ? ([...target.value.childNodes]).some(el => el.contains(evt.target as HTMLElement)) : target.value.contains(evtTarget)
    if(attributePanel) isContains = attributePanel.contains(evtTarget) || isContains
    if(header) isContains = header.contains(evtTarget) || isContains
    if (isContains) { return }
    callback()
  }

  onMounted(() => nextTick(() => {
    document.documentElement.addEventListener(event, listener)
    if (event !== 'mousedown') { return }
    /* 当事件为mousedown时排除header和attributePanel */
    header = document.getElementById('header')
    attributePanel = document.getElementById('attribute-panel')
  }))

  onUnmounted(() => document.documentElement.removeEventListener(event, listener))
  return target
}
