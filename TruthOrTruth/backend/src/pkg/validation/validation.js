import { AppError } from "../../lib/error/AppError.js";

export function validateBody(dto, body) {
    const result = dto.safeParse(body)

    if (!result.success) {
        /* error.issue = [
            {
                expected: 'string',
                code: 'invalid_type',
                path: [ 'username' ],
                message: 'Invalid input: expected string, received number'
            },
            {
                expected: 'number',
                code: 'invalid_type',
                path: [ 'xp' ],
                message: 'Invalid input: expected number, received string'
            }]
        */
        const errMessage = result.error.issues.map((issue) => `${issue.path[0]} : ${issue.message}`).join(', ');
        throw new AppError(errMessage, 422)
    }

    return result.data
}

