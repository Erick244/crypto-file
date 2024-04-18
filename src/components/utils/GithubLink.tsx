import { cn } from "@/lib/utils";
import { GithubIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import { CryptoLink } from "../ui/link";

export function GithubLink(props: HTMLAttributes<HTMLElement>) {
    return (
        <CryptoLink
            {...props}
            className={cn("p-2 xl:fixed bottom-10 left-5", props.className)}
            href="https://github.com/Erick244/crypto-file"
            target="_blank"
        >
            <GithubIcon />
        </CryptoLink>
    );
}
