'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import StyledComponentsRegistry from '@/utils/providers/StyledComponentsRegistry';

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StyledComponentsRegistry>
  );
};

export default Provider;
