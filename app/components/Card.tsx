import * as React from 'react';

type CardProps = {
  children: React.ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return <div className="bg-gray-100 rounded-lg p-6">{children}</div>;
};
