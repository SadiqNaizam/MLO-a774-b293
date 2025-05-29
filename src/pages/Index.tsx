import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatCards from '@/components/Dashboard/StatCards';
import FunnelTable from '@/components/Dashboard/FunnelTable';
import SourcesChart from '@/components/Dashboard/SourcesChart';
import LeadsTrackingChart from '@/components/Dashboard/LeadsTrackingChart';
import ReasonsCards from '@/components/Dashboard/ReasonsCards';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LeadsDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'sales' | 'leads'>('leads');

  return (
    <MainAppLayout>
      {/* StatCards are displayed regardless of the selected tab, typically at the top */}
      <StatCards />

      {/* Sales/Leads Tabs Navigation */}
      <div className="flex border-b border-border -mt-2 mb-1"> {/* Adjust margins to look closer to screenshot */} 
        <Button
          variant="ghost"
          onClick={() => setActiveTab('sales')}
          className={cn(
            "py-3 px-4 text-sm font-medium rounded-none relative top-[1px]", // top-[1px] to align border with container border
            activeTab === 'sales'
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Sales
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab('leads')}
          className={cn(
            "py-3 px-4 text-sm font-medium rounded-none relative top-[1px]",
            activeTab === 'leads'
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Leads
        </Button>
      </div>

      {/* Content for Leads Tab */}
      {activeTab === 'leads' && (
        <>
          {/* FunnelTable and SourcesChart side-by-side on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FunnelTable />
            <SourcesChart />
          </div>

          {/* LeadsTrackingChart takes full width */}
          <LeadsTrackingChart />

          {/* ReasonsCards takes full width (it's internally a grid) */}
          <ReasonsCards />
        </>
      )}

      {/* Placeholder content for Sales Tab */}
      {activeTab === 'sales' && (
        <div className="py-10 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Sales Overview</h2>
          <p className="text-muted-foreground">
            Sales-specific data, charts, and tables would be displayed here.
          </p>
          {/* Example: Could include different StatCards or other sales-focused components */}
        </div>
      )}
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
