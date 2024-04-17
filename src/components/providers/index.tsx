import { JotaiProvider } from "./JotaiProvider";
import { ThemeProvider } from "./ThemeProvider";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <JotaiProvider>{children}</JotaiProvider>
        </ThemeProvider>
    );
}
