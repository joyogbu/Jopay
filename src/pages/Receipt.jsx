import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

function Receipt() {
	const [searchParams] = useSearchParams();
	const invoiceId = searchParams.get("invoiceId");
	const txHash = searchParams.get("txHash");

	const [receipt, setReceipt] = useState(null);
	console.log(invoiceId);
	console.log(txHash);

	useEffect(() => {
	    const loadReceipt = async () => {
		const { data, error } = await supabase
		    .from("invoices")
		    .select("*")
		    .eq("invoice_id", invoiceId)
		    .single();

		    if(error) {
			    return (
				    <>
				    <p>Unable to generate receipt</p>
				    </>
			    );
		    }
		    setReceipt(data);
	    }
	    loadReceipt();
	}, [invoiceId]);

	/*if(error) {
		return (
			<>
				<p>Unable to generate receipt</p>
			</>
		);
	}*/

	return (
		<div className="receipt_body">
			<div className="receipt_div">
				<h2>Transaction Receipt</h2>
				<span>🎉</span>	
				<p>Payment sent! We will let the recipient know you have sent money</p>
				<div className="receipt_details">
					<p><span>Transaction Date:  </span><span className="data_details">{receipt?.tx_hash ? new Date(receipt?.paid_at).toLocaleString() : ""}</span></p>
					<p><span>Recipient Wallet:  </span><span className="data_details">{receipt?.merchant_wallet}</span></p>
					<p><span>Recipient:  </span><span className="data_details">{receipt?.merchant_name}</span></p>
					<p><span>Amount:  </span><span className="data_details">{receipt?.amount}  USDC</span></p>
					<p><span>Description:  </span><span className="data_details">{receipt?.description}</span></p>
					<p><span>Status:  </span><span className="data_details">{receipt?.status}</span></p>
					<p><span>Reference:  </span><span className="data_details">   <a target="_blank" href={`https://testnet.arcscan.app/tx/${receipt?.tx_hash}`}> {receipt?.tx_hash ? `${ receipt?.tx_hash.slice(0, 6)}...${receipt?.tx_hash.slice(-4)}` : ""}</a></span></p>
					<hr /><br />
				</div>
				<br /><br />
				<button id="share_btn">Share Receipt</button>

				<br />
				<br />
			</div>
		</div>
	);
}

export default Receipt;
