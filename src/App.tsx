import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImageList } from "./components/ImageList/ImageList";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageList />
    </QueryClientProvider>
  );
}

export default App;
