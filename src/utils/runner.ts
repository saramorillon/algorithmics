type Runner = {
  requestFrame(callback: () => void): void
  cancelFrame(): void
}

export function createRunner(type: 'frame'): Runner
export function createRunner(type: 'timeout', ms: number): Runner
export function createRunner(...args: ['frame'] | ['timeout', number]): Runner {
  if (args[0] === 'frame') {
    let requestId: number | null
    return {
      requestFrame: (callback: FrameRequestCallback) => {
        requestId = requestAnimationFrame(callback)
      },
      cancelFrame: () => {
        if (requestId !== null) {
          cancelAnimationFrame(requestId)
        }
      },
    }
  }

  let requestId: NodeJS.Timeout | null
  return {
    requestFrame: (callback: () => void) => {
      requestId = setTimeout(callback, args[1])
    },
    cancelFrame: () => {
      if (requestId !== null) {
        clearTimeout(requestId)
      }
    },
  }
}
