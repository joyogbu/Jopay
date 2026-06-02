import { Link } from 'react-router-dom';

function Signup() {
        return (
		<div id="sign_up">
			<h3>JoPay</h3>
			<form>
				<h4>Create your Jopay account</h4>
				<input type="button" value="Sign up with Google"></input><br />
				<p><div class="or_div"><div class="or_float or_hr"><hr /></div><div class="or_float or_text">OR</div><div class="or_float or_hr2"><hr /></div></div></p>
				<label>Email</label>
				<input type="email"></input><br /><br />
				<label>Business Name</label>
				<input type="text"></input><br /><br />
				<label>Password</label>
				<input type="password"></input><br /><br />
				<label>Country</label>
				<select name="contries"><option value="Nigeria">Nigeria</option></select><br /><br />
				<input type="button" value="Create Account"></input><br /><br />
			</form><br />
			<div class="form_question">
				Already have an account? 
				<Link to="/login">Sign In</Link>
			</div><br />
			<div className ="email_overlay">
				<div className="email_message_box">
					<p>We sent a magic link to your registered email. Please verify your email to continue</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
