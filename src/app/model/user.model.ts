export class User {
    username!: string;
    password!: string;
    company!: string;
    role!: string;
}

export interface User {
    username: string;
    password: string;
    company: string;
    role: string;
}
