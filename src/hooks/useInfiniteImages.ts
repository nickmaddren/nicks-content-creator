import { useInfiniteQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import { ImageInfo } from "./useImageInfo";
import { PICSUM_URL } from "@/App";

const fetchImages = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ImageInfo[]> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  const response = await fetch(`${PICSUM_URL}/v2/list?${params}`);
  if (!response.ok) throw new Error("Error fetching images");

  const data = await response.json();
  return camelcaseKeys(data, {
    deep: true,
  });
};

export const useInfiniteImages = (limit = 30) =>
  useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({ pageParam }) => fetchImages({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ImageInfo[], allPages: ImageInfo[][]) =>
      lastPage.length < limit ? undefined : allPages.length + 1,
  });
