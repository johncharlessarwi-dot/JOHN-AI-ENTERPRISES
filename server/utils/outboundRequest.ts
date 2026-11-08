import {normalizeTanzaniaPhone} from './phoneNormalization';
import {validateOutgoingText} from './outboundText';
export function parseOutboundRequest(input: unknown): {recipient:string; messageBody:string; options:Record<string,never>} | null {
 if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
 const source=input as Record<string,unknown>;
 if (typeof source.recipient !== 'string' || typeof source.messageBody !== 'string') return null;
 const recipient=normalizeTanzaniaPhone(source.recipient);
 const messageBody=validateOutgoingText(source.messageBody);
 if (!recipient || !messageBody) return null;
 if (source.options != null && (typeof source.options !== 'object' || Array.isArray(source.options) || Object.keys(source.options as object).length !== 0)) return null;
 return {recipient,messageBody,options:{}};
}
