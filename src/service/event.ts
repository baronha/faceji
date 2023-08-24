import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export type ValidEventTypes = string | symbol | object;

export type EventName = 'menu' | '';

export const Emitter = {
  on: (event: EventName, fn: any) => eventEmitter.on(event, fn),
  once: (event: EventName, fn: any) => eventEmitter.once(event, fn),
  off: (event: EventName, fn: any, context?: any, once?: boolean) =>
    eventEmitter.off(event, fn, context, once),
  emit: (
    event: EventName,
    ...args: EventEmitter.EventArgs<ValidEventTypes, EventName>
  ) => eventEmitter.emit(event, ...args),
};

Object.freeze(Emitter);
