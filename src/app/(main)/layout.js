import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "/lib/auth";
import Nav from "@/app/Nav";

export default async function MainNav({ children }) {
    const cookieStore = cookies();
    const headerList = headers();
    const pathname = headerList.get("x-current-path");

    if (!await verifySession(cookieStore.get("username")?.value, cookieStore.get("session_id")?.value) && pathname !== "/signin" && pathname !== "/signup") {
        redirect("/signin");
    }

    return (
        <html lang="en" data-theme="customForest">
            <body className="bg-neutral overflow-x-hidden flex flex-row">
                <Nav user={cookieStore.get("username")?.value}/>
                {children}
            </body>
        </html>
    );
}
