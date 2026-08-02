/**
 * John AI Enterprise WhatsApp OS - Part 3 Data Access Layer & Prisma/Redis Service Mock
 */

export interface DBStats {
  connected: boolean;
  driver: string;
  tablesCount: number;
  activeConnections: number;
  redisCacheHitRate: string;
}

export class EnterpriseDatabaseService {
  private static instance: EnterpriseDatabaseService;
  private memoryStore = {
    users: [
      { id: "u_1", email: "admin@johnservices.co.tz", role: "SUPER_ADMIN", name: "John Charles" },
      { id: "u_2", email: "support@johnservices.co.tz", role: "AGENT", name: "Support Agent" }
    ],
    services: [
      { id: "s_1", title: "HESLB Loan Appeal & Application", category: "Education", priceTzs: 25000, isActive: true },
      { id: "s_2", title: "NACTVET & TCU Admission Processing", category: "Education", priceTzs: 30000, isActive: true },
      { id: "s_3", title: "BRELA Company & Business Registration", category: "Government", priceTzs: 50000, isActive: true },
      { id: "s_4", title: "NIDA ID Status & Replacement Assistance", category: "Government", priceTzs: 15000, isActive: true },
      { id: "s_5", title: "TRA TIN Number & Tax Clearance", category: "Tax & Finance", priceTzs: 20000, isActive: true }
    ],
    auditLogs: [
      { id: "log_1", action: "SYSTEM_BOOT", details: "Enterprise database and Prisma ORM layer initialized successfully", createdAt: new Date().toISOString() }
    ],
    redisCache: new Map<string, any>()
  };

  private constructor() {}

  public static getInstance(): EnterpriseDatabaseService {
    if (!EnterpriseDatabaseService.instance) {
      EnterpriseDatabaseService.instance = new EnterpriseDatabaseService();
    }
    return EnterpriseDatabaseService.instance;
  }

  public getDatabaseStatus(): DBStats {
    return {
      connected: true,
      driver: "PostgreSQL (Prisma ORM Client v5.22)",
      tablesCount: 28,
      activeConnections: 12,
      redisCacheHitRate: "98.4%"
    };
  }

  public getServices() {
    return this.memoryStore.services;
  }

  public addService(service: { title: string; category: string; priceTzs: number; description: string }) {
    const newSvc = { id: "s_" + Date.now(), ...service, isActive: true };
    this.memoryStore.services.push(newSvc);
    this.logAudit("CREATE_SERVICE", `Created service: ${service.title}`);
    return newSvc;
  }

  public getAuditLogs() {
    return this.memoryStore.auditLogs;
  }

  public logAudit(action: string, details: string) {
    const entry = { id: "log_" + Date.now(), action, details, createdAt: new Date().toISOString() };
    this.memoryStore.auditLogs.unshift(entry);
    if (this.memoryStore.auditLogs.length > 200) this.memoryStore.auditLogs.pop();
  }

  public redisSet(key: string, value: any, ttlSeconds = 300) {
    this.memoryStore.redisCache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  }

  public redisGet(key: string) {
    const item = this.memoryStore.redisCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.memoryStore.redisCache.delete(key);
      return null;
    }
    return item.value;
  }
}

export const enterpriseDatabaseService = EnterpriseDatabaseService.getInstance();
