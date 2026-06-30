function Receipt() {
	return (
		<div className="receipt_body">
			<div className="receipt_div">
				<h2>Transaction Receipt</h2>
				<span>🎉</span>	
				<p>Payment sent! We will let the recipient know you have sent money</p>
				<div className="receipt_details">
					<p><span>Transaction Date:  </span><span className="data_details">10-06-2026</span></p>
					<p><span>Recipient Wallet:  </span><span className="data_details">0x099888</span></p>
					<p><span>Recipient:  </span><span className="data_details">Jotech Business Solutions</span></p>
					<p><span>Amount:  </span><span className="data_details">250 USDC</span></p>
					<p><span>Description:  </span><span className="data_details">For website</span></p>
					<p><span>Status:  </span><span className="data_details">Pending</span></p>
					<p><span>Reference:  </span><span className="data_details">96hbd5vb-hjif78-ju65hhd</span></p>
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
