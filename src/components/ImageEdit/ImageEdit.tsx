import { useCallback, useEffect, useMemo, useState } from "react";
import { DownloadButton } from "../DownloadButton";
import { useDebounce } from "@uidotdev/usehooks";
import { LoaderIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import { ImageInfo } from "@/hooks/useImageInfo";
import { ResizeControls } from "./ResizeControls";
import { PICSUM_URL } from "@/App";
import { GrayscaleControl } from "./GrayscaleControl";
import { BlurControl } from "./BlurControl";

interface Props {
  image: ImageInfo;
}

export const ImageEdit = ({ image }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [grayscale, setGrayscale] = useState(
    searchParams.get("grayscale") === "true"
  );
  const [blur, setBlur] = useState(Number(searchParams.get("blur") || 0));
  const [dimensions, setDimensions] = useState([
    Number(searchParams.get("width")) || image.width,
    Number(searchParams.get("height")) || image.height,
  ]);
  const debouncedDimensions = useDebounce(dimensions, 500);
  const debouncedBlur = useDebounce(blur, 500);

  const handleDimension = useCallback(
    (value: number, dimension: "width" | "height") => {
      if (value < 10 || Number.isNaN(value)) {
        return 10;
      } else if (value > image[dimension]) {
        return image[dimension];
      } else {
        return value;
      }
    },
    [image]
  );

  const safeWidth = handleDimension(debouncedDimensions[0], "width");
  const safeHeight = handleDimension(debouncedDimensions[1], "height");

  const sharedParams = useMemo(
    () => ({
      ...(grayscale && { grayscale: "true" }),
      ...(debouncedBlur > 0 && { blur: debouncedBlur.toString() }),
    }),
    [grayscale, debouncedBlur]
  );

  const src = useMemo(() => {
    const params = new URLSearchParams(sharedParams);
    return `${PICSUM_URL}/id/${image.id}/${safeWidth}/${safeHeight}?${params}`;
  }, [safeWidth, safeHeight, sharedParams]);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    if (image.complete) return;
    setIsLoading(true);
  }, [src]);

  useEffect(() => {
    const params = new URLSearchParams({
      width: safeWidth.toString(),
      height: safeHeight.toString(),
      ...sharedParams,
    });
    setSearchParams(params, { replace: true });
  }, [safeWidth, safeHeight, sharedParams, setSearchParams]);

  return (
    <>
      <div className="flex-1 flex flex-col gap-8 sm:flex-row">
        <div className="flex-1 flex items-center justify-center relative bg-gray-100 inset-shadow-sm">
          <img
            src={src}
            onLoad={() => setIsLoading(false)}
            className="max-w-full max-h-full absolute"
          />
          {isLoading ? (
            <div className="absolute">
              <LoaderIcon className="size-10 animate-spin" />
            </div>
          ) : null}
        </div>
        <div className="w-full flex flex-col gap-8 justify-between sm:w-60">
          <div className="flex flex-col gap-8">
            <BlurControl blur={blur} setBlur={setBlur} />
            <GrayscaleControl
              grayscale={grayscale}
              setGrayscale={setGrayscale}
            />
            <ResizeControls
              dimensions={dimensions}
              setDimensions={setDimensions}
            />
          </div>
          <DownloadButton
            src={src}
            filename={image.author.replace(/ /g, "-").toLowerCase()}
          >
            Download Image
          </DownloadButton>
        </div>
      </div>
    </>
  );
};
