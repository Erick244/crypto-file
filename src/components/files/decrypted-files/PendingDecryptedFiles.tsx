"use client";

import { pendingDecryptedFilesAtom } from "@/atoms/decrypt-files.atom";
import { File } from "@/components/file";
import { CryptoLink } from "@/components/ui/link";
import { Progress } from "@/components/ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAtomValue } from "jotai";
import { CircleIcon, LoaderIcon } from "lucide-react";
import { FilesTitle } from "../utils/FilesTitle";
import { NoFilesMessage } from "../utils/NoFilesMessage";

export function PendingDecryptedFiles() {
    const pendingDecryptedFiles = useAtomValue(pendingDecryptedFilesAtom);

    return (
        <div className="relative space-y-10">
            <FilesTitle>
                Pending <LoaderIcon />
            </FilesTitle>
            {pendingDecryptedFiles ? (
                pendingDecryptedFiles.map((file: File, i) => (
                    <File.Root key={i}>
                        <File.Container>
                            <File.Content.Root>
                                <File.Content.Title>
                                    {file.name}
                                </File.Content.Title>
                                <Progress value={0} />
                            </File.Content.Root>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CryptoLink href={"#"}>
                                            <CircleIcon className="w-4 h-4 animate-pulse" />
                                        </CryptoLink>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Pending</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </File.Container>
                    </File.Root>
                ))
            ) : (
                <NoFilesMessage>No files pending.</NoFilesMessage>
            )}
        </div>
    );
}
