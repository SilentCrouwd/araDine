import type { ReactNode } from "react";

type DetailRowProps = Readonly<{
  label: string;
  children: ReactNode;
}>;

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-border/50 py-2 last:border-b-0">
      <p className="text-xs uppercase tracking-wider text-muted-foreground/80">
        {label}
      </p>
      <div className="wrap-break-word font-semibold text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export default DetailRow;
