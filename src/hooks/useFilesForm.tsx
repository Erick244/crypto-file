"use client";

import { CompletedFile } from "@/atoms/encrypt-files.atom";
import { ChangeEvent, useState } from "react";

export function useFilesForm() {
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const filesData = e.target.files;
        const filesArray = filesData
            ? (Array.prototype.slice.call(filesData) as File[])
            : null;

        if (filesIsNotSelected(filesArray)) {
            setSelectedFiles(null);
            return;
        }

        setSelectedFiles(filesArray);
    }

    function filesIsNotSelected(files: File[] | null) {
        return !files || files.length < 1;
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

        return filesArrayClone.length === 0 ? null : filesArrayClone;
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
