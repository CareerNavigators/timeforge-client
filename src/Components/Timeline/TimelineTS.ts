export interface TimelineTS {
    _id: string;
    title: string;
    meeting: string;
    createdBy: string;
    content: string;
    startTime: string;
    endTime: string;
}

export type Column = {
    key: string;
    title: string;
    dataType: string;
};
export type Row = {
    createdAt: string;
    email: string;
    name: string;
    role: string;
    totalMeeting: string;
    _id: string;
};
export type User = {
    _id: string;
    name: string;
    email: string;
    img_cover: string;
    location: string;
    timeZone: string;
    img_profile: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    phone: string;
    role: string;
    totalMeeting: number;
};

interface CreatedBy {
    _id: string;
    name: string;
}

export interface Meeting {
    _id: string;
    title: string;
    duration: string;
    createdBy: CreatedBy;
    eventType: string;
    camera: boolean;
    mic: boolean;
    attendee: number;
    createdAt: string;
}
export interface SingleMeeting {
    _id: string;
    title: string;
    duration: string;
    desc: string;
    createdBy: string;
    events: Record<string, string[]>;
    eventType: string;
    camera: boolean;
    mic: boolean;
    attendee: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
type Event = {
    _id: string;
    title: string;
};
export type Attendess = {
    _id: string;
    name: string;
    email: string;
    event: Event | null;
    createdAt: string;
};

type EventDocument = {
    _id: string;
    title: string;
    duration: string;
    createdBy: {
        _id: string;
        name: string;
    };
    eventType: string;
    camera: boolean;
    mic: boolean;
    attendee: number;
    createdAt: string;
};

type PaginationInfo = {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number;
};

export type EventResponse = {
    docs: EventDocument[];
} & PaginationInfo;

export type Attendee = {
    docs: Attendess[];
} & PaginationInfo;

interface Eventt {
    _id: string;
    title: string;
}
export interface TimelineItem {
    startTime: string;
    endTime: string;
    content: string;
    _id?: string;
}
interface MainObject {
    _id: string;
    event: Eventt;
    createdAt: string;
}

export type TimelineType = {
    docs: MainObject[];
} & PaginationInfo;

type UserType2 = {
    _id: string;
    name: string;
    email: string;
};
export type SingleTimeLine = {
    _id: string;
    createdBy: UserType2;
    guest: UserType2[];
    timeline: TimelineItem[];
    createdAt: string;
    event: {
        _id: string;
        startTime: string;
        endTime: string
    }
};
