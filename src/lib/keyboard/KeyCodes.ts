
export enum KeyCode {
  Enter = 13,
  Escape = 27,
}

export function onEscape(callback: () => void) {
  return onKeyCode(KeyCode.Escape, callback)
}

export function onEnter(callback: () => void) {
  return onKeyCode(KeyCode.Enter, callback)
}

export function onKeyCode(code: KeyCode, callback: () => void): () => void {
  const cb = (evt: KeyboardEvent) => {
    if (evt.keyCode === code) {
      callback()
    }
  }
  document.addEventListener("keydown", cb)
  return () => document.removeEventListener("keydown", cb)
}
