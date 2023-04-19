declare global {
  interface Document {
    startViewTransition: (fn: () => void) => void
  }
}

export default function startTransition(fn: () => void) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    fn()
    return
  }

  // With a transition:
  document.startViewTransition(() => fn())
}
