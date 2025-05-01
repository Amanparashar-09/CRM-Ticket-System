import { User, Customer, Ticket, Comment, DashboardStats } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Sarah Agent',
    email: 'sarah@example.com',
    role: 'agent',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Michael Agent',
    email: 'michael@example.com',
    role: 'agent',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

// Mock Customers
export const customers: Customer[] = [
  {
    id: '101',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '555-123-4567',
    company: 'Acme Inc.',
    lastContact: new Date('2023-11-15'),
    createdAt: new Date('2023-01-10'),
  },
  {
    id: '102',
    name: 'TechSolutions',
    email: 'info@techsolutions.com',
    phone: '555-987-6543',
    company: 'TechSolutions LLC',
    lastContact: new Date('2023-11-20'),
    createdAt: new Date('2023-02-15'),
  },
  {
    id: '103',
    name: 'Global Retail',
    email: 'support@globalretail.com',
    phone: '555-456-7890',
    company: 'Global Retail Ltd',
    lastContact: new Date('2023-11-25'),
    createdAt: new Date('2023-03-20'),
  },
];

// Mock Tickets
export const tickets: Ticket[] = [
  {
    id: '1001',
    title: 'Cannot access admin dashboard',
    description: 'Getting 403 error when trying to access the admin section of the application.',
    status: 'open',
    priority: 'high',
    category: 'Access',
    customerId: '101',
    assignedToId: '2',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20'),
    dueDate: new Date('2023-11-23'),
  },
  {
    id: '1002',
    title: 'Product pricing incorrect',
    description: 'The pricing displayed for our premium product is incorrect on the website.',
    status: 'in-progress',
    priority: 'medium',
    category: 'Website',
    customerId: '102',
    assignedToId: '3',
    createdAt: new Date('2023-11-18'),
    updatedAt: new Date('2023-11-21'),
    dueDate: new Date('2023-11-25'),
  },
  {
    id: '1003',
    title: 'Need help setting up account',
    description: 'New customer needs assistance with account setup and initial configuration.',
    status: 'open',
    priority: 'low',
    category: 'Account',
    customerId: '103',
    createdAt: new Date('2023-11-21'),
    updatedAt: new Date('2023-11-21'),
    dueDate: new Date('2023-11-28'),
  },
  {
    id: '1004',
    title: 'Application crashing on startup',
    description: 'After the latest update, the application crashes immediately after launching.',
    status: 'open',
    priority: 'urgent',
    category: 'Technical',
    customerId: '101',
    assignedToId: '2',
    createdAt: new Date('2023-11-22'),
    updatedAt: new Date('2023-11-22'),
    dueDate: new Date('2023-11-23'),
  },
  {
    id: '1005',
    title: 'Invoice discrepancy',
    description: 'The invoice #INV-2023-11-15 has incorrect line items and total amount.',
    status: 'in-progress',
    priority: 'high',
    category: 'Billing',
    customerId: '102',
    assignedToId: '3',
    createdAt: new Date('2023-11-19'),
    updatedAt: new Date('2023-11-21'),
    dueDate: new Date('2023-11-24'),
  },
  {
    id: '1006',
    title: 'Feature request: Export to PDF',
    description: 'Customer requesting ability to export reports to PDF format.',
    status: 'resolved',
    priority: 'medium',
    category: 'Feature Request',
    customerId: '103',
    assignedToId: '2',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-20'),
    dueDate: new Date('2023-11-30'),
  },
  {
    id: '1007',
    title: 'Password reset not working',
    description: 'Password reset emails are not being received after multiple attempts.',
    status: 'closed',
    priority: 'high',
    category: 'Account',
    customerId: '101',
    assignedToId: '3',
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2023-11-15'),
    dueDate: new Date('2023-11-17'),
  },
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: '10001',
    ticketId: '1001',
    userId: '2',
    content: 'I checked the permissions and it seems there might be an issue with the role assignment. Looking into it further.',
    createdAt: new Date('2023-11-20T10:30:00'),
    isInternal: true,
  },
  {
    id: '10002',
    ticketId: '1001',
    userId: '2',
    content: 'We\'ve identified the issue with your permissions. It should be fixed now, please try accessing the admin dashboard again.',
    createdAt: new Date('2023-11-20T14:45:00'),
    isInternal: false,
  },
  {
    id: '10003',
    ticketId: '1002',
    userId: '3',
    content: 'I\'ve checked the CMS and found the incorrect price entry. Will update it immediately.',
    createdAt: new Date('2023-11-21T09:15:00'),
    isInternal: true,
  },
  {
    id: '10004',
    ticketId: '1004',
    userId: '2',
    content: 'This seems to be related to the recent update. I\'ll prioritize this and get the development team involved.',
    createdAt: new Date('2023-11-22T11:00:00'),
    isInternal: true,
  },
];

// Mock Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalTickets: 7,
  openTickets: 3,
  resolvedTickets: 2,
  averageResolutionTime: '2d 4h',
};

export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(customer => customer.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getTicketById = (id: string): Ticket | undefined => {
  return tickets.find(ticket => ticket.id === id);
};

export const getTicketComments = (ticketId: string): Comment[] => {
  return comments.filter(comment => comment.ticketId === ticketId);
};