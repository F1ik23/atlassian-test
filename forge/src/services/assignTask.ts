
import api, { route } from '@forge/api';

export const assignTask = async (issueKey: string, userId: string) => {
    try {
        const res = await api.asApp().requestJira(
            route`/rest/api/3/issue/${issueKey}/assignee`,
            {
                method: 'PUT',
                body: JSON.stringify({ accountId: userId }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!res.ok) {
            const text = await res.text();
            console.error('assign task service jira error', { status: res.status, statusText: res.statusText, body: text });
            return { ok: false, error: { status: res.status, statusText: res.statusText, body: text } };
        }
    } catch (e: any) {
        console.error('get unassigned issues exception: ', e?.message || e);
        return { ok: false, error: { message: e?.message || String(e) } };
    }

};