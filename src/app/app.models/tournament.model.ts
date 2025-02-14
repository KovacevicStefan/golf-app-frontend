export interface Tournament {
    id: number;
    name: string;
    date: Date;
    status: boolean;
    location: string;
    description: string;
    rounds: number;
}