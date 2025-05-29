import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader';

interface HeaderProps {
  className?: string;
  // The TopHeader component currently has a hardcoded title "Dashboard".
  // If the title needed to be dynamic (e.g., changing per page),
  // the TopHeader component would need to be modified to accept a 'title' prop,
  // and this Header component could then pass it down.
  // title?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // The TopHeader component (imported from ../Dashboard/TopHeader)
  // already implements its own fixed positioning, height, background, and layout
  // (including page title and action buttons) as per project requirements for the header organism.
  // This Header layout component serves as a structural element within MainAppLayout
  // and passes through any additional classNames.
  return (
    <TopHeader className={cn(className)} />
  );
};

export default Header;