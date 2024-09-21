export interface Phone {
    type: string;
    number: string;
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    phones: Phone[];
}
