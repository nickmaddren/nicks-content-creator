import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useLoadingBar } from "react-top-loading-bar";
import { ErrorBoundary } from "react-error-boundary";
import { useImageInfo } from "@/hooks/useImageInfo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ImageEdit } from "./ImageEdit";
import { Badge } from "../ui/badge";

export const ImageEditDialog = () => {
  let navigate = useNavigate();
  let params = useParams();
  const { start, complete } = useLoadingBar();
  const { data, isLoading, isError } = useImageInfo(params.id);

  const handleClose = () => navigate("/");

  useEffect(() => {
    if (isLoading) {
      start();
    } else {
      complete();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) toast.error("Error fetching image");
  }, [isError]);

  if (!data) return null;

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="h-[90vh] flex flex-col">
        <ErrorBoundary
          fallback={
            <div className="flex-1 flex items-center justify-center">
              Something went wrong when editing, please get in touch with Nick.
            </div>
          }
        >
          <DialogHeader className="flex sm:flex-row">
            <DialogTitle>Image Editor</DialogTitle>
            <DialogDescription>
              <Badge variant="secondary">
                {data.author} #{data.id}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <ImageEdit image={data} />
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};
