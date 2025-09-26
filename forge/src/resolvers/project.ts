import api, {route} from '@forge/api'; 

export default (resolver: any) => {
    resolver.define('project', async (req: any) => {
        try {
            const res = await api.asApp().requestJira(
                route`/rest/api/3/project/search?status=live`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (!res.ok) {
                const text = await res.text();
                console.error('project resolver jira error', { status: res.status, statusText: res.statusText, body: text });
                return { ok: false, error: { status: res.status, statusText: res.statusText, body: text } };
            }
            const json = await res.json();
            return { ok: true, ...json };
        } catch (e: any) {
            console.error('project resolver exception', e?.message || e);
            return { ok: false, error: { message: e?.message || String(e) } };
        }
    });

}