import React from 'react';

type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

interface TicketStatusSelectProps {
  status: TicketStatus;
  onChange: (status: TicketStatus) => void;
  disabled?: boolean;
}

const TicketStatusSelect: React.FC<TicketStatusSelectProps> = ({
  status,
  onChange,
  disabled = false,
}) => {
  const statusOptions: { value: TicketStatus; label: string; color: string }[] = [
    { value: 'open', label: 'Open', color: 'bg-gray-100 text-gray-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-purple-100 text-purple-800' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Closed', color: 'bg-slate-100 text-slate-800' },
  ];

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as TicketStatus)}
      disabled={disabled}
      className={`rounded-md border-gray-300 px-3 py-1 text-sm font-medium shadow-sm focus:border-cyan-500 focus:ring-cyan-500 ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      }`}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TicketStatusSelect;