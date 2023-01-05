export interface Project {
    name: string;
    descriptionProject: string;
    category: string;
    branchOffice: string;
    company: string;
    endDate: string;
    supplier: string;
    qr: string;
}

export class Project {
    name!: string;
    descriptionProject!: string;
    category!: string;
    branchOffice!: string;
    company!: string;
    endDate!: string;
    supplier!: string;
    files!: any[];
    qr!: string;    
}