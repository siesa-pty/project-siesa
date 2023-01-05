export interface Equipment {
    name: string;
    description: string;
    projectName: string;
    qr: string;
}

export class Equipment {
    name!: string;
    description!: string;
    projectName!: string;
    files!: any[];
    qr!: string;    
}