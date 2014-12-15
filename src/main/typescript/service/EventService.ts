import { EventSubscriber } from "../definition/EventSubscriber";
import { AppEvent } from "../definition/AppEvent";

export default class EventService {
    subscribers: EventSubscriber[] = [];

    subscribe = (subs:EventSubscriber) => {
        this.subscribers.push(subs);
        return () => this.unsubscribe(subs);
    }

    unsubscribe = (subs:EventSubscriber) => {
        this.subscribers = this.subscribers.filter(currentSubs => subs !== currentSubs);
    }

    trigger = (event:AppEvent) => {
        this.subscribers.forEach(subs => subs(event));
    }

}