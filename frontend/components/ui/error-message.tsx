import { cn } from "@/lib/utils";

type ErrorMessageProps = React.ComponentProps<"p"> & { message?: string };

export const ErrorMessage = ({
  className,
  message,
  ...props
}: ErrorMessageProps) => {
  return (
    <p
      className={cn("font-body text-center text-sm text-red-500", className)}
      {...props}
    >
      {message}
    </p>
  );
};
