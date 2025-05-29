import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 85, closedLost: 65 },
  { month: 'April', closedWon: 40, closedLost: 38 },
  { month: 'May', closedWon: 62, closedLost: 90 },
  { month: 'June', closedWon: 80, closedLost: 10 },
  { month: 'July', closedWon: 70, closedLost: 45 },
  { month: 'August', closedWon: 100, closedLost: 30 },
];

const totalClosed = 680;
const totalLost = 70;

interface LeadsTrackingChartProps {
  className?: string;
}

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last 6 months');
  const timeRanges = [
    { id: '3m', label: 'Last 3 months' },
    { id: '6m', label: 'Last 6 months' },
    { id: '12m', label: 'Last 12 months' },
    { id: 'ytd', label: 'Year to Date' },
  ];

  return (
    <Card className={cn('bg-card text-card-foreground', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Leads tracking</CardTitle>
            <div className="mt-1 flex items-baseline space-x-4">
                <p className="text-3xl font-bold">{totalClosed} <span className="text-base font-normal text-muted-foreground">total closed</span></p>
                <p className="text-3xl font-bold">{totalLost} <span className="text-base font-normal text-muted-foreground">total lost</span></p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground mt-2 sm:mt-0">
                <CalendarDays className="mr-2 h-4 w-4" />
                {selectedTimeRange}
                <ChevronDown className="ml-1 h-4 w-4" />
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
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#26A69A" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#26A69A" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF5350" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EF5350" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                fontSize={12}
                tickMargin={10}
                className="text-muted-foreground"
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                fontSize={12}
                tickMargin={10}
                tickFormatter={(value) => `${value}`}
                className="text-muted-foreground"
              />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                labelStyle={{ color: 'hsl(var(--card-foreground))', fontWeight: 'bold'}}
              />
              <Legend 
                iconType="square" 
                iconSize={10} 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => <span className="text-sm text-muted-foreground ml-1">{value}</span>}
              />
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#26A69A" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#26A69A' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#26A69A' }}/>
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#EF5350" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#EF5350' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#EF5350' }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
