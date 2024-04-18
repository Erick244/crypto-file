"use client";

import { CompletedFile } from "@/atoms/encrypt-files.atom";
import { toast } from "@/components/ui/use-toast";
import { ChangeEvent, useState } from "react";

export function useFilesForm() {
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const filesData = e.target.files;
        const filesArray = filesData
            ? (Array.prototype.slice.call(filesData) as File[])
            : [];

        if (
            filesIsNotSelected(filesArray) ||
            filesCountExceededTheLimit(filesArray.length)
        ) {
            setSelectedFiles(null);
            return;
        }

        const filesFiltered = filterSizeLimitFiles(filesArray);
        setSelectedFiles(returnNullIfArrayIsEmpty(filesFiltered));
    }

    function filesCountExceededTheLimit(filesCount: number) {
        const maxLength = 10;

        if (filesCount > maxLength) {
            toast({
                title: "Files Limit",
                description:
                    "The limit of files per selection cannot exceed 10.",
            });

            return true;
        }

        return false;
    }

    function filterSizeLimitFiles(files: File[] | null) {
        if (!files) return null;

        const sizeLimitFiles = files.filter((file) => {
            const fileSizeInMb = file.size / (1024 * 1024);
            const maxSizeInMb = 500;

            if (fileSizeInMb > maxSizeInMb) {
                toast({
                    title: "Size Limit Exceeded",
                    description:
                        "One or more files exceeded the 500 Mb limit. It will be removed from the file selection.",
                });

                return false;
            }

            return true;
        });

        return sizeLimitFiles;
    }

    function returnNullIfArrayIsEmpty(array: any[] | null) {
        return !array || array.length === 0 ? null : array;
    }

    function filesIsNotSelected(files: File[] | null) {
        return !files || files.length === 0;
    }

    function createActiveFileFormData(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        return formData;
    }

    function removeActiveFileFrom(filesArray: any[] | null) {
        const filesArrayClone = filesArray ? [...filesArray] : [];

        const currentFileIndex = 0;
        filesArrayClone.splice(currentFileIndex, 1);

        return returnNullIfArrayIsEmpty(filesArrayClone);
    }

    function calcIntervalProgress(setProgress: (progress: number) => void) {
        const intervalTime = 100;
        const startTime = Date.now();

        return setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const speedToIncrement = 20;
            const totalProgress = elapsedTime / speedToIncrement;
            setProgress(Math.min(totalProgress, 100));
        }, intervalTime);
    }

    function addNewCompletedFile(
        completedFiles: CompletedFile[] | null,
        newCompletedFile: CompletedFile
    ) {
        const completedFilesClone = completedFiles ? [...completedFiles] : [];

        completedFilesClone.push(newCompletedFile);

        return completedFilesClone;
    }

    function fakeDelay(time: number) {
        return new Promise((res) => {
            setTimeout(() => {
                return res("Ok");
            }, time);
        });
    }

    return {
        selectedFiles,
        onChange,
        filesIsNotSelected,
        removeActiveFileFrom,
        calcIntervalProgress,
        fakeDelay,
        createActiveFileFormData,
        addNewCompletedFile,
    };
}
