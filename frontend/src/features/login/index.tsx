import { FormProvider, useForm } from "react-hook-form"
import "../style/form/style.css"
import { FormTextInput } from "../../components/FormTextInput"
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../../utils/Toast";
import useFetch from "../../hooks/useFetch";
import { loginRequest } from "../../services/auth";
import { RegisterFormFields } from "../register/types";
import { useAuthentication } from "../../hooks/useAuthentication";
export function Login() {

    const form = useForm<Omit<RegisterFormFields, "firstName" | "lastName">>();

    const navigate = useNavigate();

    const {
        saveToken,
    } = useAuthentication();

    const [, login] = useFetch(
        loginRequest, 
        null,
         false, 
         null, 
        () => Toast.showErrorMessage("Invalid credentials"), 
        response => {
            if (!response?.data?.token) {
                Toast.showErrorMessage("Invalid credentials");
                return;
            }
            saveToken(response.data.token);
            navigate('/chat');
            Toast.showSuccessMessage('Logged in successfully');
        }
    );

    return <section className="container forms">
                <div className="form login">
                    <div className="form-content">
                        <header>Login</header>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(login)}>
                                <FormTextInput type="email" placeholder="Email" name="email" />
                                <FormTextInput type="password" placeholder="Password" name="password">
                                    <i className='bx bx-hide eye-icon'></i>
                                </FormTextInput>
                                <div className="field button-field">
                                    <button>Login</button>
                                </div>
                            </form>
                        </FormProvider>
                        <div className="form-link">
                            <span>Don't have an account? <Link to="/signup" className="link signup-link">Signup</Link></span>
                        </div>
                    </div>
                </div>
            </section>
}