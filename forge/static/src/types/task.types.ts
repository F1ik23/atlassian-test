type Priority = {
    iconUrl: string,
    id: string,
    name: string,
    self: string,
}

type Status = {
    description: string,
    iconUrl: string,
    id: string,
    name: string,
}

type Fields = {
    assignee: any,
    priority: Priority,
    status: Status,
    summary: string,
    duedate: string
}

export type Issues = {
    fields: Fields,
    id: string,
    key: string
}

export type TaskResponce = {
    isLast: boolean,
    issues: Issues[],
}

export type ExpandedTask = Issues & { 
    unassigned: number;
    lowFire: number;
};