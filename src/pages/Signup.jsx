import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import Footer from '../components/Footer.jsx';

function Signup() {

	//check if user is already signed in and if session exists
	const navigate = useNavigate();
	useEffect(() => {
		async function checkUser() {
			const {data: {user}} = await supabase.auth.getUser();
			if(user) {
				navigate("/dashboard");
				return;
			}
		}
		checkUser();
	}, []);

	//proceed to sign up if no user

	const [formData, setFormData] = useState({
		merchant_email: "",
		merchant_name: "",
	});

	const [inputError, setInputError] = useState("");

	function handleForm(e){
		const name = e.target.name;
		const value = e.target.value;

		setFormData(prevData => ({...prevData, [name]: value}));
	}

	function isValid() {
		return  /\S+@\S+\.\S+/.test(formData.merchant_email); 
	}
	
	async function submitForm(e){
		e.preventDefault();
		
		//check if email exists
		if(!formData.merchant_email.trim() || formData.merchant_email === "") {
			setInputError("Email is required");
			return;
		}

		if(!isValid(formData.merchant_email)) {
			setInputError("Enter a valid email");
			return;
		}
		const {data, error} = await supabase.auth.signInWithOtp({
			email: formData.merchant_email,
			options: {
				emailRedirectTo: "http://localhost:5173/auth/callback"
			}
		})
		

		if(error) {
			console.log("My error:", error);
			setInputError(error);
			return;
		}
		console.log("data:", data);
		console.log("error:", error);
		navigate("/signup/confirmation");
	}
			


        return (
		<>
		<div id="sign_up">
			<h1>JoPay</h1>
			<h2>Create an account and receive USDC payments in seconds</h2>
			<form onSubmit={submitForm}>
				<h3>Step 1: Create Account</h3>
				
				<label>Email:</label><br /><br />
				<input type="email" placeholder="Enter your email" name="merchant_email" value={formData.merchant_email} onChange={handleForm}></input><br /><br />
				{inputError && <p style={{ color:"red" }}>{inputError}</p>}
				<br />
				<button className="sign_up_btn" type="submit" value="Create Account">Create Account</button><br /><br />
			</form><br />
			<div className="form_question">
				Already have an account? 
				<Link to="/login">Sign In</Link>
			</div><br />
			<div className ="email_overlay">
				<div className="email_message_box">
		
				</div>
			</div>
			
		</div>
		<br />
		<Footer />
		</>
	);
}

export default Signup;
