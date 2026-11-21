import test from 'node:test';
import assert from 'node:assert/strict';
import { authMiddleware, roleGuard, errorHandlerMiddleware } from '../server/middleware/enterpriseMiddleware.ts';

function response() {
  const result:any = { statusCode:200, body:null, headers:{} };
  result.status = (code:number) => { result.statusCode=code; return result; };
  result.set = (key:string,value:string) => { result.headers[key]=value; return result; };
  result.json = (body:unknown) => { result.body=body; return result; };
  return result;
}

test('auth middleware rejects missing and arbitrary tokens', () => {
  const before=process.env.ENTERPRISE_API_TOKEN;
  process.env.ENTERPRISE_API_TOKEN='A'.repeat(40);
  try {
    for (const authorization of [undefined,'Bearer random-token']) {
      const req:any={headers:{authorization}}; const res=response(); let called=false;
      authMiddleware(req,res,(()=>{called=true}) as any);
      assert.equal(res.statusCode,401);
      assert.equal(called,false);
      assert.equal(req.user,undefined);
    }
  } finally { if(before===undefined)delete process.env.ENTERPRISE_API_TOKEN; else process.env.ENTERPRISE_API_TOKEN=before; }
});

test('role guard refuses requests without authenticated user', () => {
  const res=response(); let called=false;
  roleGuard(['STAFF'])({headers:{}} as any,res,(()=>{called=true}) as any);
  assert.equal(res.statusCode,401);
  assert.equal(called,false);
});

test('error middleware never discloses internal secrets', () => {
  const original=console.error; const logs:string[]=[]; console.error=(...args)=>logs.push(args.join(' '));
  try {
    const res=response();
    errorHandlerMiddleware(new Error('private-token-value'),{} as any,res,(()=>{}) as any);
    assert.equal(res.statusCode,500);
    assert.doesNotMatch(JSON.stringify(res.body),/private-token-value/);
    assert.doesNotMatch(logs.join(' '),/private-token-value/);
  } finally {console.error=original;}
});

test('known request body errors return safe JSON status codes without echoing input', () => {
  const cases = [
    ['entity.parse.failed', 400, 'INVALID_JSON'],
    ['entity.too.large', 413, 'BODY_TOO_LARGE'],
    ['encoding.unsupported', 415, 'UNSUPPORTED_ENCODING'],
  ] as const;
  for (const [type, status, code] of cases) {
    const res = response();
    errorHandlerMiddleware({ type, status: 500, body: 'test-only', message: 'test-only' }, {} as any, res, assert.fail);
    assert.equal(res.statusCode, status);
    assert.equal(res.headers['Cache-Control'], 'no-store');
    assert.equal(res.body.code, code);
    assert.doesNotMatch(JSON.stringify(res.body), /test-only/);
  }
});

test('late errors delegate only a safe error after headers have been sent', () => {
  const res = response();
  res.headersSent = true;
  let delegated: unknown;
  errorHandlerMiddleware(new Error('test-only'), {} as any, res, (err: unknown) => { delegated = err; });
  assert.equal(res.body, null);
  assert.equal((delegated as Error).message, 'Enterprise API response failed');
});
