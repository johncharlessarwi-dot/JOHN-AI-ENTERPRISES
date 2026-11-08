import test from 'node:test';
import assert from 'node:assert/strict';
import { authMiddleware } from '../server/middleware/enterpriseMiddleware.ts';

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
