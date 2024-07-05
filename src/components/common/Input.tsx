import React from "react";
interface InputProps {
    label: string;
    name?: string;
    error?: string;
    register?: any;
    type: string;
    disabled?: boolean;
}
export const Input = ({
    label,
    type,
    name,
    error,
    register,
    disabled,
}: InputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold">{label}</label>
            <div className="border-2 rounded p-2">
                <input
                    name={label}
                    placeholder={label}
                    aria-invalid={error ? "true" : "false"}
                    {...register(name, {
                        valueAsNumber: type === "number" ? true : false,
                    })}
                    type={type}
                    className="outline-none w-full bg-transparent placeholder:text-secondary"
                    disabled={disabled}
                />
            </div>
            <p className="p-1 text-red-500 font-semibold">{error && error}</p>
        </div>
    );
};
