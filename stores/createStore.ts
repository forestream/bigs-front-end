"use client";

export function createStore<State>(initState: State) {
	let state = initState;

	const subscriptions = new Set<() => void>();

	const get = () => state;

	const set = (newState: State) => {
		state = newState;
		subscriptions.forEach((subscriber) => subscriber());
	};

	const subscribe = (subscriber: () => void) => {
		subscriptions.add(subscriber);

		return () => subscriptions.delete(subscriber);
	};

	return { get, set, subscribe };
}
