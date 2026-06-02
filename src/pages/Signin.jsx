import { Link } from 'react-router-dom';

function Signin() {
        return (
                <div id="sign_in">
                        <h3>JoPay</h3>
                        <form>
                                <h4>Sign into your Jopay account</h4>
                                <p>Or</p>
                                <label>Email</label>
                                <input type="email"></input><br /><br />
                                <label>Password</label>
                                <input type="password"></input><br /><br />
                                <input type="button" value="Sign in"></input><br />
                        </form><br />
                        <p><div class="or_div"><div class="or_float or_hr"><hr /></div><div class="or_float or_text">OR</div><div class="or_float or_hr2"><hr /></div></div></p>
                        <input type="button" value="Sign in with Google"></input><br /><br /><br />
                        <h4 class="form_question">New to JoPay? <Link to="/signup">Create Account</Link></h4><br />
                </div>
        )
}

export default Signin;
