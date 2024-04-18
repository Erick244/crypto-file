import FilesContextProvider from "@/contexts/FilesContext";
import { Header } from "../header";
import { HeaderLinks } from "../header/utils/HeaderLinks";
import { ResponsiveMenu } from "../menu/ResponsiveMenu";
import { ModeToggle } from "../ui/mode-toogle";
import { GithubLink } from "../utils/GithubLink";
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
                    <div className="md:flex items-center gap-10 hidden">
                        <HeaderLinks />
                    </div>
                    <ModeToggle />
                </div>
            </Header.Root>
            <main className="py-10 w-full">
                <FilesContextProvider>{children}</FilesContextProvider>
            </main>
            <ResponsiveMenu />
            <GithubLink className="hidden md:block" />
        </div>
    );
}
