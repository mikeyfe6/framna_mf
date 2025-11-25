"use client";

import { GlobalStyles } from "@/styles/GlobalStyles";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GlobalStyles />
            {children}
        </>
    );
}
