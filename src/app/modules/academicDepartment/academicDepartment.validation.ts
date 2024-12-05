import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body:z.object({
        name: z
       .string({
        invalid_type_error: "Academic Department name must be a string",
        required_error: "Academic Department name must required"
       }),
       academicFaculty: z
       .string({
        invalid_type_error: "Academic Faculty name must be a string",
        required_error: "Academic Faculty name must required"
       })
    })
});

const updateAcademicDepartmentValidationSchema = z.object({
    body:z.object({
        name: z
       .string({
        invalid_type_error: "Academic Department name must be a string",
       }).optional(),
       academicFaculty: z
       .string({
        invalid_type_error: "Academic Faculty name must be a string",
       }).optional()
    })
});

export const academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}