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
                <Logo href={"#"} />
                <div className="flex items-center gap-10">
                    <Header.Link href={"#"}>Encrypt</Header.Link>
                    <Header.Link href={"#"}>Decrypt</Header.Link>
                    <ModeToggle />
                </div>
            </Header.Root>
            <main>{children}</main>
            <Link
                href="https://github.com/Erick244/crypto-file"
                target="_blank"
            >
                <Github />
            </Link>
        </div>
    );
}
