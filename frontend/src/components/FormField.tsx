"use client";

import { ReactNode } from "react";

interface Props {
    label: string;
    htmlFor: string;
    hint?: string;
    required?: boolean;
    colSpan?: 1 | 2;
    children: ReactNode;
}

export default function FormField({
    label,
    htmlFor,
    hint,
    required,
    colSpan = 1,
    children,
}: Props) {
    return (
        <div className={`flex flex-col gap-1 ${colSpan === 2 ? "col-span-2" : ""}`}>
            <label htmlFor={htmlFor} className="text-sm font-medium text-zinc-200">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {children}
            {hint && <p className="text-xs text-zinc-500">{hint}</p>}
        </div>
    );
}
