import { cn } from "@/lib/utils";

type ErrorMessageProps = React.ComponentProps<"p"> & { message?: string };

export const ErrorMessage = ({
  className,
  message,
  ...props
}: ErrorMessageProps) => {
  return (
    <p
      className={cn("text-red-500 font-body text-center text-sm", className)}
      {...props}
    >
      {message}
    </p>
  );
};
