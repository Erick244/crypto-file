"use client";

import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface FilesContextProps {
    pendingFiles: File[] | null;
    setPendingFiles: Dispatch<SetStateAction<File[] | null>>;
    completedFiles: CompletedFile[] | null;
    setCompletedFiles: Dispatch<SetStateAction<CompletedFile[] | null>>;
    activeFile: File | null;
    setActiveFile: Dispatch<SetStateAction<File | null>>;
    activeFileProgress: number;
    setActiveFileProgress: Dispatch<SetStateAction<number>>;
}

const FilesContext = createContext({} as FilesContextProps);

type CompletedFile = {
    file: File | null;
    downloadLink: string | null;
};

export default function FilesContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Se não criar nenhum método substituir pelo Jotai

    const [completedFiles, setCompletedFiles] = useState<
        CompletedFile[] | null
    >(null);
    const [pendingFiles, setPendingFiles] = useState<File[] | null>(null);
    const [activeFile, setActiveFile] = useState<File | null>(null);
    const [activeFileProgress, setActiveFileProgress] = useState<number>(0);

    return (
        <FilesContext.Provider
            value={{
                activeFile,
                completedFiles,
                pendingFiles,
                setActiveFile,
                setCompletedFiles,
                setPendingFiles,
                activeFileProgress,
                setActiveFileProgress,
            }}
        >
            {children}
        </FilesContext.Provider>
    );
}

export const useFilesContext = () => useContext(FilesContext);
