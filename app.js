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

class CashCalcForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cashBack: 0,
			value: 20000
		};
	};
	handleCashBackButton = () => {
		this.setState({
			cashBack: 50
		});
	}
	handleChange(event) {

	}
	handleSubmit(event) {

	}
	render() {
		return(
		<div className="cash-calc__form-container">
			<form className="cash-calc__form" onSubmit={this.handleSubmit}>

				<div className="cash-calc__inputs-results-wrapper">

					<div class="cash-calc__form-block cash-calc__inputs-block">

						<div className="cash-calc__input-section cash-calc__input-section__prompt">
							<label className="cash-calc__form-item">Buying or Selling</label>
							<select className="cash-calc__form-item">
								<option value="Buying">Buying</option>
								<option value="Selling">Selling</option>
								<option value="Both">Both</option>
							</select>
						</div>

						<div className="cash-calc__input-section cash-calc__input-section_buying">
							<label className="cash-calc__form-item">Purchase Price</label>
							<input className="cash-calc__form-item" type="text" value={this.state.value} onChange={this.handleChange}/>
						</div>

						<div className="cash-calc__input-section cash-calc__input-section_selling">
							<label className="cash-calc__form-item cash-calc__selling">Selling Price</label>
							<input className="cash-calc__form-item"/>
						</div>
					
					</div>

					<div class="cash-calc__form-block">

						<div className="cash-calc__block cash-calc__results">
							<img src="https://via.placeholder.com/150"></img>
							<p>Cash Back</p>
							<div>{this.state.cashBack}</div>
						</div>

					</div>

				</div>

				<div className="cash-calc__submit-container">
					<button className="cash-calc__submit-btn" onMouseOver={this.handleCashBackButton} type="submit">Calculate</button>
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