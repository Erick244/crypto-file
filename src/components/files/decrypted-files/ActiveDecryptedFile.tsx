"use client";

import {
    activeDecryptedFileAtom,
    activeDecryptedFileProgressAtom,
} from "@/atoms/decrypt-files.atom";
import { File } from "@/components/file";
import { CryptoLink } from "@/components/ui/link";
import { Progress } from "@/components/ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader } from "@/components/utils/Loader";
import { useAtomValue } from "jotai";
import { CpuIcon } from "lucide-react";
import { FilesTitle } from "../utils/FilesTitle";
import { NoFilesMessage } from "../utils/NoFilesMessage";

export function ActiveDecryptedFile() {
    const activeDecryptedFile = useAtomValue(activeDecryptedFileAtom);
    const activeDecryptedFileProgress = useAtomValue(
        activeDecryptedFileProgressAtom
    );

    return (
        <div className="relative space-y-10">
            <FilesTitle>
                Active <CpuIcon />
            </FilesTitle>
            {activeDecryptedFile ? (
                <File.Root>
                    <File.Container>
                        <File.Content.Root>
                            <File.Content.Title>
                                {activeDecryptedFile.name}
                            </File.Content.Title>
                            <Progress value={activeDecryptedFileProgress} />
                        </File.Content.Root>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <CryptoLink href={"#"}>
                                        <Loader />
                                    </CryptoLink>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Loading...</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </File.Container>
                </File.Root>
            ) : (
                <NoFilesMessage>No files in working.</NoFilesMessage>
            )}
        </div>
    );
}
