export type AdminUserStatus = "فعال" | "غیر فعال";

export type AdminUserRegistrationYear =
  | "1404"
  | "1405"
  | "1406"
  | "1407"
  | "1408";

export type AdminUser = {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
  registrationYear: AdminUserRegistrationYear;
  status: AdminUserStatus;
};

export const REGISTRATION_YEARS: AdminUserRegistrationYear[] = [
  "1404",
  "1405",
  "1406",
  "1407",
  "1408",
];

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 1,
    firstName: "علی",
    lastName: "رضایی",
    nationalCode: "1234567890",
    mobile: "09121234567",
    registrationYear: "1404",
    status: "فعال",
  },
  {
    id: 2,
    firstName: "زهرا",
    lastName: "محمدی",
    nationalCode: "0987654321",
    mobile: "09129876543",
    registrationYear: "1405",
    status: "غیر فعال",
  },
  {
    id: 3,
    firstName: "حسین",
    lastName: "کریمی",
    nationalCode: "1122334455",
    mobile: "09351234567",
    registrationYear: "1406",
    status: "فعال",
  },
  {
    id: 4,
    firstName: "مریم",
    lastName: "احمدی",
    nationalCode: "5566778899",
    mobile: "09021234567",
    registrationYear: "1407",
    status: "فعال",
  },
  {
    id: 5,
    firstName: "رضا",
    lastName: "نوری",
    nationalCode: "6677889900",
    mobile: "09131234567",
    registrationYear: "1408",
    status: "غیر فعال",
  },
  {
    id: 6,
    firstName: "فاطمه",
    lastName: "حسینی",
    nationalCode: "7788990011",
    mobile: "09221234567",
    registrationYear: "1404",
    status: "فعال",
  },
];
