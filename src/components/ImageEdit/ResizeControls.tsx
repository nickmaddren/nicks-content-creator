import { useState } from "react";
import { Input } from "../ui/input";
import { LockIcon, UnlockIcon } from "lucide-react";
import { Label } from "../ui/label";
import clsx from "clsx";

interface Props {
  dimensions: number[];
  setDimensions: (value: number[]) => void;
}

export const ResizeControls = ({ dimensions, setDimensions }: Props) => {
  const [aspectRatio, setAspectRatio] = useState<null | number>(
    dimensions[0] / dimensions[1]
  );

  const handleWidthChange = (value: number) => {
    if (aspectRatio) {
      setDimensions([value, Math.round(value / aspectRatio)]);
    } else {
      setDimensions([value, dimensions[1]]);
    }
  };

  const handleHeightChange = (value: number) => {
    if (aspectRatio) {
      setDimensions([Math.round(value * aspectRatio), value]);
    } else {
      setDimensions([dimensions[0], value]);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="width">Width</Label>
        <Input
          id="width"
          type="number"
          value={dimensions[0]}
          onChange={(e) => handleWidthChange(e.target.valueAsNumber)}
        />
      </div>
      <button
        aria-label="Lock aspect ratio"
        title={`Aspect ratio is ${aspectRatio ? "locked" : "unlocked"}`}
        type="button"
        onClick={() =>
          setAspectRatio(aspectRatio ? null : dimensions[0] / dimensions[1])
        }
      >
        {aspectRatio ? (
          <LockIcon className={clsx("size-4 mt-5")} />
        ) : (
          <UnlockIcon className={clsx("size-4 mt-5 text-gray-500")} />
        )}
      </button>
      <div className="flex flex-col gap-2">
        <Label htmlFor="height">Height</Label>
        <div className="flex items-center gap-2">
          <Input
            id="height"
            type="number"
            value={dimensions[1]}
            onChange={(e) => handleHeightChange(e.target.valueAsNumber)}
          />
          <span className="text-sm text-gray-600">px</span>
        </div>
      </div>
    </div>
  );
};
