import { createStore } from "./createStore";

export const authStore = createStore<User | null>(null);
