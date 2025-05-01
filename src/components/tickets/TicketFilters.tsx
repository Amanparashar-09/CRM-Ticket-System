import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

interface FilterOption {
  value: string;
  label: string;
}

interface TicketFiltersProps {
  statusOptions: FilterOption[];
  priorityOptions: FilterOption[];
  categoryOptions: FilterOption[];
  selectedStatuses: string[];
  selectedPriorities: string[];
  selectedCategories: string[];
  onFilterChange: (
    filterType: 'status' | 'priority' | 'category',
    values: string[]
  ) => void;
  onClearFilters: () => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  statusOptions,
  priorityOptions,
  categoryOptions,
  selectedStatuses,
  selectedPriorities,
  selectedCategories,
  onFilterChange,
  onClearFilters,
}) => {
  const [statusDropdownOpen, setStatusDropdownOpen] = React.useState(false);
  const [priorityDropdownOpen, setPriorityDropdownOpen] = React.useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = React.useState(false);

  const statusRef = React.useRef<HTMLDivElement>(null);
  const priorityRef = React.useRef<HTMLDivElement>(null);
  const categoryRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusDropdownOpen(false);
      }
      if (priorityRef.current && !priorityRef.current.contains(event.target as Node)) {
        setPriorityDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleStatus = (value: string) => {
    const newValues = selectedStatuses.includes(value)
      ? selectedStatuses.filter((v) => v !== value)
      : [...selectedStatuses, value];
    onFilterChange('status', newValues);
  };

  const togglePriority = (value: string) => {
    const newValues = selectedPriorities.includes(value)
      ? selectedPriorities.filter((v) => v !== value)
      : [...selectedPriorities, value];
    onFilterChange('priority', newValues);
  };

  const toggleCategory = (value: string) => {
    const newValues = selectedCategories.includes(value)
      ? selectedCategories.filter((v) => v !== value)
      : [...selectedCategories, value];
    onFilterChange('category', newValues);
  };

  const filtersActive = selectedStatuses.length > 0 || selectedPriorities.length > 0 || selectedCategories.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      {/* Status Filter */}
      <div className="relative" ref={statusRef}>
        <button
          onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Status
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
        {statusDropdownOpen && (
          <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleStatus(option.value)}
                  className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                >
                  <span className="mr-3 h-5 w-5 flex items-center justify-center">
                    {selectedStatuses.includes(option.value) && (
                      <Check className="h-4 w-4 text-cyan-600" />
                    )}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Priority Filter */}
      <div className="relative" ref={priorityRef}>
        <button
          onClick={() => setPriorityDropdownOpen(!priorityDropdownOpen)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Priority
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
        {priorityDropdownOpen && (
          <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => togglePriority(option.value)}
                  className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                >
                  <span className="mr-3 h-5 w-5 flex items-center justify-center">
                    {selectedPriorities.includes(option.value) && (
                      <Check className="h-4 w-4 text-cyan-600" />
                    )}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="relative" ref={categoryRef}>
        <button
          onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Category
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
        {categoryDropdownOpen && (
          <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleCategory(option.value)}
                  className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                >
                  <span className="mr-3 h-5 w-5 flex items-center justify-center">
                    {selectedCategories.includes(option.value) && (
                      <Check className="h-4 w-4 text-cyan-600" />
                    )}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      {filtersActive && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="ml-2"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default TicketFilters;