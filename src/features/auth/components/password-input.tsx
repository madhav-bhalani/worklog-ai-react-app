import { useId, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";

type PasswordInputProps = Omit<InputProps, "type">;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const descriptionId = useId();

  return (
    <div className="relative">
      <Input
        {...props}
        aria-describedby={props["aria-describedby"] ?? descriptionId}
        className={`pr-11 ${className ?? ""}`}
        type={isVisible ? "text" : "password"}
      />
      <span className="sr-only" id={descriptionId}>
        Password is {isVisible ? "visible" : "hidden"}.
      </span>
      <Button
        aria-label={isVisible ? "Hide password" : "Show password"}
        className="text-muted-foreground hover:text-foreground absolute top-0 right-0 h-10 w-10"
        onClick={() => setIsVisible((visible) => !visible)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {isVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </Button>
    </div>
  );
}
