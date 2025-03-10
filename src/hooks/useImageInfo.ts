import { PICSUM_URL } from "@/App";
import { useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

export type ImageInfo = {
  author: string;
  downloadUrl: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

const fetchImageInfo = async (id: string): Promise<ImageInfo> => {
  const response = await fetch(`${PICSUM_URL}/id/${id}/info`);
  if (!response.ok) throw new Error("Error fetching image info");

  const data = await response.json();
  return camelcaseKeys(data);
};

export const useImageInfo = (id?: string) =>
  useQuery({
    queryKey: ["image-info", id],
    queryFn: () => {
      if (!id) return;
      return fetchImageInfo(id);
    },
    enabled: !!id,
  });
