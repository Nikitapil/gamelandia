import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

interface IAppNavLinkProps {
  to: string;
  text: string;
  classNames: string[];
  activeClassNames: string[];
}

export const AppNavLink = ({ to, classNames, activeClassNames, text }: IAppNavLinkProps) => {
  const getClassname = useCallback(
    ({ isActive }: { isActive: boolean }) => {
      return isActive ? activeClassNames.join(' ') : classNames.join(' ');
    },
    [activeClassNames, classNames]
  );

  return (
    <NavLink
      className={getClassname}
      to={to}
      end
    >
      {text}
    </NavLink>
  );
};
