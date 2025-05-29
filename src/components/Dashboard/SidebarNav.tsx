import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Users,
  User,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  BoxIcon, // Placeholder for BO logo
  MenuIcon // As seen next to logo, though its function might be in layout
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  section?: string;
}

const navItemsData: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '#', isActive: true, section: 'Main' },
  { id: 'leads', label: 'Leads', icon: Users, href: '#', section: 'Main' },
  { id: 'customers', label: 'Customers', icon: User, href: '#', section: 'Main' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#', section: 'Documents' },
  { id: 'invoices', label: 'Invoices', icon: Receipt, href: '#', section: 'Documents' },
  { id: 'items', label: 'Items', icon: ShoppingCart, href: '#', section: 'Documents' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#', section: 'Communication' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#', section: 'Communication' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#', section: 'Communication' },
];

const bottomNavItemsData: NavItem[] = [
  { id: 'help1', label: 'Help', icon: HelpCircle, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'help2', label: 'Help', icon: HelpCircle, href: '#' }, // Example of multiple help icons if needed
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  const groupedNavItems = navItemsData.reduce((acc, item) => {
    const section = item.section || 'Default';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <nav className={cn('h-screen w-[250px] bg-sidebar text-sidebar-foreground flex flex-col fixed left-0 top-0 p-4 space-y-4', className)}>
      <div className="flex items-center space-x-2 p-2 mb-4">
        <MenuIcon className="h-6 w-6 text-sidebar-foreground/70" />
        <BoxIcon className="h-8 w-8 text-primary" /> 
        <span className="font-bold text-xl text-sidebar-foreground">Brand</span>
      </div>

      <div className="flex-grow overflow-y-auto space-y-6 pr-2">
        {Object.entries(groupedNavItems).map(([sectionName, items]) => (
          <div key={sectionName} className="space-y-1">
            {sectionName !== 'Main' && sectionName !== 'Default' && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase px-3 pt-3 pb-1">{sectionName}</h3>
            )}
            {items.map((item) => {
              const IconComponent = item.icon;
              const isActive = item.id === activeItem;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start text-sm',
                    isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                  onClick={() => setActiveItem(item.id)}
                  asChild
                >
                  <a href={item.href}>
                    <IconComponent className="mr-3 h-5 w-5" />
                    {item.label}
                  </a>
                </Button>
              );
            })}
          </div>
        ))}
      </div>
      
      <Separator className="bg-sidebar-border my-4" />
      
      <div className="space-y-1 pr-2">
        {bottomNavItemsData.map((item) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={item.id}
              variant='ghost'
              className='w-full justify-start text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              asChild
            >
              <a href={item.href}>
                <IconComponent className="mr-3 h-5 w-5" />
                {item.label}
              </a>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNav;
