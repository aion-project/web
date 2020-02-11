import { Resource } from './Resource';

export interface Location {
    id: string;
    name: string;
    level: string;
    description?: string;
    quantity: number;
    ac: boolean;
    resources: Resource[];
}
