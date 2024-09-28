import "./globals.css";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="customForest">
            <body className="bg-neutral overflow-x-hidden flex flex-row">
                {children}
            </body>
        </html>
    );
}
