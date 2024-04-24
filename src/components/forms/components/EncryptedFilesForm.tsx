"use client";

import {
    activeEncryptedFileAtom,
    activeEncryptedFileProgressAtom,
    completedEncryptedFilesAtom,
    pendingEncryptedFilesAtom,
} from "@/atoms/encrypt-files.atom";
import { useFilesForm } from "@/hooks/useFilesForm";
import { useAtom, useSetAtom } from "jotai";
import { FormEvent } from "react";
import { toast } from "../../ui/use-toast";
import { FilesForm } from "../files-form";

export function EncryptedFilesForm() {
    const {
        filesIsNotSelected,
        onChange,
        selectedFiles,
        addNewCompletedFile,
        calcIntervalProgress,
        createActiveFileFormData,
        fakeDelay,
        removeActiveFileFrom,
    } = useFilesForm();

    const [activeEncryptedFile, setActiveEncryptedFile] = useAtom(
        activeEncryptedFileAtom
    );

    const setPendingEncryptedFiles = useSetAtom(pendingEncryptedFilesAtom);
    const setCompletedEncryptedFiles = useSetAtom(completedEncryptedFilesAtom);
    const setActiveEncryptedFileProgress = useSetAtom(
        activeEncryptedFileProgressAtom
    );

    async function onSubmit(e: FormEvent) {
        e.preventDefault();

        if (!selectedFiles || filesIsNotSelected(selectedFiles)) {
            toast({
                title: "Error",
                description: "Please select any file.",
            });
            return;
        }

        setPendingEncryptedFiles(selectedFiles);

        for (const file of selectedFiles) {
            setPendingEncryptedFiles(removeActiveFileFrom);

            setActiveEncryptedFileProgress(0);
            setActiveEncryptedFile(file);

            const calcInterval = calcIntervalProgress(
                setActiveEncryptedFileProgress
            );

            await fakeDelay(1500);
            const resp = await fetch(`http://localhost:3000/api/encrypt`, {
                method: "POST",
                body: createActiveFileFormData(file),
            });

            const data = await resp.json();
            const downloadLink = data.downloadLink;

            setCompletedEncryptedFiles((completedFiles) =>
                addNewCompletedFile(completedFiles, { file, downloadLink })
            );

            clearInterval(calcInterval);
            setActiveEncryptedFileProgress(100);

            setActiveEncryptedFile(null);

            const fiveMinutesInMs = 60000 * 5;
            setTimeout(() => {
                setCompletedEncryptedFiles(removeActiveFileFrom);
                toast({
                    title: file.name,
                    description: "Deleted after 5 minutes.",
                });
            }, fiveMinutesInMs);
        }
    }

    return (
        <FilesForm.Root onSubmit={onSubmit}>
            <FilesForm.DropFiles
                onChange={onChange}
                label="Select or drop the files for encrypt."
                selectedFilesCount={selectedFiles ? selectedFiles.length : 0}
            />
            <FilesForm.SubmitButton
                disabled={!!activeEncryptedFile || !selectedFiles}
            >
                Start
            </FilesForm.SubmitButton>
        </FilesForm.Root>
    );
}
