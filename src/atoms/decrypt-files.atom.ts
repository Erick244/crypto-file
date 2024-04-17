import { atom } from "jotai";
import { CompletedFile } from "./encrypt-files.atom";

const completedDecryptedFilesAtom = atom<CompletedFile[] | null>(null);
const pendingDecryptedFilesAtom = atom<File[] | null>(null);
const activeDecryptedFileAtom = atom<File | null>(null);
const activeDecryptedFileProgressAtom = atom<number>(0);

export {
    activeDecryptedFileAtom,
    activeDecryptedFileProgressAtom,
    completedDecryptedFilesAtom,
    pendingDecryptedFilesAtom,
};
