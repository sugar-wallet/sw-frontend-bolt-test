import { EventEmitter } from 'eventemitter3'

interface IEventEmitter {
  addListener: (
    event: string | symbol,
    func: (...args: unknown[]) => void
  ) => void
  removeListener: (
    event: string | symbol,
    func: (...args: unknown[]) => void
  ) => void
  once: (event: string | symbol, func: (...args: unknown[]) => void) => void
  emit: (event: string | symbol, data?: unknown) => void
}

const createEventEmitter = (): IEventEmitter => {
  const eventEmitter = new EventEmitter()

  const eventObject: IEventEmitter = {
    addListener: (event, func) => eventEmitter.addListener(event, func),
    removeListener: (event, func) => eventEmitter.removeListener(event, func),
    once: (event, func) => eventEmitter.once(event, func),
    emit: (event, data) => eventEmitter.emit(event, data)
  }

  return Object.freeze(eventObject)
}

export { EventEmitter, createEventEmitter }
export type { IEventEmitter }
