import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Badge from '../ui/Badge';
import { Ticket, Customer, User } from '../../types';

interface TicketListItemProps {
  ticket: Ticket;
  customer: Customer;
  assignedTo?: User;
  onClick: (ticketId: string) => void;
}

const TicketListItem: React.FC<TicketListItemProps> = ({
  ticket,
  customer,
  assignedTo,
  onClick,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const daysPassed = Math.floor((new Date().getTime() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  let timePassedText = `${daysPassed} days ago`;
  if (daysPassed === 0) {
    timePassedText = 'Today';
  } else if (daysPassed === 1) {
    timePassedText = 'Yesterday';
  }

  const priorityText = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };

  const statusText = {
    open: 'Open',
    'in-progress': 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  };

  return (
    <div 
      className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
      onClick={() => onClick(ticket.id)}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{ticket.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{ticket.description}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant={ticket.priority}>{priorityText[ticket.priority]}</Badge>
            <Badge variant={ticket.status}>{statusText[ticket.status]}</Badge>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {ticket.category}
            </span>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col items-end">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Created {timePassedText}</span>
          </div>
          
          {ticket.dueDate && (
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>Due {formatDate(ticket.dueDate)}</span>
            </div>
          )}
          
          <div className="mt-2 flex items-center">
            <div className="text-sm font-medium text-gray-900 mr-2">
              {customer.name}
            </div>
            {assignedTo && (
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-1">→</span>
                <img
                  className="h-6 w-6 rounded-full"
                  src={assignedTo.avatar}
                  alt={assignedTo.name}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketListItem;