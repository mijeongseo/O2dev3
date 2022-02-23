import React from 'react';
import Header from '@components/common/Header';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  return (
    <>
      <Header headerHeight="40px" logoWidth="330px" />
      {children}
    </>
  );
}
