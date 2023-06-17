import React from 'react';
import { NavLink } from 'react-router-dom';
import { ERoutes } from '../../router/constants';

export const ProfileNavigation = () => {
  return (
    <div>
      <NavLink to={ERoutes.PROFILE}>Profile</NavLink>
      <NavLink to={ERoutes.PROFILE_STATISTICS}>Statistics</NavLink>
    </div>
  );
};
