"use client";

import Link from "next/link";

interface Props {
    href: string;
    label?: string;
}

export default function BackButton({ href, label = "Voltar" }: Props) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
        >
            <span aria-hidden>←</span>
            <span>{label}</span>
        </Link>
    );
}
