import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { DownloadIcon, LoaderIcon } from "lucide-react";

interface Props {
  children: ReactNode;
  src: string;
  filename?: string;
}

async function downloadResource(src: string, filename?: string) {
  const resource = await fetch(src);
  const blob = await resource.blob();
  const resourceURL = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = resourceURL;
  link.download = filename || "file";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const DownloadButton = ({ children, src, filename }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      await downloadResource(src, filename);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      disabled={isLoading}
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleDownload}
    >
      {isLoading ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : (
        <DownloadIcon className="size-4" />
      )}
      {children}
    </Button>
  );
};
