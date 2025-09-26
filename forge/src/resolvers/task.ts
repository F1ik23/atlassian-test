import api, {route} from '@forge/api'; 

export default (resolver: any) => {
    resolver.define('task', async (req: any) => {
        const projectKey = req?.payload?.projectKey;
        try {
            const res = await api.asUser().requestJira(
                route`/rest/api/3/search/jql`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jql: `project = ${projectKey} ORDER BY key ASC`,
                        fields: ["key",	"summary", "status", "assignee", "priority", "duedate"],
                    }),
                },
            );
            if (!res.ok) {
                const text = await res.text();
                console.error('task resolver jira error', { status: res.status, statusText: res.statusText, body: text });
                return { ok: false, error: { status: res.status, statusText: res.statusText, body: text } };
            }
            const json = await res.json();
            return { ok: true, ...json };
        } catch (e: any) {
            console.error('task resolver exception', e?.message || e);
            return { ok: false, error: { message: e?.message || String(e) } };
        }
    });

    resolver.define('priority', async(req: any) => {
        const taskId = req?.payload?.taskId;
        const priority = req?.payload?.priority;
        try {
            const res = await api.asUser().requestJira(
                route`/rest/api/3/issue/${taskId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "fields": {
                            "priority": {
                                "id": priority
                            }
                        },
                    }),
                },
            );
            if (!res.ok) {
                const text = await res.text();
                console.error('increase priority jira error', { status: res.status, statusText: res.statusText, body: text });
                return { ok: false, error: { status: res.status, statusText: res.statusText, body: text } };
            }
            const json = await res.json();
            return { ok: true, ...json };
        } catch (e: any) {
            console.error('increase priority resolver exception', e?.message || e);
            return { ok: false, error: { message: e?.message || String(e) } };
        }
    })

}