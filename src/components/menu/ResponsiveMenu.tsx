import { HeaderLinks } from "../header/utils/HeaderLinks";
import { GithubLink } from "../utils/GithubLink";

export function ResponsiveMenu() {
    return (
        <div className="md:hidden border-t-2 border-border sticky bottom-0 w-full flex items-center justify-between right-0 bg-background/80 backdrop-blur-sm z-10 p-5">
            <div className="flex gap-10">
                <HeaderLinks />
            </div>
            <GithubLink />
        </div>
    );
}
