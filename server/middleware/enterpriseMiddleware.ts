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

const jsonErrors = new Map<string, { status: number; error: string; code: string }>([
  ['entity.parse.failed', { status: 400, error: 'Invalid JSON body', code: 'INVALID_JSON' }],
  ['request.size.invalid', { status: 400, error: 'Invalid request body', code: 'INVALID_BODY' }],
  ['request.aborted', { status: 400, error: 'Invalid request body', code: 'INVALID_BODY' }],
  ['entity.too.large', { status: 413, error: 'Request body too large', code: 'BODY_TOO_LARGE' }],
  ['encoding.unsupported', { status: 415, error: 'Unsupported request encoding', code: 'UNSUPPORTED_ENCODING' }],
  ['charset.unsupported', { status: 415, error: 'Unsupported request encoding', code: 'UNSUPPORTED_ENCODING' }],
]);

export function errorHandlerMiddleware(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(new Error('Enterprise API response failed'));

  const type = err && typeof err === 'object' && 'type' in err ? err.type : undefined;
  const clientError = typeof type === 'string' ? jsonErrors.get(type) : undefined;
  if (clientError) {
    const { status, error, code } = clientError;
    return res.set('Cache-Control', 'no-store').status(status).json({ success: false, error, code });
  }

  // Never log raw provider exceptions; they may contain API tokens or customer data.
  console.error('Enterprise API request failed');
  res.set('Cache-Control','no-store').status(500).json({
    success: false,
    error: 'Internal Server Error',
    code: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  });
}
