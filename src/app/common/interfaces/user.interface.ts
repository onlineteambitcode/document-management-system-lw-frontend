import { USER_ROLE_ENUM, USER_STATUS_ENUM } from "../enums/user.enum";

export interface UserData {
    user_id: string;
    name: string;
    email: string;
    role: USER_ROLE_ENUM;
    status: USER_STATUS_ENUM;
    created_date: string;
    profile_image: string;
    mobileNumber: string;
  }


  export interface UserGroupData {
    group_id: number;
    name: string;
    permission: string;
    count: number;
    status: USER_STATUS_ENUM;
    created_date: string;
  }

  export interface UserOrGroup {
    name: string;
    id: string;
    isGroup: boolean;
    profile_image: string;
    email: string;
    user:any;
  }