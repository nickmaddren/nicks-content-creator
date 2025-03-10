import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface Props {
  blur: number;
  setBlur: (value: number) => void;
}

export const BlurControl = ({ blur, setBlur }: Props) => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-1">
      <Label htmlFor="blur">Blur</Label>
      <span className="text-sm text-gray-600">{blur}</span>
    </div>
    <Slider
      id="blur"
      value={[blur]}
      onValueChange={(value: number[]) => setBlur(value[0])}
      min={0}
      max={10}
    />
  </div>
);
