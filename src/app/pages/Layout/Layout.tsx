import React from 'react';
import { Outlet } from 'react-router-dom';
import { CommonLayout } from '../../components/CommonLayout/CommonLayout';

export const Layout = () => {
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
};
