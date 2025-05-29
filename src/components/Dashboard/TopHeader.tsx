import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown, PlusCircle } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last 6 months');

  const timeRanges = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '6m', label: 'Last 6 months' },
    { id: '12m', label: 'Last 12 months' },
    { id: 'all', label: 'All time' },
  ];

  const createOptions = [
    { id: 'lead', label: 'New Lead' }, 
    { id: 'proposal', label: 'New Proposal' },
    { id: 'invoice', label: 'New Invoice' },
    { id: 'task', label: 'New Task' },
  ];

  return (
    <header 
      className={cn(
        'h-[70px] bg-card text-card-foreground fixed top-0 left-[250px] right-0 z-10',
        'flex items-center justify-between px-6 border-b border-border',
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              {selectedTimeRange}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRanges.map(range => (
              <DropdownMenuItem key={range.id} onClick={() => setSelectedTimeRange(range.label)}>
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {createOptions.map(option => (
               <DropdownMenuItem key={option.id}>
                 <PlusCircle className="mr-2 h-4 w-4" /> 
                 {option.label}
               </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
