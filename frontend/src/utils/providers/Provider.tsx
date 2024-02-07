'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AlarmProvider from '@/utils/providers/AlarmProvider';

import StyledComponentsRegistry from '@/utils/providers/StyledComponentsRegistry';

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <AlarmProvider>{children}</AlarmProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
};

export default Provider;
