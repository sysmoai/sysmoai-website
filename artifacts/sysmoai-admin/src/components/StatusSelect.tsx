import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUSES, statusLabel, type SubmissionStatusValue } from "@/lib/format";

interface StatusSelectProps {
  value: string;
  onChange: (next: SubmissionStatusValue) => void;
  disabled?: boolean;
  testId?: string;
}

export function StatusSelect({ value, onChange, disabled, testId }: StatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as SubmissionStatusValue)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]" data-testid={testId ?? "select-status"}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s} value={s} data-testid={`option-status-${s}`}>
            {statusLabel(s)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
