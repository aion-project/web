import { Resource } from './Resource';

export interface Location {
    id: String,
    name: String,
    level: String,
    description?: String,
    ac: Boolean,
    resources: Resource[]
}