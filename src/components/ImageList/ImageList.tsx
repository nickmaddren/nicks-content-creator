import { useInfiniteImages } from "@/hooks/useInfiniteImages";

export const ImageList = () => {
  const { data, status } = useInfiniteImages();
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;
  if (!data) return <div>No images found</div>;
  return (
    <div>
      {data.pages.map((page) =>
        page.map((image) => (
          <div key={image.id}>
            <img src={image.download_url} alt={image.author} />
          </div>
        ))
      )}
    </div>
  );
};
