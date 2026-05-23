import clsx from "clsx";

interface BeeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function BeeButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: BeeButtonProps) {
  return (
    <button
      className={clsx(
        "font-bold rounded-3xl transition-all",
        variant === "primary" && "bg-bee-yellow text-bee-text hover:shadow-lg",
        variant === "secondary" && "bg-bee-card text-bee-text border-2 border-bee-text hover:bg-bee-bg",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
