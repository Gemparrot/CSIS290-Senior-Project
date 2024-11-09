import { Request } from 'express';
import { User } from './user.interface';

export interface ExpressRequest extends Request {
  user?: User;
}