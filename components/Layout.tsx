import React from "react";
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <header>
                <Link href="/">
                    <h1>
                        <span>Indian Food</span>
                        <span>Tadka</span>
                    </h1>
                    <h2>Spread The Joy</h2>
                </Link>
            </header>

            <div className="page-content">
                { children }

            </div>

            <footer>
                <p>Copyright 2021 Indian Foods :)</p>
            </footer>
        </div>
    )
}