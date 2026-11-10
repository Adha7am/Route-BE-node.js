import { Types } from "mongoose";
import z from "zod";

export const sendMessageDTO = z.object({
    content : z.string().min(1).max(100).trim(),
    receiver : z.string().trim().refine((value) => Types.ObjectId.isValid(value))
})