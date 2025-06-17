export interface Tournament {
    id: number;
    name: string;
    status: boolean;
    location: string;
    description: string;
    startDate: Date;
    endDate: Date;
    roundNumber: number;
    holeNumber: number;
}