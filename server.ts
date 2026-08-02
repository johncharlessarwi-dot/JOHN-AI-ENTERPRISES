import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { whatsAppEngineService } from "./server/whatsappEngine";
import { aiBrainIntelligenceService } from "./server/aiBrainService";
import { enterpriseDatabaseService } from "./server/db/databaseService";
import { businessAutomationService } from "./server/businessAutomationService";
import { devOpsService } from "./server/devopsService";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini AI client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// In-memory enterprise data store for John AI Enterprise WhatsApp OS
let whatsappStatus = {
  connected: true,
  phoneNumber: "+255 712 345 678",
  businessName: "John Online Services",
  sessionName: "John_Biz_WhatsApp_Prod_01",
  batteryLevel: 98,
  unreadCount: 4,
  activeChatsCount: 28,
  aiAutoResponder: true,
  aiPersona: "Professional, polite, multilingual (Swahili & English), sales-driven assistant for John Online Services."
};

let chats = [
  {
    id: "chat_1",
    customerName: "Amina Juma",
    phone: "+255 784 112 233",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    service: "HESLB Loan Application",
    language: "Swahili",
    leadScore: 92,
    status: "Qualified",
    unread: 1,
    lastMessageTime: "10:42 AM",
    messages: [
      { id: "m1", sender: "customer", text: "Habari John, ninaomba msaada wa kujaza fomu ya mkopo wa HESLB mwaka huu.", time: "10:40 AM" },
      { id: "m2", sender: "ai", text: "Habari za leo Amina! Karibu John Online Services. Niko tayari kukusaidia kujaza fomu yako ya HESLB kwa ufasaha na usahihi mkubwa ili usikose mkopo. Je, una vyeti vyote vinavyohitajika (NIDA, Form Four, Form Six) tayari?", time: "10:41 AM" },
      { id: "m3", sender: "customer", text: "Ndio ninavyo vyote kwenye simu.", time: "10:42 AM" }
    ]
  },
  {
    id: "chat_2",
    customerName: "Baraka Mwakyusa",
    phone: "+255 655 988 776",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    service: "BRELA & TIN Registration",
    language: "Mixed (Swahili/English)",
    leadScore: 85,
    status: "Negotiating",
    unread: 0,
    lastMessageTime: "9:15 AM",
    messages: [
      { id: "m21", sender: "customer", text: "Boss, nataka kusajili kampuni mpya BRELA na TRA TIN number. Inachukua muda gani na bei gani?", time: "9:10 AM" },
      { id: "m22", sender: "ai", text: "Habari Baraka! Usajili wa kampuni BRELA na TIN number TRA huchukua siku 2 hadi 3 tu za kazi. Bei yetu ni nafuu sana na inajumuisha ushauri wa bure wa kodi. Ungependa nikutumie orodha ya bei na mahitaji?", time: "9:12 AM" },
      { id: "m23", sender: "customer", text: "Ndio tafadhali nitumie hapa.", time: "9:15 AM" }
    ]
  },
  {
    id: "chat_3",
    customerName: "Neema Kimaro",
    phone: "+255 713 445 566",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    service: "Passport & Visa Application",
    language: "English",
    leadScore: 78,
    status: "In Progress",
    unread: 2,
    lastMessageTime: "Yesterday",
    messages: [
      { id: "m31", sender: "customer", text: "Hello, I need assistance with an urgent passport renewal and UK visa application.", time: "Yesterday" },
      { id: "m32", sender: "ai", text: "Hello Neema! Welcome to John Online Services. We specialize in fast passport renewals and professional UK/Schengen visa processing. Let's get started right away. Have you booked your biometric appointment yet?", time: "Yesterday" }
    ]
  },
  {
    id: "chat_4",
    customerName: "Dr. Seleman Kagashe",
    phone: "+255 767 332 119",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    service: "Website Development & Branding",
    language: "Swahili",
    leadScore: 95,
    status: "Closed Won",
    unread: 0,
    lastMessageTime: "2 days ago",
    messages: [
      { id: "m41", sender: "customer", text: "Asante sana John kwa website nzuri ya kliniki yetu. Wagonjwa wengi wanasifu muonekano.", time: "2 days ago" },
      { id: "m42", sender: "ai", text: "Karibu sana Daktari! Tunafurahi kuona kliniki yenu inazidi kupiga hatua kidijitali. Ikiwa unahitaji maboresho au huduma nyingine za IT, tuko hapa wakati wote.", time: "2 days ago" }
    ]
  }
];

