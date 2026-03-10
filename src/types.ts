export enum UserRole {
  MECHANIC = 'MEXANIK',
  ELECTRICAL = 'ELEKTROTEXNIK',
  PLC = 'PLC MUHANDIS',
  CHIEF_MECHANIC = 'BOSH MEXANIK',
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR'
}

export enum IssueStatus {
  OPEN = 'OCHIQ',
  IN_PROGRESS = 'JARAYONDA',
  CLOSED = 'YOPILGAN'
}

export interface User {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  tabelNumber: string;
  role: UserRole;
  department: string;
}

export interface Equipment {
  id: string;
  name: string;
  line: string;
  type: string;
  status: 'OK' | 'MAINTENANCE';
  docs: {
    electrical: string;
    mechanical: string;
    plc: string;
    adminBooks?: string;
  };
}

export interface Issue {
  id: string;
  equipmentId: string;
  equipmentName: string;
  description: string;
  type: 'MECHANICAL' | 'ELECTRICAL' | 'PLC';
  reportedBy: string; // Tabel + Name
  reportedAt: string;
  status: IssueStatus;
  closedBy?: string;
  closedAt?: string;
  closingComment?: string;
  attachments?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  file?: string;
}

export interface MaintenanceTool {
  id: string;
  name: string;
  quantity: number;
  status: 'AVAILABLE' | 'IN_USE' | 'REPAIR';
}

export interface SparePart {
  id: string;
  name: string;
  serialNumber: string;
  manufacturer: string;
  quantity: number;
  addedAt: string;
}
