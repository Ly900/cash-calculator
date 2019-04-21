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
	let inputClass, inputLabel;
	let inputToDisplay;
	// console.log(props.price);

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
			<label className="cash-calc__form-item">{inputLabel}</label>
			<input className="cash-calc__form-item" type="text" name={name} value={parseInt(props.price).toLocaleString("en")} onChange={props.onChange}/>
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
			data: {},
			dataLoaded: false
		};
	};

	componentDidMount(){
		fetch('./cash-back-data.json')
		.then(response => response.json())
		.then(myJson => {
			// console.log(myJson);
			// console.log(typeof(myJson));
			this.setState({
				data: myJson,
				dataLoaded: true
			});
		});
	}

	handleSelectChange = (event) => {
		const buyingOptionSelected = event.target.value === "Buying";
		const sellingOptionSelected = event.target.value === "Selling";

		// console.log("cashBack: ", this.state.cashBack);
		// console.log("purchasePrice: ", this.state.purchasePrice);
		// console.log("sellingPrice: ", this.state.sellingPrice);

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

	handleInputChange = (event, buyingOrSelling) => {
		// console.log("target name:", event.target.name);
		// console.log(buyingOrSelling);
		const re = /^\d+$/;
		// let buying = buyingOrSelling === "buying";
		// let selling = buyingOrSelling === "selling";
		let purchaseInput = event.target.name === "purchaseInputName";
		let sellingInput = event.target.name === "sellingInputName";

		// Remove commas and make a raw int value.
		let rawValue = parseInt(event.target.value.replace(/,/g, ""));
		// console.log("rawValue: ", rawValue);

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
		let cashBack;
		let finalCashBack;

		function getCashBack(buyingOrSelling, self) {
			return function(item) {
				let price = buyingOrSelling === "buying" ? self.state.purchasePrice : self.state.sellingPrice;
				return item.min <= price && item.max >= price;
			}
		}

		if (buying || selling) {
			finalCashBack = this.state.data.filter(getCashBack(this.state.buyingOrSelling, this));
			finalCashBack = finalCashBack[0]["cash-back"];
		} else {
			let buyingCashBack = this.state.data.filter(getCashBack("buying", this));
			let sellingCashBack = this.state.data.filter(getCashBack("selling", this));
			finalCashBack = buyingCashBack[0]["cash-back"] + sellingCashBack[0]["cash-back"];
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

		// let {cashData} = this.state;
		// let cashData = !this.state.dataLoaded ? 'Loading...' : this.state.data;
		// console.log(rendered);
		let myData = JSON.stringify(this.state.data);
		myData = (JSON.parse(myData));
		// console.log(myData);
		let rendered = !this.state.dataLoaded ? 'Loading' : myData;
		// console.log("rendered: ", rendered);
		// const renderedData = Object.map((item) => {

		// })

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
								{/* <div>
									{Object.keys(rendered).map(item => {
										return (
											<p>
												<span>{rendered[item].min}</span>
											</p>
										)}
									 )}
								</div> */}
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