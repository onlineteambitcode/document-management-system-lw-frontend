export interface CaseData {
    case_id: string;
    name: string;
    allowed_users: number;
    description: string;
    documents: number;
    created_date: string;
    last_updated_date: string;
  }


export interface CaseDocumentData {
    document_id: string;
    name: string;
    file_size: number;
    description: string;
    created_date: string;
    last_updated_date: string;
  }