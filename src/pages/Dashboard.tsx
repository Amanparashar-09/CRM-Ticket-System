import React from 'react';
import { Clock, Ticket, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import TicketActivityChart from '../components/dashboard/TicketActivityChart';
import TicketsByPriorityChart from '../components/dashboard/TicketsByPriorityChart';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Ticket as TicketType } from '../types';
import { tickets, customers, users, dashboardStats } from '../lib/mockData';

const Dashboard: React.FC = () => {
  // Get recent tickets (5 most recent)
  const recentTickets = [...tickets]
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // Get urgent tickets
  const urgentTickets = tickets.filter(ticket => 
    ticket.priority === 'urgent' && 
    (ticket.status === 'open' || ticket.status === 'in-progress')
  );

  const statusText = {
    open: 'Open',
    'in-progress': 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tickets"
          value={dashboardStats.totalTickets}
          icon={<Ticket size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Open Tickets"
          value={dashboardStats.openTickets}
          icon={<AlertCircle size={24} />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="Resolved Tickets"
          value={dashboardStats.resolvedTickets}
          icon={<CheckCircle size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Avg. Resolution Time"
          value={dashboardStats.averageResolutionTime}
          icon={<Clock size={24} />}
          description="Time to resolve"
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TicketActivityChart />
        <TicketsByPriorityChart />
      </div>

      {/* Recent and Urgent Tickets */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Tickets */}
        <Card 
          title="Recent Tickets" 
          actions={<Button variant="outline" size="sm">View All</Button>}
        >
          <div className="space-y-4">
            {recentTickets.map((ticket) => {
              const customer = customers.find(c => c.id === ticket.customerId);
              const assignedTo = ticket.assignedToId 
                ? users.find(u => u.id === ticket.assignedToId) 
                : undefined;
              
              return (
                <div key={ticket.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{ticket.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{ticket.description}</p>
                    </div>
                    <Badge variant={ticket.status}>
                      {statusText[ticket.status]}
                    </Badge>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      {customer?.name} • {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    {assignedTo && (
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">Assigned to:</span>
                        <img
                          className="h-5 w-5 rounded-full"
                          src={assignedTo.avatar}
                          alt={assignedTo.name}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Urgent Tickets */}
        <Card 
          title="Urgent Tickets" 
          actions={<Button variant="outline" size="sm">View All</Button>}
        >
          <div className="space-y-4">
            {urgentTickets.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No urgent tickets at the moment.</p>
            ) : (
              urgentTickets.map((ticket) => {
                const customer = customers.find(c => c.id === ticket.customerId);
                const assignedTo = ticket.assignedToId 
                  ? users.find(u => u.id === ticket.assignedToId) 
                  : undefined;
                
                return (
                  <div key={ticket.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{ticket.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{ticket.description}</p>
                      </div>
                      <Badge variant="urgent">Urgent</Badge>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-xs">
                      <span className="text-gray-500">
                        {customer?.name} • {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      {ticket.dueDate && (
                        <span className="text-red-600 font-medium flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Due {new Date(ticket.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;