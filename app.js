const CashCalculator = function() {
	return(
		<div className="cash-calc">
			<CashCalcHeading/>
			<CashCalcForm/>
		</div>
	);
}
const CashCalcHeading = function() {
	return(
		<div className="cash-calc__header">
			<h1 className="cash-calc__heading">How Much Cash Will You Get Back?</h1>
			<p className="cash-calc__description">Plug in your info to calculate your earnings.</p>
		</div>
	);
}

const Input = function(props) {
	let inputClass, inputLabel;
	let inputToDisplay;

	if (props.buyingOrSelling === "buying") {
		inputClass = "cash-calc__input-section_buying";
		inputLabel = "Purchase Price";
		name = "purchaseInputName"
	} else if (props.buyingOrSelling === "selling") {
		inputClass = "cash-calc__input-section_selling";
		inputLabel = "Selling Price";
		name = "sellingInputName"
	} 

	inputToDisplay = 
		<div className={"cash-calc__input-section " + (inputClass)}>
			<label className="cash-calc__form-item cash-calc__form-label">{inputLabel}</label>
			<input className="cash-calc__form-item cash-calc__form-input" type="text" name={name} value={parseInt(props.price).toLocaleString("en")} onChange={props.onChange}/>
		</div>;

	return(
		<div>{inputToDisplay}</div>
	)
}

class CashCalcForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cashBack: 0,
			purchasePrice: 0,
			sellingPrice: 0,
			buyingOrSelling: "buying",
			maxCashBack: 5050,
			data: {},
			dataLoaded: false
		};
	};

	componentDidMount(){
		fetch('./cash-back-data.json')
		.then(response => response.json())
		.then(myJson => {
			this.setState({
				data: myJson,
				dataLoaded: true
			});
		});
	}

	handleSelectChange = (event) => {
		const buyingOptionSelected = event.target.value === "Buying";
		const sellingOptionSelected = event.target.value === "Selling";

		this.setState({
			cashBack: 0,
			purchasePrice: 0,
			sellingPrice: 0
		});

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
		let purchaseInput = event.target.name === "purchaseInputName";
		let sellingInput = event.target.name === "sellingInputName";

		// Remove commas and make a raw int value.
		let rawValue = parseInt(event.target.value.replace(/,/g, ""));

		// Only update input value if it contains only digits.
		if ( (re.test(rawValue)) || rawValue === "") {
			if (purchaseInput) {
				this.setState({
					purchasePrice: rawValue
				});
			} else if (sellingInput) {
				this.setState({
					sellingPrice: rawValue
				});
			}
		}

		if ( isNaN(rawValue) ) {

			if (purchaseInput) {
				this.setState({
					purchasePrice: 0
				});
			} else if (sellingInput) {
				this.setState({
					sellingPrice: 0
				});
			}

		} 
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let buying = this.state.buyingOrSelling === "buying";
		let selling = this.state.buyingOrSelling === "selling";
		let finalCashBack;

		function getCashBack(buyingOrSelling, self) {
			return function(item) {
				let price = buyingOrSelling === "buying" ? self.state.purchasePrice : self.state.sellingPrice;
				return item.min <= price && item.max >= price;
			}
		}

		if (buying || selling) {
			finalCashBack = this.state.data.filter(getCashBack(this.state.buyingOrSelling, this));
			finalCashBack = finalCashBack === undefined || finalCashBack.length === 0 ? this.state.maxCashBack : finalCashBack[0]["cash-back"];
		} else {
			let buyingCashBack = this.state.data.filter(getCashBack("buying", this));
			buyingCashBack = buyingCashBack === undefined || buyingCashBack.length === 0 ? this.state.maxCashBack : buyingCashBack[0]["cash-back"];
			let sellingCashBack = this.state.data.filter(getCashBack("selling", this));
			sellingCashBack = sellingCashBack === undefined || sellingCashBack.length === 0 ? this.state.maxCashBack : sellingCashBack[0]["cash-back"];
			finalCashBack = buyingCashBack + sellingCashBack;
		}

		this.setState({
			cashBack: finalCashBack
		});

	}

	render() {
		let buyingOrSelling = this.state.buyingOrSelling;
		let inputToDisplay;

		if ( buyingOrSelling === "buying") {
			inputToDisplay = <Input price={this.state.purchasePrice} buyingOrSelling={buyingOrSelling} onChange={(e) => {this.handleInputChange(event)}}/>
		} else if ( buyingOrSelling === "selling" ) {
			inputToDisplay = <Input price={this.state.sellingPrice} buyingOrSelling={buyingOrSelling} onChange={(e) => {this.handleInputChange(event)}}/>
		} else {
			inputToDisplay = 
			<div>
				<Input price={this.state.purchasePrice} buyingOrSelling="buying" onChange={(e) => {this.handleInputChange(event)}}/>
				<Input price={this.state.sellingPrice} buyingOrSelling="selling" onChange={(e) => {this.handleInputChange(event)}}/>
			</div>	
		}

		return(

			<div className="cash-calc__form-container">
				<form className="cash-calc__form" onSubmit={this.handleSubmit}>

					<div className="cash-calc__inputs-results-wrapper">

						<div class="cash-calc__form-block cash-calc__inputs-block">

							<div className="cash-calc__input-section cash-calc__input-section__prompt">
								<label className="cash-calc__form-item cash-calc__form-label">Buying or Selling</label>
								<select className="cash-calc__form-item cash-calc__form-select" onChange={this.handleSelectChange}>
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
								<div>${parseInt(this.state.cashBack).toLocaleString("en")}</div>
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