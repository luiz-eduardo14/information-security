import { FormProvider, useForm } from "react-hook-form";
import "../style/form/style.css";
import { FormTextInput } from "../../components/FormTextInput";
import { Link, useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { RegisterFormFields } from "./types";
import useFetch from "../../hooks/useFetch";
import { registerRequest } from "../../services/auth";
import { Toast } from "../../utils/Toast";

export function Register() {

    const form = useForm<RegisterFormFields>();

    const navigate = useNavigate();

    const [{
        isLoading,
    } ,register] = useFetch(registerRequest, null, false, null,
        () => {            
            Toast.showErrorMessage('Email already exists');
        }, 
        () => {
            Toast.showSuccessMessage('Account created successfully');
            navigate('/signin');
        }
    );

    return (
            <section className="container forms">
                    <div className="form login">
                        <div className="form-content">
                                <header>Register</header>
                                <FormProvider {...form}>
                                    <form onSubmit={form.handleSubmit(register)}>
                                        <FormTextInput type="email" placeholder="Email" name="email" required />
                                        <FormTextInput type="password" placeholder="Password" name="password" required >
                                            <i className='bx bx-hide eye-icon'></i>
                                        </FormTextInput>
                                        <FormTextInput type="text" placeholder="First Name" name="firstName" required />
                                        <FormTextInput type="text" placeholder="Last Name" name="lastName" required />
                                        <div className="field button-field">
                                            <button disabled={isLoading}>
                                                {isLoading && <span><CircleLoader loading={!isLoading} size={15} /></span>}
                                                {!isLoading && <span>Signup</span>}
                                            </button>
                                        </div>
                                    </form>
                                </FormProvider>
                                <div className="form-link">
                                    {!isLoading && 
                                        <span>Have an account?
                                            <Link to="/signin" className="link signup-link"> Signin</Link>
                                        </span>
                                    }
                                </div>
                        </div>
                    </div>
                </section>
    )
}