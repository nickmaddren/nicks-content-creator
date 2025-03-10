import { useImageInfo } from "@/hooks/useImageInfo";
import { useNavigate, useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ImageEdit } from "./ImageEdit";
import { Badge } from "../ui/badge";
import { ErrorBoundary } from "react-error-boundary";
import { LoaderIcon } from "lucide-react";
import { ReactNode } from "react";

const StatusContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex-1 flex items-center justify-center">{children}</div>
);

export const ImageEditDialog = () => {
  let navigate = useNavigate();
  let params = useParams();
  const { data, isLoading } = useImageInfo(params.id);

  const handleClose = () => navigate("/");

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="h-[90vh] flex flex-col">
        <ErrorBoundary
          fallback={
            <StatusContainer>
              Something went wrong when editing, please get in touch with Nick.
            </StatusContainer>
          }
        >
          {isLoading ? (
            <StatusContainer>
              <LoaderIcon className="size-10 animate-spin" />
            </StatusContainer>
          ) : data ? (
            <>
              <DialogHeader className="flex sm:flex-row">
                <DialogTitle>Image Editor</DialogTitle>
                <DialogDescription>
                  <Badge variant="secondary">
                    {data.author} #{data.id}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              <ImageEdit image={data} />
            </>
          ) : (
            <StatusContainer>Image not found</StatusContainer>
          )}
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};
