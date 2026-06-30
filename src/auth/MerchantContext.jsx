import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';

const MerchantContext = createContext();
export function MerchantProvider({ children }) {
	const [merchant, setMerchant] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMerchant() {
			const result = await supabase.auth.getUser();
			const user = result.data.user;
			if(!result) {
				setLoading("false");
				return
			}

			const {data, error} = await supabase
				.from("merchants")
				.select("*")
				.eq("merchant_id", user?.id)
				.single();
			if (!error) {
				setMerchant(data);
			}
			setLoading(false)
		}
		loadMerchant();
	}, []);

	return (
		<MerchantContext.Provider
			value = {{merchant, setMerchant, loading}}>

		{children}
		</MerchantContext.Provider>
	);
}

export function useMerchant() {
	return useContext(MerchantContext);
}
