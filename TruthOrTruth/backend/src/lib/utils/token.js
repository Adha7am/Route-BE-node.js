import jwt from 'jsonwebtoken'
import { toMs } from '../../pkg/utils/time.js'
import {env} from '../config/env.js'
export function generateToken(payload) {
    return jwt.sign(payload, env.jwt.secret, { expiresIn: toMs.hours(1) })
}