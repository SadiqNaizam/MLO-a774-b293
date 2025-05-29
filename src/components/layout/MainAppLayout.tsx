import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  // This layout uses fixed positioning for Sidebar and Header.
  // Sidebar width is 250px (from SidebarNav component).
  // Header height is 70px (from TopHeader component).

  // The main content area is offset using margin/padding to accommodate the fixed elements.
  // `ml-[250px]` accounts for the sidebar width.
  // `pt-[70px]` accounts for the header height.

  // The main content scrollable area (`<main>`) is set to `h-[calc(100vh-70px)]`
  // to ensure it fills the remaining viewport height below the fixed header, enabling
  // `overflow-y-auto` to work correctly for content that exceeds this height.

  // `p-6` is applied to the <main> element as per `mainContent.layout` requirements.
  // The inner `div` with `flex flex-col gap-6` is as per `mainContent.container` requirements.
  
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <Sidebar />
      <Header />
      <div className="ml-[250px] pt-[70px]">
        <main className="p-6 h-[calc(100vh-70px)] overflow-y-auto">
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
