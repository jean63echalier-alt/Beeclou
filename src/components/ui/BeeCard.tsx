import clsx from "clsx";

interface BeeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BeeCard({ children, className, ...props }: BeeCardProps) {
  return (
    <div
      className={clsx(
        "bg-bee-card rounded-3xl shadow-sm p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
