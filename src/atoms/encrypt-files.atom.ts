import { atom } from "jotai";

export type CompletedFile = {
    file: File | null;
    downloadLink: string | null;
};

const completedEncryptedFilesAtom = atom<CompletedFile[] | null>(null);
const pendingEncryptedFilesAtom = atom<File[] | null>(null);
const activeEncryptedFileAtom = atom<File | null>(null);
const activeEncryptedFileProgressAtom = atom<number>(0);

export {
    activeEncryptedFileAtom,
    activeEncryptedFileProgressAtom,
    completedEncryptedFilesAtom,
    pendingEncryptedFilesAtom,
};
