import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface SourceData {
  name: string;
  value: number; // For pie chart percentage calculation
  amount: number;
  percentage: number;
  color: string;
}

const sourcesChartData: SourceData[] = [
  { name: 'Clutch', value: 50, amount: 3000, percentage: 50, color: '#EF5350' }, // Reddish-pink
  { name: 'Behance', value: 40, amount: 1000, percentage: 40, color: '#FFCA28' }, // Yellow
  { name: 'Instagram', value: 10, amount: 1000, percentage: 10, color: '#26A69A' }, // Teal
  { name: 'Dribbble', value: 10, amount: 1000, percentage: 10, color: '#66BB6A' }, // Light Green
];

interface SourcesChartProps {
  className?: string;
}

const SourcesChart: React.FC<SourcesChartProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<'Leads came' | 'Leads Converted' | 'Total deals size'>('Leads Converted');
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last 6 months');

  const timeRanges = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '6m', label: 'Last 6 months' },
    { id: '12m', label: 'Last 12 months' },
  ];

  return (
    <Card className={cn('bg-card text-card-foreground', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Sources</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
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
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60} // For Donut shape
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {sourcesChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                    formatter={(value: number, name: string, props: { payload: SourceData }) => [
                        `${props.payload.percentage}% ($${props.payload.amount.toLocaleString()})`,
                        name
                    ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {sourcesChartData.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-sm mr-2" style={{ backgroundColor: source.color }}></span>
                  <span>{source.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-foreground font-medium">$ {source.amount.toLocaleString()}</span>
                  <span className="ml-2 text-muted-foreground">{source.percentage}%</span>
                </div>
              </div>
            ))}
            <div className="text-xs text-muted-foreground text-right mt-1">
              from leads total
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-2">
          {(['Leads came', 'Leads Converted', 'Total deals size'] as const).map((tabName) => (
            <Button
              key={tabName}
              variant={activeTab === tabName ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md',
                activeTab === tabName 
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-secondary/80'
              )}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesChart;
