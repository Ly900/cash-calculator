const CashCalcHeading = function() {
	return(
		<div className="cash-calc__heading">
			<h1>How Much Cash Can You Get Back?</h1>
			<p>Plug in your info to calculate your earnings.</p>
		</div>
	);
}

const CashCalcBody = function() {
	return(
		<div className="cash-calc__body">
			<CashCalcForm/>
			<CashCalcResults/>
		</div>
	);
}

const CashCalcForm = function() {
	return(
		<div className="cash-calc__block cash-calc__form-container">
			<form className="cash-calc__form">

				<label className="cash-calc__form-item">Buying or Selling</label>
				<select className="cash-calc__form-item">
					<option>Buying</option>
					<option>Selling</option>
					<option>Both</option>
				</select>

				<label className="cash-calc__form-item">Purchase Price</label>
				<select className="cash-calc__form-item">
					<option>$10,000</option>
					<option>$20,000</option>
				</select>

				<label className="cash-calc__form-item">Selling Price</label>
				<select className="cash-calc__form-item">
					<option>$10,000</option>
					<option>$20,000</option>
				</select>

			</form>
		</div>
	);
}

const CashCalcResults = function() {
	return(
		<div className="cash-calc__block cash-calc__results">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
		</div>
	);
}

ReactDOM.render(
	<div className="cash-calc">
		<CashCalcHeading/>
		<CashCalcBody/>
	</div>,
	document.getElementById("app")
);

{/* <h1>How Much Cash Can You Get Back?</h1> */}
{/* <p>Plug in your info to calculate your earnings.</p> */}