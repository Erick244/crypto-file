"use client";

import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface FilesContextProps {
    pendingFiles: FileList | null;
    setPendingFiles: Dispatch<SetStateAction<FileList | null>>;
    completedFiles: FileList | null;
    setCompletedFiles: Dispatch<SetStateAction<FileList | null>>;
    activeFile: File | null;
    setActiveFile: Dispatch<SetStateAction<File | null>>;
}

const FilesContext = createContext({} as FilesContextProps);

export default function FilesContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [pendingFiles, setPendingFiles] = useState<FileList | null>(null);
    const [completedFiles, setCompletedFiles] = useState<FileList | null>(null);
    const [activeFile, setActiveFile] = useState<File | null>(null);

    return (
        <FilesContext.Provider
            value={{
                activeFile,
                completedFiles,
                pendingFiles,
                setActiveFile,
                setCompletedFiles,
                setPendingFiles,
            }}
        >
            {children}
        </FilesContext.Provider>
    );
}

export const useFilesContext = () => useContext(FilesContext);
