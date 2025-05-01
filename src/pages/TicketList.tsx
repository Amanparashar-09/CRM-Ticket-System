import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Toaster, toast } from 'react-hot-toast';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface TicketListProps {
  onSelectTicket: (id: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({ onSelectTicket }) => {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newTicket, setNewTicket] = React.useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
  });

  React.useEffect(() => {
    // In a real app, fetch tickets from API
    setTickets([
      {
        id: '1',
        title: 'Sample Ticket 1',
        description: 'This is a sample ticket description',
        status: 'open',
        priority: 'high',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Sample Ticket 2',
        description: 'Another sample ticket',
        status: 'in-progress',
        priority: 'medium',
        createdAt: new Date().toISOString(),
      },
    ]);
    setLoading(false);
  }, []);

  const handleAddTicket = () => {
    if (!newTicket.title || !newTicket.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const ticket: Ticket = {
      id: Date.now().toString(),
      ...newTicket,
      createdAt: new Date().toISOString(),
    };

    setTickets([...tickets, ticket]);
    setNewTicket({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
    });
    setShowAddForm(false);
    toast.success('Ticket created successfully');
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
    toast.success('Ticket deleted successfully');
  };

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tickets</h2>
          <Button onClick={() => setShowAddForm(true)} className="bg-cyan-600 hover:bg-cyan-700">
            Add New Ticket
          </Button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Create New Ticket</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={newTicket.status}
                    onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button onClick={() => setShowAddForm(false)} className="bg-gray-400 hover:bg-gray-500">
                  Cancel
                </Button>
                <Button onClick={handleAddTicket} className="bg-cyan-600 hover:bg-cyan-700">
                  Create Ticket
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 cursor-pointer" onClick={() => onSelectTicket(ticket.id)}>
                  <h3 className="font-medium">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ticket.status}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority}
                  </span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTicket(ticket.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TicketList;