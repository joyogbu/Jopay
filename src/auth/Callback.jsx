import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
	const navigate = useNavigate();
	const [status, setStatus] = useState("signing yoi in");
	useEffect(() => {
		const handleAuth = async () => {
			try {
				//get session from magic link
				const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
				if(sessionError) {
					console.error(sessionError);
					setStatus("Authentication failed")
					return
				}
				const session = sessionData.session;

				if(!session) {
					setStatus("No account found");
					console.log("no session");
					setTimeout(() => {
						navigate("/signup");
					}, 4000);
					return;
				}

				//if(data.session) {
				const user = session.user;
				console.log("user logged in:", user);
	
				//check if merchant already exists
				const { data: merchant } = await supabase
					.from("merchants")
					.select("*")
					.eq("merchant_id", user.id)
					.single();
				if (!merchant) {
					navigate("/complete_signup");
					return;
				}

				//console.log("Merchant created");
				
				setStatus("Success!, redirecting");

			//	redirect user to the dashboard
				setTimeout(() => {
					navigate( "/dashboard");
				}, 9000 );

			} catch (err) {
				console.log(err);
				setStatus("Something went wrong");
			}
		};
		handleAuth();
	}, []);

	return (
		<>
			<p>{status}</p>
		</>
	)
}
