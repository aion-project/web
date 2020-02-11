import { Role } from './Role';
import { Group } from './Group';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    active?: boolean;
    roles?: Role[];
    avatarUrl?: string;
    thumbnailUrl?: string;
    bio?: string;
    groups: Group[];
}
