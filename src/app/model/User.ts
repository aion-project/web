import { Role } from './Role';

export interface User {
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    enabled: Boolean,
    active?: Boolean,
    roles?: Role[]
    avatarUrl?: String,
    thumbnailUrl?: String,
    bio?: String
}