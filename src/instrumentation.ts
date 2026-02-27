/**
 * Next.js instrumentation hook — runs once when the server starts.
 * Patches Node.js v25's broken built-in localStorage stub.
 * Node.js v25 exposes `globalThis.localStorage` but `getItem` is not a function
 * unless `--localstorage-file` is provided. Libraries like contentful's debug
 * module detect localStorage is defined and try to use it, crashing SSR.
 */
export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // Patch localStorage if it exists but getItem is not a real function
        if (
            typeof globalThis.localStorage !== "undefined" &&
            typeof (globalThis.localStorage as Storage).getItem !== "function"
        ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (globalThis as any).localStorage = {
                getItem: (_key: string) => null,
                setItem: (_key: string, _value: string) => { },
                removeItem: (_key: string) => { },
                clear: () => { },
                key: (_index: number) => null,
                length: 0,
            };
        }
    }
}
