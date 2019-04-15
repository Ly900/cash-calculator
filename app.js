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

const Input = function(props) {
	console.log(props);
	let inputClass, inputLabel;

	if (props.buyingOrSelling === "buying") {
		inputClass = "cash-calc__input-section_buying";
		inputLabel = "Purchase Price";
	} else if (props.buyingOrSelling === "selling") {
		inputClass = "cash-calc__input-section_selling";
		inputLabel = "Selling Price";
	} else {
		console.log("both");
	}

	return(
		<div className={"cash-calc__input-section " + (inputClass)}>
			<label className="cash-calc__form-item">{inputLabel}</label>
			<input className="cash-calc__form-item" type="text" value={parseInt(props.price).toLocaleString("en")} onChange={props.onChange}/>
		</div>
	)
}

class CashCalcForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cashBack: 0,
			initialPrice: 2000,
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
		} else {
			this.setState({
				buyingOrSelling: "both"
			});
		}
	}

	handleInputChange = (event) => {
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

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			cashBack: parseInt(this.state.cashBack) + parseInt(this.state.purchasePrice)
		});
	}

	render() {
		let buyingOrSelling = this.state.buyingOrSelling;
		let inputToDisplay;

		if ( buyingOrSelling !== "both") {
			inputToDisplay = <Input price={this.state.initialPrice} buyingOrSelling={buyingOrSelling} onChange={this.handleInputChange}/>
		} else {
			inputToDisplay = 
			<div>
				<Input price={this.state.purchasePrice} buyingOrSelling={buyingOrSelling} onChange={this.handleInputChange}/>
				<Input price={this.state.sellingPrice} buyingOrSelling={buyingOrSelling} onChange={this.handleInputChange}/>
			</div>	
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