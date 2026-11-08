/**
 * John AI Enterprise WhatsApp OS - Part 4 Enterprise Middleware & Validators
 */

import { Request, Response, NextFunction } from 'express';
import { verifyApiToken } from '../utils/apiAccess';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!verifyApiToken(req.headers.authorization, process.env.ENTERPRISE_API_TOKEN)) {
    return res.status(401).set('Cache-Control','no-store').json({error:'Authentication required'});
  }
  req.user = { id: 'enterprise_admin', email: 'admin@johnservices.co.tz', role: 'SUPER_ADMIN' };
  next();
}

export function roleGuard(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) return res.status(401).json({ error: 'Authentication required' });
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role permissions', required: allowedRoles, current: userRole });
    }
    next();
  };
}

export function errorHandlerMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Never log raw provider exceptions; they may contain API tokens or customer data.
  console.error('Enterprise API request failed');
  res.set('Cache-Control','no-store').status(500).json({
    success: false,
    error: 'Internal Server Error',
    code: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  });
}
