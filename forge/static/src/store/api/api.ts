import { createApi } from '@reduxjs/toolkit/query/react';
import { type BaseQueryFn } from '@reduxjs/toolkit/query';

let cachedInvoke: ((endpoint: string, params?: any) => Promise<any>) | null = null;

async function getForgeInvoke(): Promise<(endpoint: string, params?: any) => Promise<any>> {
    if (cachedInvoke) return cachedInvoke;
    try {
        const mod: any = await import('@forge/bridge');
        cachedInvoke = mod.invoke as typeof cachedInvoke;
        if (!cachedInvoke) {
            throw new Error('Forge bridge invoke not available');
        }
        return cachedInvoke;
    } catch (error) {
        return async () => {
            throw new Error('Forge bridge is unavailable in this environment');
        };
    }
}

const forgeBaseQuery: BaseQueryFn<
    { endpoint: string; params?: any },
    unknown,
    unknown
> = async ({ endpoint, params }) => {
    try {
        const invoke = await getForgeInvoke();
        const data = await invoke(endpoint, params);
        return { data };
    } catch (error: any) {
        return { error };
    }
};

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Task', 'User'],
    baseQuery: forgeBaseQuery,
    endpoints: () => ({}),
})