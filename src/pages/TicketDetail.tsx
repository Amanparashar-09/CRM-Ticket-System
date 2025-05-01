import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface TicketDetailProps {
  ticketId: string;
  onBack: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, onBack }) => {
  // In a real app, fetch ticket details from API
  const ticket = {
    id: ticketId,
    title: 'Sample Ticket',
    description: 'This is a detailed description of the ticket.',
    status: 'open',
    priority: 'high',
    createdAt: new Date().toISOString(),
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ticket Details</h2>
        <Button onClick={onBack} className="bg-gray-400 hover:bg-gray-500">
          Back
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Title</h3>
          <p className="text-gray-600">{ticket.title}</p>
        </div>

        <div>
          <h3 className="font-medium">Description</h3>
          <p className="text-gray-600">{ticket.description}</p>
        </div>

        <div className="flex space-x-4">
          <div>
            <h3 className="font-medium">Status</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              ticket.status === 'open' ? 'bg-green-100 text-green-800' :
              ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {ticket.status}
            </span>
          </div>

          <div>
            <h3 className="font-medium">Priority</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
              ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {ticket.priority}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-medium">Created At</h3>
          <p className="text-gray-600">{new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default TicketDetail;