import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface Props {
  grayscale: boolean;
  setGrayscale: (value: boolean) => void;
}

export const GrayscaleControl = ({ grayscale, setGrayscale }: Props) => (
  <div className="flex flex-col gap-2">
    <Label htmlFor="grayscale">Grayscale</Label>
    <Switch id="grayscale" checked={grayscale} onCheckedChange={setGrayscale} />
  </div>
);
