import {supabase} from './lib/supabase.js';
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { useNavigate } from "react-router-dom";

export function Test() {
	const navigate = useNavigate();
	const sdk = new W3SSdk({                                                              appSettings: {                                 appId: import.meta.env.VITE_CIRCLE_APP_ID,                            },
	 });

	async function createCircleUser() {
		const { data: dataUser, error: errorUser } = await supabase.functions.invoke("create-circle-user");
		if (errorUser) {
			console.error(errorUser);
			return;
		}
		await initializeUser();
	}
                    



	async function initializeUser()  {
		console.log("user initialization started");
		const {data, error} = await supabase.functions.invoke(
			"initialize-circle-user"
		);
		if(error || !data) {
			return;
		}

		console.log(data);
		if(data.initialized === true) {
			console.log("user already initialized");
			await syncWallet();
			return;
		}

	
		/*const sdk = new W3SSdk({
			appSettings: {
				appId: import.meta.env.VITE_CIRCLE_APP_ID,
			},
		});*/

		console.log("SDK:", sdk);
		console.log("Initialize response:", data);
		sdk.setAuthentication({
			userToken: data.userToken,
			encryptionKey: data.encryptionKey,
		});

		console.log("SDK authenticated");
		console.log("Challenge ID:", data.challengeId);
		sdk.execute(data.challengeId, async (error, result) => {
			if(error){
				console.log("initialization challenge failed:", error);
				return;
			}
	
			console.error("Challenge completed:", result);
		
		

			console.log("my data:", data);
			console.log("any error:", error);
			await syncWallet();
		});
	}

	async function createWallet() {
		console.log("create wallet started");
		const {data, error} = await supabase.functions.invoke(                                "create-circle-wallet"
		);
		if(error || !data) {
			console.log("mrssage: there is error or no data");
			return;
		}
		
		/*if (data.walletCreated === true) {
			navigate("/dashboard");
			return;
		}*/

		sdk.setAuthentication({
                        userToken: data.userToken,
                        encryptionKey:
data.encryptionKey,
                });

		sdk.execute(data.challengeId, async (error, result) => {
			if (error) {
				console.error("Wallet challenge failed:", error);
				return;
			}

			console.log("Wallet created:", result);

			//wallet created
			//synchronize with database
			const { data: syncData, error: syncError } = await supabase.functions.invoke("sync-circle-wallet");
			if (syncError) {
				console.error(syncError);
				return;
			}
			console.log(syncData);
    
			// Navigate to dashboard
			navigate("/dashboard");


		});
	}
	
	async function syncWallet() {
		console.log("sync wallet started");
		const {data: syncData, error: syncError} = await supabase.functions.invoke("sync-circle-wallet");
		console.log("syncWallet response:", syncData);
		console.log("syncWallet error:", syncError);


		if(syncError || !syncData) {
			console.log("mrssage: there is error or no data");
			return;
		}

		console.log("syncWallet completed");
		navigate("/dashboard");
	}

	async function getUser()  {
		console.log("user initialization started");
		const {data: getUserData, error: getUserError} = await supabase.functions.invoke("get-circle-user");
		if(getUserError){
			console.error(getUserError);
			return;
		}
		console.log("User info:", getUserData);
	}


	return (
		<>
			<button onClick={createCircleUser}>test it</button>
		</>
	);
}
export default Test;
