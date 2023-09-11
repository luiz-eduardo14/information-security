import { useForm } from "react-hook-form"
import "../style/form/style.css"
import { FormTextInput } from "../components/FormTextInput"
export function Login() {

    const { handleSubmit } = useForm()

    return <section className="container forms">
                <div className="form login">
                    <div className="form-content">
                        <header>Login</header>
                        <form onSubmit={handleSubmit((data) => console.log(data))}>
                            <FormTextInput type="email" placeholder="Email" name="email" />
                            <FormTextInput type="password" placeholder="Password" name="password">
                                <i className='bx bx-hide eye-icon'></i>
                            </FormTextInput>
                            <div className="field button-field">
                                <button>Login</button>
                            </div>
                        </form>
                        <div className="form-link">
                            <span>Don't have an account? <a href="#" className="link signup-link">Signup</a></span>
                        </div>
                    </div>
                </div>
            </section>
}