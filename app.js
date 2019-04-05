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
		<div className="cash-calc__block cash-calc__form">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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