import { Field, FieldLabel } from "./ui/field";
import { Progress } from "./ui/progress";

export function ProgressWithLabel({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <Field className="w-full max-w-sm gap-2 py-2">
      <FieldLabel htmlFor="progress-upload">
        <span className="font-body text-lg">{label}</span>
        <span className="ml-auto font-body text-lg">{value}%</span>
      </FieldLabel>
      <Progress
        value={value}
        id="progress-upload"
        className="h-2 bg-zinc-800"
      />
    </Field>
  );
}
