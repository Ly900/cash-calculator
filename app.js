const CashCalculator = function() {
	return(
		<div className="cash-calc">
			<CashCalcHeading/>
			<CashCalcBody/>
		</div>
	);
}
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
		<CashCalcForm/>
	);
}

const BuyingInput = function(props) {
	return(
		<div className="cash-calc__input-section cash-calc__input-section_buying">
			<label className="cash-calc__form-item">Purchase Price</label>
			<input className="cash-calc__form-item" type="text" value={parseInt(props.price).toLocaleString("en")} onChange={props.onChange}/>
		</div>
	)
}

const SellingInput = function(props) {
	return(
		<div className="cash-calc__input-section cash-calc__input-section_selling">
			<label className="cash-calc__form-item cash-calc__selling">Selling Price</label>
			<input className="cash-calc__form-item" type="text" value={parseInt(props.price).toLocaleString("en")} onChange={props.onChange}/>
		</div>
	)
}

class CashCalcForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cashBack: 0,
			purchasePrice: 2000,
			sellingPrice: 2000,
			buyingOrSelling: "buying"
		};
	};

	handleSelectChange = (event) => {
		const buyingOptionSelected = event.target.value === "Buying";
		const sellingOptionSelected = event.target.value === "Selling";
		if ( buyingOptionSelected ) {
			this.setState({
				buyingOrSelling: "buying"
			});
		} else if ( sellingOptionSelected ) {
			this.setState({
				buyingOrSelling: "selling"
			});
		}
	}

	handlePurchaseChange = (event) => {
		const re = /^\d+$/;
		// Only update input value if it contains only digits.
		let rawValue = parseInt(event.target.value.replace(/,/g, ""));
		console.log("rawValue: ", rawValue);
		if ( (re.test(rawValue)) || rawValue === "") {
			this.setState({
				purchasePrice: rawValue
			});
		}
		if ( isNaN(rawValue) ) {
			this.setState({
				purchasePrice: 0
			});
			console.log("not a number");
		} 
	}

	handleSellingChange = (event) => {
		const re = /^\d+$/;
		// Only update input value if it contains only digits.
		let rawValue = parseInt(event.target.value.replace(/,/g, ""));
		console.log("rawValue: ", rawValue);
		if ( (re.test(rawValue)) || rawValue === "") {
			this.setState({
				sellingPrice: rawValue
			});
		}
		if ( isNaN(rawValue) ) {
			this.setState({
				sellingPrice: 0
			});
			console.log("not a number");
		} 
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			cashBack: parseInt(this.state.cashBack) + parseInt(this.state.purchasePrice)
		});
	}

	render() {
		let buyingOrSelling = this.state.buyingOrSelling;
		let inputToDisplay;

		if (buyingOrSelling === "buying") {
			inputToDisplay = <BuyingInput price={this.purchasePrice} onChange={this.handlePurchaseChange}/>
		} 
		else if (buyingOrSelling === "selling") {
			inputToDisplay = <SellingInput price={this.sellingPrice} onChange={this.handleSellingChange}/>
		}

		return(
		<div className="cash-calc__form-container">
			<form className="cash-calc__form" onSubmit={this.handleSubmit}>

				<div className="cash-calc__inputs-results-wrapper">

					<div class="cash-calc__form-block cash-calc__inputs-block">

						<div className="cash-calc__input-section cash-calc__input-section__prompt">
							<label className="cash-calc__form-item">Buying or Selling</label>
							<select className="cash-calc__form-item" onChange={this.handleSelectChange}>
								<option value="Buying">Buying</option>
								<option value="Selling">Selling</option>
								<option value="Both">Both</option>
							</select>
						</div>

						{/* <div className="cash-calc__input-section cash-calc__input-section_buying">
							<label className="cash-calc__form-item">Purchase Price</label>
							<input className="cash-calc__form-item" type="text" value={parseInt(this.state.purchasePrice).toLocaleString("en")} onChange={this.handlePurchaseChange}/>
						</div>

						<div className="cash-calc__input-section cash-calc__input-section_selling">
							<label className="cash-calc__form-item cash-calc__selling">Selling Price</label>
							<input className="cash-calc__form-item" type="text" value={parseInt(this.state.sellingPrice).toLocaleString("en")} onChange={this.handleSellingChange}/>
						</div> */}

						{inputToDisplay}
					
					</div>

					<div class="cash-calc__form-block">

						<div className="cash-calc__block cash-calc__results">
							<img src="https://via.placeholder.com/150"></img>
							<p class="cash-calc__cash-back">Cash Back</p>
							<div>{parseInt(this.state.cashBack).toLocaleString("en")}</div>
						</div>

					</div>

				</div>

				<div className="cash-calc__submit-container">
					<button className="cash-calc__submit-btn" type="submit">Calculate</button>
				</div>

			</form>
		</div>
		);
	}
}

ReactDOM.render(
	<CashCalculator/>,
	document.getElementById("app")
);

{/* <h1>How Much Cash Can You Get Back?</h1> */}
{/* <p>Plug in your info to calculate your earnings.</p> */}