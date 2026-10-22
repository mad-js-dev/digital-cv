import { reactive, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'

export interface SizeProxy {
  w: number
  h: number
}

/**
 * Measures a container's size and exposes an *animated* size that chases the
 * measured size with a GSAP tween. The first measurement snaps (no animation
 * on mount); subsequent measurements tween so the shape morphs to its new size
 * instead of jumping.
 */
export function useResizeMorph(containerRef: Ref<HTMLElement | null>) {
  const size = reactive<SizeProxy>({ w: 0, h: 0 })

  let observer: ResizeObserver | null = null
  let tween: gsap.core.Tween | null = null
  let initialized = false

  const snap = (w: number, h: number) => {
    size.w = w
    size.h = h
  }

  const measure = () => {
    const el = containerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (!initialized) {
      initialized = true
      snap(rect.width, rect.height)
      return
    }
    tween?.kill()
    // Tween a plain object and sync back to the reactive `size` on each tick —
    // GSAP does not reliably drive Vue reactive proxies directly.
    const proxy = { w: size.w, h: size.h }
    tween = gsap.to(proxy, {
      w: rect.width,
      h: rect.height,
      duration: 0.6,
      ease: 'expo.inOut',
      onUpdate: () => {
        size.w = proxy.w
        size.h = proxy.h
      },
    })
  }

  onMounted(() => {
    measure()
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      observer.observe(containerRef.value!)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    tween?.kill()
  })

  return { size }
}
