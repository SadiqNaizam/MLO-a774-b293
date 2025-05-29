import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // The SidebarNav component (imported from ../Dashboard/SidebarNav)
  // already implements its own fixed positioning, width, height, and background
  // as per the project's requirements for the sidebar organism.
  // This Sidebar layout component primarily serves as a structural element within the MainAppLayout
  // and passes through any additional classNames.
  return (
    <SidebarNav className={cn(className)} />
  );
};

export default Sidebar;