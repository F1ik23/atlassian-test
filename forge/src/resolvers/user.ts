
import { getUnassignedTasks } from '../services/getUnassignableTasks';
import { assignTask } from '../services/assignTask';
import { assignUsers } from '../services/assignUsers';
import { getUpdatedTasks } from '../services/getUpdatedTasks';
import dayjs from 'dayjs';

export default (resolver: any) => {
    resolver.define('user', async (req: any) => {
        const projectKey = req.payload.projectKey;
        const tasks = await getUnassignedTasks(projectKey);
        const users = await assignUsers(projectKey);

        for (const issue of tasks) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            await assignTask(issue.key, randomUser.accountId);
        }

        return { assignedCount: tasks.length };
    });

    resolver.define('manual', async (req: any) => {
        const taskId = req?.payload?.taskId;
        const userId = req?.payload?.userId;
        try {
            await assignTask(taskId, userId);
            return { ok: true }
        } catch (e: any) {
            console.error('issue assign resolver exception', e?.message || e);
            return { ok: false, error: { message: e?.message || String(e) } };
        }
    })

    resolver.define('assignable', async (req: any) => {
        const projectKey = req?.payload?.projectKey;
        try {
            const users = await assignUsers(projectKey);
            return users
        } catch (e: any) {
            console.error('assignable users resolver exception', e?.message || e);
            return { ok: false, error: { message: e?.message || String(e) } };
        }
    })

    resolver.define('project-users', async (req: any) => {
        try {
            const projectId = req.payload.projectId;
            const users = await assignUsers(projectId);

            const stats = [];
            for (const user of users) {
                const tasks = await getUpdatedTasks(projectId, user);
                const issues = tasks.issues || [];
                const total = issues.length;
                const active = issues.filter((issue: any) => dayjs(issue.fields.updated).isAfter(dayjs().subtract(7, "day")))

                stats.push({
                    accountId: user.accountId,
                    displayName: user.displayName,
                    avatarUrls: user.avatarUrls,
                    assignedTasks: total,
                    updatedTasksLastWeek: active.length,
                });
            }

            return stats;


        } catch (e: any) {
            console.error('users resolver exception', e?.message || e);
            return { ok: false, error: { message: e?.message || String(e) } };
        }
    })
}