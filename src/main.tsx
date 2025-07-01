import { createRoot } from 'react-dom/client'
import Root from './router/index.tsx'
import { ConfigProvider } from 'antd';
import './index.css'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient ({
  defaultOptions:{queries:{retry:2, retryDelay:1000}},
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#050556",
        },
      }}
    >
      <Root />
    </ConfigProvider>
  </QueryClientProvider>
);
