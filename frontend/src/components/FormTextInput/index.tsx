import { PropsWithChildren, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type FormTextInputProps = {
    type: string;
    placeholder: string;
    name: string;
    required?: boolean;
}

export function FormTextInput({
    type,
    placeholder,
    name,
    children,
    required = false
}: PropsWithChildren<FormTextInputProps>): ReactNode {

    const { register } = useFormContext();
    
    return <div className="field input-field">
                <input type={type} placeholder={placeholder} className="input" required={required} {...register(name)} />
                {children}
            </div>
} 