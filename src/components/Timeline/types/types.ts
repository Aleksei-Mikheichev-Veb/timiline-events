// Types
export interface TimelinePeriod {
    id: number;
    startYear: number;
    endYear: number;
    title: string;
    events: TimelineEvent[];
}

export interface TimelineEvent {
    id: number;
    date: string;
    description: string;
}
