import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind background color class e.g. bg-red-500
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-500' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: 'average time on this stage', color: 'bg-indigo-600' }, // Using indigo as per a common dark blue/purple
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-600' },
];

const totalActiveLeads = 600;

interface FunnelTableProps {
  className?: string;
}

const FunnelTable: React.FC<FunnelTableProps> = ({ className }) => {
  const totalCountForBar = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className={cn('bg-card text-card-foreground', className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl font-semibold">Funnel count</CardTitle>
                <p className="text-3xl font-bold mt-1">{totalActiveLeads} <span className="text-base font-normal text-muted-foreground">active leads</span></p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex h-3 rounded-full overflow-hidden bg-secondary">
            {funnelData.map((stage) => (
              <div
                key={stage.id}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / totalCountForBar) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {funnelData.map((stage) => (
            <div key={stage.id} className="flex items-center text-sm">
              <div className="flex items-center w-2/5">
                <span className={cn('h-3 w-3 rounded-sm mr-2', stage.color)}></span>
                <span>{stage.name}</span>
              </div>
              <div className="w-1/5 text-right text-foreground font-medium">{stage.count}</div>
              <div className="w-1/5 text-right text-muted-foreground">$ {stage.value}</div>
              <div className="w-1/5 text-right text-muted-foreground">
                {stage.id === 'qualified' ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="cursor-default underline decoration-dashed decoration-muted-foreground/50">{stage.time}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Average time on this stage</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : stage.id === 'inConversation' ? (
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{stage.time}</span>
                ) : (
                    stage.time
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelTable;
