import { z } from "zod";
import {
  zIranMobile,
  zIranNationalCode,
  zIranPhoneDigits,
  zPassportId,
  zTextNoDigits,
} from "@admin-kit/schemas/formZodRules";

export const profileSchema = z.object({
  fullName: zTextNoDigits("نام و نام خانوادگی"),
  fatherName: zTextNoDigits("نام پدر"),
  gender: z.enum(["male", "female"], {
    message: "جنسیت الزامی است",
  }),
  birthDate: z.string().min(1, "تاریخ تولد الزامی است"),
  city: zTextNoDigits("شهر"),
  nationality: z.string().min(1, "ملیت الزامی است"),
  nationalCode: zIranNationalCode,
  passportNumber: zPassportId,
  passportExpiry: z.string().min(1, "تاریخ انقضای پاسپورت الزامی است"),
  bloodType: zTextNoDigits("گروه خونی"),
  diseaseHistory: z.string().optional(),
  mobile1: zIranMobile,
  mobile2: zIranMobile,
  relativePhone: zIranPhoneDigits,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const profileDefaultValues: ProfileFormValues = {
  fullName: "",
  fatherName: "",
  gender: "male",
  birthDate: "",
  city: "",
  nationality: "",
  nationalCode: "",
  passportNumber: "",
  passportExpiry: "",
  bloodType: "",
  diseaseHistory: "",
  mobile1: "",
  mobile2: "",
  relativePhone: "",
};
