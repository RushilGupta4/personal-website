'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  exact?: boolean;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

const NavLink = ({ to, exact = false, children, className = '', activeClassName = '', onClick }: NavLinkProps): JSX.Element => {
  const pathname = usePathname();
  const isActive = exact ? pathname === to : pathname.startsWith(to);
  const combinedClassName = cn(className, isActive && activeClassName);

  return (
    <Link href={to} className={combinedClassName} onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavLink;
