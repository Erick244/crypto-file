"use client";

import { completedEncryptedFilesAtom } from "@/atoms/encrypt-files.atom";
import { File } from "@/components/file";
import { CryptoLink } from "@/components/ui/link";
import { Progress } from "@/components/ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { H2 } from "@/components/ui/typography/H2";
import { useAtomValue } from "jotai";
import { DownloadIcon, FileCheckIcon } from "lucide-react";
import { NoFilesMessage } from "../utils/NoFilesMessage";

export function CompletedEncryptedFiles() {
    const completedEncryptedFiles = useAtomValue(completedEncryptedFilesAtom);

    return (
        <>
            <H2 className="flex justify-between items-center">
                Completed <FileCheckIcon />
            </H2>
            {completedEncryptedFiles ? (
                completedEncryptedFiles.map((completedFile, i) => (
                    <File.Root key={i}>
                        <File.Container>
                            <File.Content.Root>
                                <File.Content.Title>
                                    {completedFile.file?.name}
                                </File.Content.Title>
                                <Progress value={100} />
                            </File.Content.Root>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CryptoLink
                                            href={
                                                completedFile.downloadLink || ""
                                            }
                                            target="_blank"
                                            download
                                        >
                                            <DownloadIcon className="w-4 h-4" />
                                        </CryptoLink>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Download</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </File.Container>
                    </File.Root>
                ))
            ) : (
                <NoFilesMessage>No files encrypted.</NoFilesMessage>
            )}
        </>
    );
}
