export interface Project {
    name: string;
    descriptionProject: string;
    category: string;
    branchOffice: string;
    equipmentName: string;
    description: string;
    qr: string;
}

export class Project {
    name!: string;
    descriptionProject!: string;
    category!: string;
    branchOffice!: string;
    equipmentName!: string;
    description!: string;
    files!: any[];
    qr!: string;    
}