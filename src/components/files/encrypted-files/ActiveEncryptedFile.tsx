"use client";

import {
    activeEncryptedFileAtom,
    activeEncryptedFileProgressAtom,
} from "@/atoms/encrypt-files.atom";
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

export function ActiveEncryptedFile() {
    const activeEncryptedFile = useAtomValue(activeEncryptedFileAtom);
    const activeEncryptedFileProgress = useAtomValue(
        activeEncryptedFileProgressAtom
    );

    return (
        <div className="relative space-y-10">
            <FilesTitle>
                Active <CpuIcon />
            </FilesTitle>
            {activeEncryptedFile ? (
                <File.Root>
                    <File.Container>
                        <File.Content.Root>
                            <File.Content.Title>
                                {activeEncryptedFile.name}
                            </File.Content.Title>
                            <Progress value={activeEncryptedFileProgress} />
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
