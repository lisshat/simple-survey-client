export interface Question {
    name: string;
    type: string;
    required: string;
    text: string;
    description?: string;
    options?: string[];
    multiple?: boolean;
}

export interface Certificate {
    id: number;
    file_name: string;
}

export interface ResponseItem {
    id: number;
    full_name: string;
    email_address: string;
    description: string;
    gender: string;
    programming_stack: string;
    certificates: Certificate[];
    date_responded: string;
}
