import FilesContextProvider from "@/contexts/FilesContext";
import { Github } from "lucide-react";
import { Header } from "../header";
import { HeaderLinks } from "../header/utils/HeaderLinks";
import { CryptoLink } from "../ui/link";
import { ModeToggle } from "../ui/mode-toogle";
import { Logo } from "../utils/Logo";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className="h-screen w-full max-w-5xl m-auto p-5">
            <Header.Root>
                <Logo href="/" />
                <div className="flex items-center gap-10">
                    <HeaderLinks />
                    <ModeToggle />
                </div>
            </Header.Root>
            <main className="py-10 w-full">
                <FilesContextProvider>{children}</FilesContextProvider>
            </main>
            <GithubLink />
        </div>
    );
}

function GithubLink() {
    return (
        <CryptoLink
            className="p-2 xl:fixed bottom-10 left-5"
            href="https://github.com/Erick244/crypto-file"
            target="_blank"
        >
            <Github />
        </CryptoLink>
    );
}
