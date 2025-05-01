export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'customer';
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  lastContact?: Date;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  customerId: string;
  assignedToId?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  averageResolutionTime: string;
}