import { useForm } from "react-hook-form"
import "../style/form/style.css"
import { useNavigate } from "react-router"
import { FormTextInput } from "../components/FormTextInput";
export function Register() {

    const { handleSubmit } = useForm();
    const navigate = useNavigate();

    return <section className="container forms">
                <div className="form login">
                    <div className="form-content">
                        <header>Register</header>
                        <form onSubmit={handleSubmit((data) => console.log(data))}>
                            <FormTextInput type="email" placeholder="Email" name="email" />
                            <FormTextInput type="password" placeholder="Password" name="password">
                                <i className='bx bx-hide eye-icon'></i>
                            </FormTextInput>
                            <FormTextInput type="text" placeholder="First Name" name="firstName" />
                            <FormTextInput type="text" placeholder="Last Name" name="lastName" />
                            <div className="field button-field">
                                <button>Signup</button>
                            </div>
                        </form>
                        <div className="form-link">
                            <span>Don't have an account? <a href="#" className="link signup-link" onClick={() => navigate('/signup')}>Signup</a></span>
                        </div>
                    </div>
                </div>
            </section>
}