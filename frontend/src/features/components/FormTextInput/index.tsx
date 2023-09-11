import { PropsWithChildren, ReactNode } from "react";
import { useForm } from "react-hook-form";

type FormTextInputProps = {
    type: string;
    placeholder: string;
    name: string;
}

export function FormTextInput({
    type,
    placeholder,
    name,
    children,
}: PropsWithChildren<FormTextInputProps>): ReactNode {

    const { register } = useForm();
    
    return <div className="field input-field">
                <input type={type} placeholder={placeholder} className="input" {...register(name)}/>
                {children}
            </div>
} 