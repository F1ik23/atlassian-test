
import api, { route } from '@forge/api';

export const assignUsers = async (projectKey: string) => {
    try {
        const res = await api.asUser().requestJira(
            route`/rest/api/3/user/assignable/search?project=${projectKey}`
        );
        if (!res.ok) {
            const text = await res.text();
            console.error('assign users service jira error', { status: res.status, statusText: res.statusText, body: text });
            return { ok: false, error: { status: res.status, statusText: res.statusText, body: text } };
        }
        return await res.json();
    } catch (e: any) {
        console.error('get users for assign exception: ', e?.message || e);
        return { ok: false, error: { message: e?.message || String(e) }};
    }
    
}