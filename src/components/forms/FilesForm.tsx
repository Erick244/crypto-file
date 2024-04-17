"use client";

import {
    activeEncryptedFileAtom,
    activeEncryptedFileProgressAtom,
    completedEncryptedFilesAtom,
    pendingEncryptedFilesAtom,
} from "@/atoms/encrypt-files.atom";
import { useAtom, useSetAtom } from "jotai";
import { FilesIcon, PlayIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

interface FilesFormProps {
    postUrl: string;
}

// TODO: Clean CODE

export function FilesForm({ postUrl }: FilesFormProps) {
    const [files, setFiles] = useState<File[] | null>(null);

    const [activeEncryptedFile, setActiveEncryptedFile] = useAtom(
        activeEncryptedFileAtom
    );
    const setPendingEncryptedFiles = useSetAtom(pendingEncryptedFilesAtom);
    const setCompletedEncryptedFiles = useSetAtom(completedEncryptedFilesAtom);
    const setActiveEncryptedFileProgress = useSetAtom(
        activeEncryptedFileProgressAtom
    );

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const filesData = e.target.files;
        const filesArray = filesData
            ? (Array.prototype.slice.call(filesData) as File[])
            : null;

        if (!filesArray || filesNotSelected(filesArray)) {
            setFiles(null);
            return;
        }

        setFiles(filesArray);
    }

    function filesNotSelected(files: File[] | null) {
        return !files || files.length < 1;
    }

    async function onSubmit(e: FormEvent) {
        e.preventDefault();

        if (!files || filesNotSelected(files)) {
            toast({
                title: "Error",
                description: "Please select any file.",
            });
            return;
        }

        setPendingEncryptedFiles(files);

        for (const file of files) {
            console.log("EXEC - FOR");

            updatePendingFiles();

            setActiveEncryptedFileProgress(0);
            setActiveEncryptedFile(file);

            const calcInterval = calcActiveFileProgress();

            const formData = new FormData();
            formData.append("file", file);

            const resp = await fetch(`http://localhost:3000/${postUrl}`, {
                method: "POST",
                body: formData,
            });

            await fakeDelay(1000);
            const data = await resp.json();
            const downloadLink = data.downloadLink;

            addNewCompletedFile(file, downloadLink);

            clearInterval(calcInterval);
            setActiveEncryptedFileProgress(100);

            setActiveEncryptedFile(null);

            const fiveMinutesInMs = 60 * 60 * 5 * 1000;
            setTimeout(() => {
                updateCompletedFiles();
                toast({
                    title: file.name,
                    description: "Deleted after 5 minutes.",
                });
            }, 10000); // TODO: Change
        }
    }

    function updatePendingFiles() {
        setPendingEncryptedFiles((pendingFiles) => {
            const pendingFilesClone = pendingFiles ? [...pendingFiles] : [];

            const currentFileIndex = 0;
            pendingFilesClone.splice(currentFileIndex, 1);

            return pendingFilesClone.length < 1 ? null : pendingFilesClone;
        });
    }

    function updateCompletedFiles() {
        setCompletedEncryptedFiles((completedFiles) => {
            const completedFilesClone = completedFiles
                ? [...completedFiles]
                : [];

            const currentFileIndex = 0;
            completedFilesClone.splice(currentFileIndex, 1);

            return completedFilesClone.length < 1 ? null : completedFilesClone;
        });
    }

    function calcActiveFileProgress() {
        const intervalTime = 100;
        const startTime = Date.now();

        return setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const totalProgress = elapsedTime / 20;
            setActiveEncryptedFileProgress(Math.min(totalProgress, 100));

            console.log("EXEC - INTERVAL");
        }, intervalTime);
    }

    function addNewCompletedFile(file: File, downloadLink: string) {
        setCompletedEncryptedFiles((completedFiles) => {
            const completedFilesClone = completedFiles
                ? [...completedFiles]
                : [];
            completedFilesClone.push({ file, downloadLink });

            return completedFilesClone.length < 1 ? null : completedFilesClone;
        });
    }

    function fakeDelay(time: number) {
        return new Promise((res) => {
            setTimeout(() => {
                return res("Ok");
            }, time);
        });
    }

    return (
        <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center gap-5"
        >
            <div className="cursor-pointer overflow-ellipsis relative h-52 max-w-xl w-full border-2 border-border border-dashed rounded bg-background flex justify-center items-center">
                <Input
                    onChange={onChange}
                    name="files"
                    type="file"
                    className="h-full w-full absolute opacity-0 cursor-pointer"
                    multiple
                />
                <div className="flex flex-col justify-center items-center text-muted-foreground gap-2">
                    <FilesIcon className="w-10 h-10" />
                    <span className="text-sm">Select or drop the file.</span>
                    {files && (
                        <span className="text-xs mx-2 text-center">
                            {files.length} selected.
                        </span>
                    )}
                </div>
            </div>

            <Button
                disabled={!!activeEncryptedFile}
                type="submit"
                className="px-20 relative group overflow-hidden"
                aria-label="Send"
                variant="outline"
            >
                <div className="transition-all duration-300 flex flex-col items-center absolute gap-5 top-2 group-hover:-translate-y-9">
                    <span>Send</span>
                    <PlayIcon className="w-4 h-4" />
                </div>
            </Button>
        </form>
    );
}
