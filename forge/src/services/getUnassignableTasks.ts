
import api, { route } from '@forge/api';

export const getUnassignedTasks = async (projectKey: string) => {
    try {
        const res = await api.asApp().requestJira(
            route`/rest/api/3/search/jql`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jql: `project = ${projectKey} AND assignee is EMPTY ORDER BY key ASC`,
                    fields: ["key", "summary", "status", "assignee", "priority", "dateIssued"],
                }),
            },
        );
        if (!res.ok) {
            const text = await res.text();
            console.error('unassignable tasks service jira error', { status: res.status, statusText: res.statusText, body: text });
            return { ok: false, error: { status: res.status, statusText: res.statusText, body: text } };
        }
        return await res.json();
    } catch (e: any) {
        console.error('get unassigned tasks exception: ', e?.message || e);
        return { ok: false, error: { message: e?.message || String(e) } };
    }

};