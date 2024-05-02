import { PropsWithChildren } from 'react';
import { useBlocker } from '@tanstack/react-router';

export default function Blocker({ children }: PropsWithChildren) {
  useBlocker(() => window.confirm('Are you sure you want to leave?'), true);
  return <div>{children}</div>;
}
