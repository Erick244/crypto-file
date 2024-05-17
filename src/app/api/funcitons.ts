type DeleteLogData = {
    title: string;
    fileName: string;
    fileId: number;
};

export function showDeleteLogMessage({
    fileId,
    fileName,
    title,
}: DeleteLogData) {
    console.log(
        `\n${title}:\nFILE NAME: ${fileName}\nFILE ID: ${fileId}\nDATE: ${new Date().toISOString()}`
    );
}
