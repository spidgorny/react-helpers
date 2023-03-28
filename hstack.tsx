import { Stack } from "react-bootstrap";
import cn from "classnames";

export function HStack({
  className,
  children,
  gap,
  start,
  between,
  end,
  top,
  bottom,
}: {
  className?: string;
  children: any;
  gap?: number;
  start?: boolean;
  between?: boolean;
  end?: boolean;
  top?: boolean;
  bottom?: boolean;
}) {
  return (
    <div
      // gap={gap ?? 3}
      className={cn(
        "flex flex-row",
        className ?? "justify-between",
        gap && "gap-" + gap,
        {
          "justify-start": start,
          "justify-between": between,
          "justify-end": end,
          "items-start": top,
          "items-end": bottom,
        }
      )}
    >
      {children}
    </div>
  );
}

export function VStack({
  className,
  children,
  gap,
}: {
  className?: string;
  children: any;
  gap?: number;
}) {
  return (
    <div
      // gap={gap}
      className={cn(
        "flex-column flex flex-col",
        className ?? "justify-between",
        gap && "gap-" + gap
      )}
    >
      {children}
    </div>
  );
}
