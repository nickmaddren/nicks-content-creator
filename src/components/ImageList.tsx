import { useInfiniteImages } from "@/hooks/useInfiniteImages";
import { Link } from "react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { PICSUM_URL } from "@/App";

const Loader = () => <LoaderIcon className="size-10 animate-spin mx-auto" />;

export const ImageList = () => {
  const { data, isLoading, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteImages();
  const [observerRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Unable to load images</div>;
  if (!data) return <div>No images found</div>;

  const allImages = data.pages.flat();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-3 sm:gap-6">
        {allImages.map((image) => (
          <figure
            key={image.id}
            className="cursor-pointer shadow-md rounded-sm overflow-hidden"
          >
            <Link to={`/edit/${image.id}`}>
              <img
                loading="lazy"
                src={`${PICSUM_URL}/id/${image.id}/600`}
                alt={image.author}
                className="w-full aspect-square bg-gray-200"
              />
              <figcaption className="font-semibold tracking-tight px-4 py-3">
                {image.author} #{image.id}
              </figcaption>
            </Link>
          </figure>
        ))}
      </div>
      {isFetchingNextPage ? (
        <Loader />
      ) : (
        <div ref={observerRef} className="size-2 mx-auto"></div>
      )}
    </div>
  );
};
