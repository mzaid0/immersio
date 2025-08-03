"use client"
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarLogo, NavBody, NavItems } from "../ui/resizable-navbar";
import ThemeToggleButton from "../ui/theme-toggle-button";

export default function Header() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Services", link: "/services" },
        { name: "Contact", link: "/contact" },
    ];

    return (
        <Navbar className="top-0">
            <NavBody>
                <NavbarLogo />
                <NavItems
                    items={navItems}
                />
                <div className="flex items-center space-x-2">
                    <Link href="/signup">
                        <Button variant="parrot">
                            Sign Up
                        </Button>
                    </Link>
                    <ThemeToggleButton variant="circle" start="top-right" />
                </div>
            </NavBody>
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>
                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => (
                        <Link
                            key={`mobile-link-${idx}`}
                            href={item.link}
                            className="text-lg text-neutral-600 dark:text-neutral-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}