import { Request } from 'express';

export type RequestUser = Request & { user: { userId: string } };
