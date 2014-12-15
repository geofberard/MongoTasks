import { AppEvent } from "./AppEvent";

export type EventSubscriber = (event: AppEvent) => void