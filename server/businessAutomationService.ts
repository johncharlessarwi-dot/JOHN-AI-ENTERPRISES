/**
 * John AI Enterprise WhatsApp OS - Part 6 Business Automation Engine, CRM, Payments & Workflows
 * Handles automated workflows, triggers, actions, leads, quotations, invoices, mobile money payments, subscriptions, tasks, appointments, and reporting.
 */

export interface WorkflowRule {
  id: string;
  name: string;
  trigger: 'new_customer' | 'new_message' | 'service_intent' | 'payment_received' | 'inactivity';
  condition: string;
  action: 'send_whatsapp' | 'create_lead' | 'assign_agent' | 'generate_invoice' | 'notify_admin';
  isActive: boolean;
  executionsCount: number;
  lastRunAt?: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerName: string;
  customerPhone: string;
  serviceTitle: string;
  amountTzs: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Converted to Invoice';
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  serviceTitle: string;
  amountTzs: number;
  paymentMethod: 'M-Pesa' | 'Tigo Pesa' | 'Airtel Money' | 'Bank Transfer' | 'Cash';
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  referenceId: string;
  customerPhone: string;
  customerName: string;
  gateway: 'Vodacom M-Pesa' | 'Tigo Pesa' | 'Airtel Money' | 'CRDB Bank' | 'NMB Bank';
  amountTzs: number;
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: string;
}

export interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  dateTime: string;
  status: 'Confirmed' | 'Rescheduled' | 'Cancelled';
}

export class BusinessAutomationService {
  private workflows: WorkflowRule[] = [
    { id: "wf_1", name: "HESLB Instant Lead Qualification", trigger: "service_intent", condition: "service == 'HESLB'", action: "create_lead", isActive: true, executionsCount: 412, lastRunAt: new Date().toISOString() },
    { id: "wf_2", name: "Automatic Payment Receipt & Invoice", trigger: "payment_received", condition: "payment.status == 'SUCCESS'", action: "generate_invoice", isActive: true, executionsCount: 189, lastRunAt: new Date().toISOString() },
    { id: "wf_3", name: "VIP Customer WhatsApp Greeting", trigger: "new_customer", condition: "customer.tier == 'VIP'", action: "send_whatsapp", isActive: true, executionsCount: 74, lastRunAt: new Date().toISOString() }
  ];

  private quotations: Quotation[] = [
    { id: "q_1", quotationNumber: "QT-2026-001", customerName: "Baraka Juma", customerPhone: "+255 713 555 123", serviceTitle: "HESLB Loan Appeal & Verification", amountTzs: 25000, status: "Converted to Invoice", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: "q_2", quotationNumber: "QT-2026-002", customerName: "Amina Mwinyi", customerPhone: "+255 765 888 444", serviceTitle: "BRELA Company Registration (Limited)", amountTzs: 50000, status: "Sent", createdAt: new Date(Date.now() - 3600000 * 5).toISOString() }
  ];

  private invoices: Invoice[] = [
    { id: "inv_1", invoiceNumber: "INV-2026-001", customerName: "Baraka Juma", serviceTitle: "HESLB Loan Appeal & Verification", amountTzs: 25000, paymentMethod: "M-Pesa", status: "Paid", dueDate: "2026-08-10", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: "inv_2", invoiceNumber: "INV-2026-002", customerName: "Grace Kimaro", serviceTitle: "NACTVET Admission Processing", amountTzs: 30000, paymentMethod: "Tigo Pesa", status: "Pending", dueDate: "2026-08-15", createdAt: new Date().toISOString() }
  ];

  private payments: PaymentTransaction[] = [
    { id: "pay_1", referenceId: "MP260802.1420.X9481", customerPhone: "+255 713 555 123", customerName: "Baraka Juma", gateway: "Vodacom M-Pesa", amountTzs: 25000, status: "Completed", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: "pay_2", referenceId: "TP260802.0915.L3821", customerPhone: "+255 765 888 444", customerName: "Amina Mwinyi", gateway: "Tigo Pesa", amountTzs: 50000, status: "Pending", timestamp: new Date().toISOString() }
  ];

  private tasks: TaskItem[] = [
    { id: "tsk_1", title: "Review HESLB appeal documents for Baraka Juma", assignee: "John Charles", priority: "High", status: "Completed", dueDate: "2026-08-02" },
    { id: "tsk_2", title: "Submit BRELA docs to Registrar", assignee: "Support Agent", priority: "Medium", status: "In Progress", dueDate: "2026-08-03" }
  ];

  private appointments: Appointment[] = [
    { id: "apt_1", customerName: "Baraka Juma", customerPhone: "+255 713 555 123", service: "Consultation - HESLB Loan", dateTime: "2026-08-03 10:00 AM", status: "Confirmed" }
  ];

  public getWorkflows() { return this.workflows; }
  public getQuotations() { return this.quotations; }
  public getInvoices() { return this.invoices; }
  public getPayments() { return this.payments; }
  public getTasks() { return this.tasks; }
  public getAppointments() { return this.appointments; }

  public createQuotation(data: Omit<Quotation, 'id' | 'quotationNumber' | 'createdAt'>) {
    const quote: Quotation = {
      id: "q_" + Date.now(),
      quotationNumber: `QT-2026-00${this.quotations.length + 1}`,
      createdAt: new Date().toISOString(),
      ...data
    };
    this.quotations.unshift(quote);
    return quote;
  }

  public createInvoice(data: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) {
    const inv: Invoice = {
      id: "inv_" + Date.now(),
      invoiceNumber: `INV-2026-00${this.invoices.length + 1}`,
      createdAt: new Date().toISOString(),
      ...data
    };
    this.invoices.unshift(inv);
    return inv;
  }

  public recordPayment(data: Omit<PaymentTransaction, 'id' | 'timestamp'>) {
    const pay: PaymentTransaction = {
      id: "pay_" + Date.now(),
      timestamp: new Date().toISOString(),
      ...data
    };
    this.payments.unshift(pay);
    return pay;
  }

  public createTask(data: Omit<TaskItem, 'id'>) {
    const tsk: TaskItem = {
      id: "tsk_" + Date.now(),
      ...data
    };
    this.tasks.unshift(tsk);
    return tsk;
  }

  public createAppointment(data: Omit<Appointment, 'id'>) {
    const apt: Appointment = {
      id: "apt_" + Date.now(),
      ...data
    };
    this.appointments.unshift(apt);
    return apt;
  }

  public toggleWorkflow(id: string) {
    const wf = this.workflows.find(w => w.id === id);
    if (wf) {
      wf.isActive = !wf.isActive;
    }
    return wf;
  }
}

export const businessAutomationService = new BusinessAutomationService();
