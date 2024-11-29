import { z } from "zod";

const userValidationSchema = z.object({
    password: z
    .string({
        invalid_type_error: "Password must be string"
    })
    .max(8, {message: "Password must contain atleast 8 characters"})
    .optional(),
})

export const UserValidation = {
    userValidationSchema
}