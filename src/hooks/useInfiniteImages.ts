import { useInfiniteQuery } from "@tanstack/react-query";

const fetchImages = async ({ pageParam = 1 }) => {
  const limit = 20;
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Error fetching images");
  }
  return response.json();
};

// A reusable hook for infinite scrolling images.
export const useInfiniteImages = () => {
  return useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any[], allPages: any[][]) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};
