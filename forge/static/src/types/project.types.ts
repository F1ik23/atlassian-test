export type ProjectValue = {
    entityId: string;
    id: string;
    key: string;
    name: string;
    uuid: string;
}

export type Projects = {
    isLast: boolean;
    maxResults: number;
    self: string;
    startAt: number;
    total: number;
    values: ProjectValue[];
}