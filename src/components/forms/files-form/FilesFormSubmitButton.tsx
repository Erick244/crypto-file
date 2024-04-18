import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";

interface FilesFormSubmitButtonProps extends ButtonProps {
    children: React.ReactNode;
}

export function FilesFormSubmitButton({
    children,
    ...props
}: FilesFormSubmitButtonProps) {
    return (
        <Button
            {...props}
            type="submit"
            className={cn(
                "px-20 relative group overflow-hidden",
                props.className
            )}
            aria-label="Submit"
            variant="outline"
        >
            <div className="transition-all duration-300 flex flex-col items-center absolute gap-5 top-2 group-hover:-translate-y-9">
                <span>{children}</span>
                <PlayIcon className="w-4 h-4" />
            </div>
        </Button>
    );
}
