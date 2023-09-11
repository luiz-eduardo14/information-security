import { PropsWithChildren, ReactNode } from "react";
import { useForm } from "react-hook-form";

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

    const { register } = useForm();
    
    return <div className="field input-field">
                <input type={type} placeholder={placeholder} className="input" {...register(name)} required={required}/>
                {children}
            </div>
} 