let knowledgeBaseDocs = [
  { id: "doc_1", title: "John Online Services - Master Price List 2026", category: "Pricing", size: "2.4 MB", updated: "2026-07-15", status: "Indexed" },
  { id: "doc_2", title: "HESLB Loan Application Guidelines & Requirements", category: "Government Apps", size: "4.1 MB", updated: "2026-07-20", status: "Indexed" },
  { id: "doc_3", title: "BRELA Company Registration & TRA TIN Guide", category: "Business Services", size: "1.8 MB", updated: "2026-07-28", status: "Indexed" },
  { id: "doc_4", title: "TCU & NACTVET University Admission Windows", category: "Admissions", size: "3.5 MB", updated: "2026-08-01", status: "Indexed" }
];

let analyticsSummary = {
  totalMessagesToday: 342,
  aiResponseRate: "98.4%",
  avgResponseTimeSec: 2.1,
  activeLeads: 156,
  revenueThisMonth: "TZS 14,850,000",
  satisfactionRate: "4.9/5.0"
};

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", system: "John AI Enterprise WhatsApp OS", version: "5.0" });
});

app.get("/api/whatsapp/status", (req, res) => {
  res.json({
    status: whatsappStatus,
    stats: analyticsSummary
  });
});

app.post("/api/whatsapp/status", (req, res) => {
  whatsappStatus = { ...whatsappStatus, ...req.body };
  res.json({ success: true, status: whatsappStatus });
});

app.get("/api/chats", (req, res) => {
  res.json(chats);
});

