import { Role } from './role';
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    mobilenumber: number;
    created: string;
    updated: string;
    profilepic: File;
    roles: Role[];
}
