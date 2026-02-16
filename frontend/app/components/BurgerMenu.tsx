"use client";

import { JSX } from "react";
import { useState } from "react";
import Link from "next/link";

export const BurgerMenu = (): JSX.Element => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full z-50 burger-menu">
            <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
            >
                <span
                    className={`h-[2px] w-8 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                        }`}
                ></span>
                <span
                    className={`h-[2px] w-8 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                        }`}
                ></span>
                <span
                    className={`h-[2px] w-8 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                        }`}
                ></span>
            </button>

            {isMenuOpen && <div className="fixed flex w-full mt-21 h-screen inset-0 bg-black/50 shadow-lg items-center text-white p-4 flex flex-col gap-3 font-heading text-3xl gap-4">
                <Link href="#" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                    Про нас
                </Link>
                <Link href="#" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                    Ціни
                </Link>
                <Link href="#" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                    Зв&#39;язатись
                </Link>
            </div>
            }

        </div>)
}