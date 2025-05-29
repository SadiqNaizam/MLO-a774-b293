import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Reason {
  id: string;
  percentage: number;
  text: string;
}

const reasonsData: Reason[] = [
  { id: 'unclearProposal', percentage: 40, text: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, text: 'However venture pursuit' },
  { id: 'other', percentage: 10, text: 'Other' },
  { id: 'timing', percentage: 30, text: 'Timing not right' }, // Changed from duplicate for variety
];

interface OtherStat {
  id: string;
  value: string;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataStats: OtherStat[] = [
  { id: 'totalLeads', value: '900', label: 'total leads count' },
  { id: 'avgConversionTime', value: '12', label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: '30', label: 'inactive leads', hasInfo: true, infoText: 'Leads with no activity in the last 30 days' },
];

interface ReasonsCardsProps {
  className?: string;
}

const ReasonsCards: React.FC<ReasonsCardsProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-8 gap-y-6">
          {reasonsData.map((reason) => (
            <div key={reason.id}>
              <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
              <p className="text-sm text-muted-foreground">{reason.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
          {otherDataStats.map((stat) => (
            <div key={stat.id}>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                {stat.hasInfo && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stat.infoText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReasonsCards;
