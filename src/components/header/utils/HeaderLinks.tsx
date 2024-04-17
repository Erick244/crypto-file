"use client";

import { usePathname } from "next/navigation";
import { Header } from "..";

export function HeaderLinks() {
    const pathname = usePathname();

    return (
        <>
            <Header.Link isActive={pathname === "/"} href={"/"}>
                Encrypt
            </Header.Link>
            <Header.Link isActive={pathname === "/decrypt"} href={"/decrypt"}>
                Decrypt
            </Header.Link>
        </>
    );
}
