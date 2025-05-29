import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, TrendingUp, Activity, BarChartBig } from 'lucide-react';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconColor?: string;
}

const statsData: StatCardData[] = [
  {
    id: 'totalRevenue',
    title: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    icon: DollarSign,
    iconColor: 'text-green-500',
  },
  {
    id: 'activeLeads',
    title: 'Active Leads',
    value: '623',
    description: '+12 since last week',
    icon: Users,
    iconColor: 'text-blue-500',
  },
  {
    id: 'conversionRate',
    title: 'Conversion Rate',
    value: '12.5%',
    description: '+1.2% from last month',
    icon: TrendingUp,
    iconColor: 'text-purple-500',
  },
  {
    id: 'avgDealSize',
    title: 'Avg. Deal Size',
    value: '$2,350',
    description: '-5% from last quarter',
    icon: BarChartBig,
    iconColor: 'text-orange-500',
  },
];

interface StatCardsProps {
  className?: string;
}

const StatCards: React.FC<StatCardsProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.id} className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <IconComponent className={cn('h-5 w-5 text-muted-foreground', stat.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatCards;
