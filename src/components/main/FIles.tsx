"use client";

import { useFilesContext } from "@/contexts/FilesContext";
import { CircleIcon, DownloadIcon } from "lucide-react";
import { File } from "../file";
import { CryptoLink } from "../ui/link";
import { Progress } from "../ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { H2 } from "../ui/typography/H2";
import { Loader } from "../utils/Loader";

export function FIles() {
    const { pendingFiles, activeFile, completedFiles } = useFilesContext();

    const pendingFilesArray = pendingFiles
        ? Array.prototype.slice.call(pendingFiles)
        : null;

    const completedFilesArray = completedFiles
        ? Array.prototype.slice.call(completedFiles)
        : null;

    return (
        <div className="w-full space-y-10">
            <H2>Active</H2>
            {activeFile ? (
                <File.Root>
                    <File.Container>
                        <File.Content.Root>
                            <File.Content.Title>
                                {activeFile.name}
                            </File.Content.Title>
                            <Progress value={43} />
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

            <H2>Pending</H2>
            {pendingFilesArray ? (
                pendingFilesArray.map((file: File, i) => (
                    <File.Root key={i}>
                        <File.Container>
                            <File.Content.Root>
                                <File.Content.Title>
                                    {file.name}
                                </File.Content.Title>
                                <Progress value={43} />
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

            <H2>Completed</H2>
            {completedFilesArray ? (
                completedFilesArray.map((file: File, i) => (
                    <File.Root key={i}>
                        <File.Container>
                            <File.Content.Root>
                                <File.Content.Title>
                                    {file.name}
                                </File.Content.Title>
                                <Progress value={43} />
                            </File.Content.Root>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CryptoLink href={"#"}>
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
                <NoFilesMessage>No files completed.</NoFilesMessage>
            )}
        </div>
    );
}

function NoFilesMessage({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-muted-foreground border-border border-2 p-2 rounded text-center text-sm">
            {children}
        </p>
    );
}
