function Receipt() {
	const { invoiceId } = useSearchParams();
	useEffect(() => {
	    const loadReceipt = async () => {
		const { data, error } = await supabase
		    .from("invoices")
		    .select("*")
		    .eq("invoice_id", invoiceId)
		    .single();
	    }
	    loadReceipt();
	}, [invoiveId]);

	if(error) {
		return (
			<>
				<p>Unable to generate receipt</p>
			</>
		);
	}

	return (
		<div className="receipt_body">
			<div className="receipt_div">
				<h2>Transaction Receipt</h2>
				<span>🎉</span>	
				<p>Payment sent! We will let the recipient know you have sent money</p>
				<div className="receipt_details">
					<p><span>Transaction Date:  </span><span className="data_details">{data.paid_at}</span></p>
					<p><span>Recipient Wallet:  </span><span className="data_details">{data.merchant_wallet}</span></p>
					<p><span>Recipient:  </span><span className="data_details">{data.merchant_name}</span></p>
					<p><span>Amount:  </span><span className="data_details">{data.amount}  USDC</span></p>
					<p><span>Description:  </span><span className="data_details">{data.description}</span></p>
					<p><span>Status:  </span><span className="data_details">{data.status}</span></p>
					<p><span>Reference:  </span><span className="data_details">{data.tx_hash}</span></p>
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
