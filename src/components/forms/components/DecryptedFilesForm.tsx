"use client";

import {
    activeDecryptedFileAtom,
    activeDecryptedFileProgressAtom,
    completedDecryptedFilesAtom,
    pendingDecryptedFilesAtom,
} from "@/atoms/decrypt-files.atom";
import { useFilesForm } from "@/hooks/useFilesForm";
import { useAtom, useSetAtom } from "jotai";
import { FormEvent } from "react";
import { toast } from "../../ui/use-toast";
import { FilesForm } from "../files-form";

export function DecryptedFilesForm() {
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

    const [activeDecryptedFile, setActiveDecryptedFile] = useAtom(
        activeDecryptedFileAtom
    );
    const setPendingDecryptedFiles = useSetAtom(pendingDecryptedFilesAtom);
    const setCompletedDecryptedFiles = useSetAtom(completedDecryptedFilesAtom);
    const setActiveDecryptedFileProgress = useSetAtom(
        activeDecryptedFileProgressAtom
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

        setPendingDecryptedFiles(selectedFiles);

        for (const file of selectedFiles) {
            setPendingDecryptedFiles(removeActiveFileFrom);

            setActiveDecryptedFileProgress(0);
            setActiveDecryptedFile(file);

            const calcInterval = calcIntervalProgress(
                setActiveDecryptedFileProgress
            );

            await fakeDelay(1000);
            const resp = await fetch(`http://localhost:3000/api/decrypt`, {
                method: "POST",
                body: createActiveFileFormData(file),
            });

            const data = await resp.json();
            const downloadLink = data.downloadLink;

            setCompletedDecryptedFiles((completedFiles) =>
                addNewCompletedFile(completedFiles, { file, downloadLink })
            );

            clearInterval(calcInterval);
            setActiveDecryptedFileProgress(100);

            setActiveDecryptedFile(null);

            const fiveMinutesInMs = 60 * 60 * 5 * 1000;
            setTimeout(() => {
                setCompletedDecryptedFiles(removeActiveFileFrom);
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
                label="Select or drop the file for decrypt."
                selectedFilesCount={selectedFiles ? selectedFiles.length : 0}
            />
            <FilesForm.SubmitButton
                disabled={!!activeDecryptedFile || !selectedFiles}
            >
                Start
            </FilesForm.SubmitButton>
        </FilesForm.Root>
    );
}