app.post("/api/chats/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;
  const { text, sender = "customer" } = req.body;

  const chat = chats.find(c => c.id === chatId);
  if (!chat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  const userMsgId = "msg_" + Date.now();
  const userMessage = { id: userMsgId, sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  chat.messages.push(userMessage);
  chat.lastMessageTime = "Just now";

  // If sender is customer and AI auto-responder is active, generate AI response
  let aiMessage = null;
  if (sender === "customer" && whatsappStatus.aiAutoResponder) {
    try {
      const systemPrompt = `You are the elite AI Assistant for "John Online Services", a premier digital and professional consultancy in Tanzania.
Services offered: HESLB, NACTVET, TCU, university/college admissions, scholarships, visa & passport applications, birth certificates, NIDA, TIN, TRA, driving license, BRELA company registration, email creation, CV writing, website development, graphic design, printing, scanning, typing, government and academic applications.
Behavior guidelines:
- Be professional, polite, helpful, persuasive, and accurate.
- Detect customer language automatically (Swahili, English, or mixed Swahili+English) and reply in the exact same language.
- Never hallucinate prices or government procedures. Encourage them to send required info or documents.
- Keep responses concise, friendly, and formatted nicely for WhatsApp (use emojis appropriately).`;

      const chatHistory = chat.messages.map(m => `${m.sender === 'customer' ? 'Customer' : 'John AI'}: ${m.text}`).join("\n");

      const geminiRes = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Conversation History:\n${chatHistory}\n\nCustomer just said: "${text}\"\n\nRespond as John Online Services AI Assistant in the customer's language:`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      const replyText = geminiRes.text || "Habari! Asante kwa ujumbe wako. John Online Services ipo tayari kukusaidia. Tafadhali eleza kwa undani mahitaji yako.";
      
      aiMessage = {
        id: "ai_" + Date.now(),
        sender: "ai",
        text: replyText.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      chat.messages.push(aiMessage);
    } catch (err: any) {
      console.error("Gemini AI WhatsApp auto-reply error:", err);
      aiMessage = {
        id: "ai_" + Date.now(),
        sender: "ai",
        text: "Habari! Tumepokea ujumbe wako. Mtaalamu wetu atakujibu hivi punde.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      chat.messages.push(aiMessage);
    }
  }

  res.json({ success: true, chat, aiMessage });
});

app.get("/api/kb/documents", (req, res) => {
  res.json(knowledgeBaseDocs);
});

app.post("/api/kb/documents", (req, res) => {
  const { title, category, size } = req.body;
  const newDoc = {
    id: "doc_" + Date.now(),
    title: title || "New Document",
    category: category || "General",
    size: size || "1.2 MB",
    updated: new Date().toISOString().split("T")[0],
    status: "Indexed"
  };
  knowledgeBaseDocs.unshift(newDoc);
  res.json({ success: true, document: newDoc });
});

app.post("/api/ai/broadcast", async (req, res) => {
  const { campaignTitle, targetAudience, promptText, language } = req.body;
  try {
    const resAi = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Draft a professional and persuasive WhatsApp broadcast marketing message for John Online Services.
Campaign: ${campaignTitle}
Target Audience: ${targetAudience}
Core Message / Offer: ${promptText}
Language Required: ${language || "Swahili"}
Include clear call to action and WhatsApp formatting (emojis, bolding).`,
    });

    res.json({ success: true, broadcastText: resAi.text });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to generate broadcast" });
  }
});

// Part 2A Enterprise WhatsApp Engine Endpoints
app.get("/api/whatsapp/engine/status", (req, res) => {
  res.json(whatsAppEngineService.getStatus());
});

app.get("/api/whatsapp/config", (req, res) => {
  res.json(whatsAppEngineService.getConfig());
});

app.post("/api/whatsapp/config", (req, res) => {
  const result = whatsAppEngineService.saveConfig(req.body);
  res.json(result);
});

app.post("/api/whatsapp/toggle", (req, res) => {
  const { connected } = req.body;
  const status = whatsAppEngineService.setConnectionState(connected);
  res.json({ success: true, status });
});

app.post("/api/whatsapp/test-dm", async (req, res) => {
  try {
    const { recipient, message } = req.body;
    const result = await whatsAppEngineService.testRealDm(recipient, message);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/whatsapp/engine/webhook", async (req, res) => {
  try {
    const normalized = await whatsAppEngineService.processIncomingMessage(req.body);
    res.json({ success: true, normalized });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/whatsapp/engine/send", (req, res) => {
  const { recipient, messageBody, options } = req.body;
  if (!recipient || !messageBody) {
    return res.status(400).json({ error: "Recipient and messageBody are required" });
  }
  const queueId = whatsAppEngineService.sendOutboundMessage(recipient, messageBody, options);
  res.json({ success: true, queueId, status: "queued" });
});

app.get("/api/whatsapp/engine/diagnostics", (req, res) => {
  res.json(whatsAppEngineService.runDiagnostics());
});

// Part 2B AI Brain & Conversation Intelligence Endpoints
app.get("/api/ai/brain/prompts", (req, res) => {
  res.json(aiBrainIntelligenceService.getPrompts());
});

app.post("/api/ai/brain/prompts", (req, res) => {
  const { promptText, title } = req.body;
  if (!promptText) {
    return res.status(400).json({ error: "promptText is required" });
  }
  const updated = aiBrainIntelligenceService.updatePrompt(promptText, title);
  res.json({ success: true, updated });
});

app.post("/api/ai/brain/process", async (req, res) => {
  try {
    const result = await aiBrainIntelligenceService.processMessageWithAiBrain(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/ai/brain/metrics", (req, res) => {
  res.json(aiBrainIntelligenceService.getMetrics());
});

// Part 3 Database Architecture & Prisma ORM Endpoints
app.get("/api/db/status", (req, res) => {
  res.json(enterpriseDatabaseService.getDatabaseStatus());
});

app.get("/api/services", (req, res) => {
  res.json(enterpriseDatabaseService.getServices());
});

app.post("/api/services", (req, res) => {
  const { title, category, priceTzs, description } = req.body;
  if (!title || !priceTzs) {
    return res.status(400).json({ error: "Title and priceTzs are required" });
  }
  const created = enterpriseDatabaseService.addService({ title, category: category || "General", priceTzs, description: description || "" });
  res.json({ success: true, created });
});

app.get("/api/audit/logs", (req, res) => {
  res.json(enterpriseDatabaseService.getAuditLogs());
});

// Part 4 Swagger OpenAPI Documentation & Job Queue Endpoints
app.get("/api/docs/swagger.json", (req, res) => {
  res.json({
    openapi: "3.0.0",
    info: {
      title: "John AI Enterprise WhatsApp OS API",
      version: "5.0.0",
      description: "Production-ready backend API for WhatsApp automation, AI Brain, RAG Knowledge Base, CRM, and PostgreSQL data access."
    },
    servers: [{ url: "https://ais-dev-vvo5zlhcnrb2afcwlc6lfz-723147366619.europe-west2.run.app" }],
    paths: {
      "/api/whatsapp/engine/status": { get: { summary: "Get WhatsApp Gateway & Connection Status" } },
      "/api/whatsapp/engine/webhook": { post: { summary: "Process Incoming WhatsApp Webhook Message" } },
      "/api/ai/brain/process": { post: { summary: "Process message with AI Brain (Gemini, Intent, Entities, Sentiment, Safety)" } },
      "/api/db/status": { get: { summary: "Get PostgreSQL & Prisma ORM status" } },
      "/api/services": { get: { summary: "List enterprise services" }, post: { summary: "Create new service" } }
    }
  });
});

app.get("/api/jobs/queues", (req, res) => {
  res.json({
    queues: [
      { name: "message-sending", active: 0, waiting: 0, completed: 18420, failed: 2, status: "healthy" },
      { name: "retry-manager", active: 0, waiting: 0, completed: 340, failed: 0, status: "healthy" },
      { name: "knowledge-indexing", active: 0, waiting: 0, completed: 94, failed: 0, status: "healthy" },
      { name: "reminder-notifications", active: 1, waiting: 0, completed: 1250, failed: 0, status: "healthy" }
    ],
    timestamp: new Date().toISOString()
  });
});

// Part 6 Business Automation Engine, CRM, Payments & Workflows Endpoints
app.get("/api/automation/workflows", (req, res) => {
  res.json(businessAutomationService.getWorkflows());
});

app.post("/api/automation/workflows/:id/toggle", (req, res) => {
  const updated = businessAutomationService.toggleWorkflow(req.params.id);
  res.json({ success: true, updated });
});

app.get("/api/finance/quotations", (req, res) => {
  res.json(businessAutomationService.getQuotations());
});

app.post("/api/finance/quotations", (req, res) => {
  const created = businessAutomationService.createQuotation(req.body);
  res.json({ success: true, created });
});

app.get("/api/finance/invoices", (req, res) => {
  res.json(businessAutomationService.getInvoices());
});

app.post("/api/finance/invoices", (req, res) => {
  const created = businessAutomationService.createInvoice(req.body);
  res.json({ success: true, created });
});

app.get("/api/finance/payments", (req, res) => {
  res.json(businessAutomationService.getPayments());
});

app.post("/api/finance/payments", (req, res) => {
  const created = businessAutomationService.recordPayment(req.body);
  res.json({ success: true, created });
});

app.get("/api/tasks", (req, res) => {
  res.json(businessAutomationService.getTasks());
});

app.post("/api/tasks", (req, res) => {
  const created = businessAutomationService.createTask(req.body);
  res.json({ success: true, created });
});

app.get("/api/appointments", (req, res) => {
  res.json(businessAutomationService.getAppointments());
});

app.post("/api/appointments", (req, res) => {
  const created = businessAutomationService.createAppointment(req.body);
  res.json({ success: true, created });
});

// Part 7 DevOps, Cloud Infrastructure & Security Endpoints
app.get("/api/devops/status", (req, res) => {
  res.json(devOpsService.getDevOpsStatus());
});

app.post("/api/devops/backup", (req, res) => {
  res.json(devOpsService.triggerManualBackup());
});

// Vite middleware setup for development / static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`John AI Enterprise WhatsApp OS running on http://localhost:${PORT}`);
  });
}

startServer();
