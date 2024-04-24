import { H2 } from "@/components/ui/typography/H2";

interface FilesTitleProps {
    children: React.ReactNode;
}

export function FilesTitle({ children }: FilesTitleProps) {
    return (
        <H2 className="flex justify-between items-center sticky top-20 bottom-0 bg-background/80 backdrop-blur-sm z-10">
            {children}
        </H2>
    );
}
