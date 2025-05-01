import React from 'react';
import Card from '../ui/Card';

const TicketActivityChart: React.FC = () => {
  // Simple mockup of a bar chart - in a real app, you'd use a charting library
  return (
    <Card title="Ticket Activity" className="h-full">
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-4">Tickets created and resolved over time</p>
        <div className="space-y-6">
          {/* Days of the week */}
          <div className="grid grid-cols-7 gap-2 text-xs text-gray-500">
            <div className="text-center">Mon</div>
            <div className="text-center">Tue</div>
            <div className="text-center">Wed</div>
            <div className="text-center">Thu</div>
            <div className="text-center">Fri</div>
            <div className="text-center">Sat</div>
            <div className="text-center">Sun</div>
          </div>
          
          {/* Created tickets */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Created</p>
            <div className="grid grid-cols-7 gap-2">
              <div className="bg-cyan-500 h-16 rounded-md" style={{ height: '30px' }}></div>
              <div className="bg-cyan-500 h-16 rounded-md" style={{ height: '45px' }}></div>
              <div className="bg-cyan-500 h-16 rounded-md" style={{ height: '60px' }}></div>
              <div className="bg-cyan-500 h-16 rounded-md" style={{ height: '40px' }}></div>
              <div className="bg-cyan-500 h-16 rounded-md" style={{ height: '50px' }}></div>
              <div className="bg-cyan-500 h-16 rounded-md" style={{ height: '20px' }}></div>
              <div className="bg-cyan-500 h-16 rounded-md" style={{ height: '15px' }}></div>
            </div>
          </div>
          
          {/* Resolved tickets */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Resolved</p>
            <div className="grid grid-cols-7 gap-2">
              <div className="bg-green-500 h-16 rounded-md" style={{ height: '20px' }}></div>
              <div className="bg-green-500 h-16 rounded-md" style={{ height: '35px' }}></div>
              <div className="bg-green-500 h-16 rounded-md" style={{ height: '45px' }}></div>
              <div className="bg-green-500 h-16 rounded-md" style={{ height: '55px' }}></div>
              <div className="bg-green-500 h-16 rounded-md" style={{ height: '40px' }}></div>
              <div className="bg-green-500 h-16 rounded-md" style={{ height: '15px' }}></div>
              <div className="bg-green-500 h-16 rounded-md" style={{ height: '10px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TicketActivityChart;