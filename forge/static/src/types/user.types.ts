


type UserAvatar = {
    "16x16": string,
    "24x24": string,
    "32x32": string,
    "48x48": string
}

export type User = {
    accountId: string,
    avatarUrls: UserAvatar,
    displayName: string
}

export type UserTeam = {
    accountId: string,
    displayName: string,
    avatarUrls: UserAvatar,
    assignedTasks: number,
    updatedTasksLastWeek: number
}