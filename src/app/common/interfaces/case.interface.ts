export interface CaseDocumentData {
    document_id: string;
    document_name: string;
    file_size: number;
    file_url: string;
    description: string;
    created_date: string;
    updatedAt: string;
  }


export interface CaseData {
    case_id: string;
    name: string;
    allowed_users: number;
    description: string;
    documents: CaseDocumentData[];
    created_date: string;
    updatedAt: string;
  }