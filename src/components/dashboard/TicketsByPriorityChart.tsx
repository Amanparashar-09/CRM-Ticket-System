import React from 'react';
import Card from '../ui/Card';

const TicketsByPriorityChart: React.FC = () => {
  // Simple mockup of a donut chart - in a real app, you'd use a charting library
  return (
    <Card title="Tickets by Priority" className="h-full">
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="relative w-40 h-40">
          {/* Base circle */}
          <svg className="w-full h-full" viewBox="0 0 36 36">
            {/* Urgent - 15% */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3.8"
              strokeDasharray="15, 100"
            />
            
            {/* High - 25% */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#F97316"
              strokeWidth="3.8"
              strokeDasharray="25, 100"
              strokeDashoffset="-15"
            />
            
            {/* Medium - 35% */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3.8"
              strokeDasharray="35, 100"
              strokeDashoffset="-40"
            />
            
            {/* Low - 25% */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3.8"
              strokeDasharray="25, 100"
              strokeDashoffset="-75"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-800">42</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-8">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm text-gray-600">Urgent (15%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
            <span className="text-sm text-gray-600">High (25%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-sm text-gray-600">Medium (35%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-gray-600">Low (25%)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TicketsByPriorityChart;