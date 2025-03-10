import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { ImageEditDialog } from "./components/ImageEdit/ImageEditDialog";
import { ImageListPage } from "./components/ImageListPage";
import { LoadingBarContainer } from "react-top-loading-bar";

export const PICSUM_URL = "https://picsum.photos";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallback={
          <div>Something went wrong, please get in touch with Nick.</div>
        }
      >
        <LoadingBarContainer
          props={{
            color: "#2B7FFF",
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ImageListPage />}>
                <Route path="edit/:id" element={<ImageEditDialog />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LoadingBarContainer>
        <Toaster />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
