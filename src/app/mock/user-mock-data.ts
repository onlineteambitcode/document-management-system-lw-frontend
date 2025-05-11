import { USER_ROLE_ENUM, USER_STATUS_ENUM } from "../common/enums/user.enum";
import { UserData } from "../common/interfaces/user.interface";


// Allowed users data (25 users)
export const USER_MOCK_DATA_ALLOWED: UserData[] = Array.from({ length: 25 }, (_, index) => {
    const id = (index + 1).toString();
    return {
      user_id: id,
      name: `Allowed User ${id}`,
      email: `alloweduser${id}@example.com`,
      role: index % 2 === 0 ? USER_ROLE_ENUM.ADMIN : USER_ROLE_ENUM.USER,
      status: USER_STATUS_ENUM.ACTIVE,
      created_date: '2024-10-27',
      profile_image: ``,
      mobileNumber: `+94712390${String(100 + index).slice(-3)}`,
    };
  });
  
  // Non-allowed users data (100 users)
  export const USER_MOCK_DATA_NOT_ALLOWED: UserData[] = Array.from({ length: 100 }, (_, index) => {
    const id = (index + 1).toString(); // Start from 26 to 125
    return {
      user_id: id,
      name: `Non-Allowed User ${id}`,
      email: `nonalloweduser${id}@example.com`,
      role: index % 2 === 0 ? USER_ROLE_ENUM.ADMIN : USER_ROLE_ENUM.USER,
      status: USER_STATUS_ENUM.DEACTIVATED,
      created_date: '2024-10-27',
      profile_image: `assets/images/profile/user-${(index % 8) + 1}.jpg`,
      mobileNumber: `+94712390${String(100 + index + 25).slice(-3)}`,
    };
  });
  


export const CASE_MOCK_DATA = Array.from({ length: 30 }, (_, caseIndex) => {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    ];
    const randomMonth = months[Math.floor(Math.random() * months.length)]; // Random month
    const randomYear = Math.floor(Math.random() * (2025 - 2010 + 1)) + 2010; // Random year between 2010 and 2025
  
    const randomDocumentCount = Math.floor(Math.random() * 11); // Random number between 0 and 10
    const documents = Array.from({ length: randomDocumentCount }, (_, docIndex) => ({
      
      document_id: `DOC_CASE_${randomYear}_${String(caseIndex + 1).padStart(2, '0')}_${String(docIndex + 1).padStart(2, '0')}`,
      document_name: `Case Document ${docIndex + 1}.pdf`,
      file_size: Math.floor(Math.random() * 10) + 1, // File size between 1 and 10 MB
      created_date: `${randomYear}-10-27`,
      updatedAt: `${randomYear}-12-15`,
      description: 'Test description',
      file_url: `https://example.com/documents/case-${caseIndex + 1}-${docIndex + 1}.pdf`,
    }));
  
    return {
      id: Math.floor(Math.random() * 11).toString(),
      case_id: `CASE_${randomYear}_${randomMonth}_${caseIndex + 1}`,
      name: `Case ${caseIndex + 1}`,
      allowed_users: Math.floor(Math.random() * 100) + 1, // Allowed users between 1 and 100
      documents: documents,
      created_date: `${randomYear}-10-27`,
      updatedAt: `${randomYear}-12-15`,
      description: 'Test description',
    };
  });
  