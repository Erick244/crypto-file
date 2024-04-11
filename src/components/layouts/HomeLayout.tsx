import { Github } from "lucide-react";
import Link from "next/link";
import { Header } from "../header";
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
                    <Header.Link href={"#"}>Encrypt</Header.Link>
                    <Header.Link href={"#"}>Decrypt</Header.Link>
                    <ModeToggle />
                </div>
            </Header.Root>
            <main className="py-10 w-full">{children}</main>
            <GithubLink />
        </div>
    );
}

function GithubLink() {
    return (
        <Link
            className="fixed bottom-10 p-2 group overflow-hidden border-b-2 border-foreground bg-foreground/10 backdrop-blur-sm"
            href="https://github.com/Erick244/crypto-file"
            target="_blank"
        >
            <Github />
            <div className="transition-all duration-300 w-full absolute top-0 left-0 h-0.5 bg-foreground -translate-x-[101%] group-hover:translate-x-0" />
            <div className="transition-all duration-300 delay-300 h-1/2 absolute top-0 left-0 w-0.5 bg-foreground -translate-y-[101%] group-hover:translate-y-0" />
            <div className="transition-all duration-300 delay-300 h-1/2 absolute bottom-0 right-0 w-0.5 bg-foreground translate-y-[101%] group-hover:translate-y-0" />
        </Link>
    );
}
