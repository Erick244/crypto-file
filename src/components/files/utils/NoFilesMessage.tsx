export function NoFilesMessage({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-muted-foreground border-border border-2 px-2 py-5 rounded text-center text-sm">
            {children}
        </p>
    );
}
