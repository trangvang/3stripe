//import liraries
import React, { Component } from 'react';

// create a component
export default class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastestCharge: 'None'
        }
        this.createCharge = this.createCharge.bind(this);
    }
    
    async createCharge(){ 
        this.setState({
            lastestCharge:'Creating Token...'
        })
        
        const creditCardDetails = {
            'card[number]':'4242424242424242',
            'card[exp_month]':'02',
            'card[exp_year]':'2019'
        };       

        const tokenData = await this.props.postPublic('tokens', creditCardDetails);
        this.setState({
            lastestCharge: 'creating charge...'
        })

        const chargeData = await this.props.postSecret('charges',{
            'amount':200,
            'currency':'usd',
            'description':'Test',
            'source':tokenData.id
        })
        this.setState({
            lastestCharge: chargeData.id
        })
    }

    render() {
        return (
            <div>
                <h2>Welcome to Checkout</h2>
                <button onClick={this.createCharge}>Charge</button>
                <h3>Latest charge is: {this.state.lastestCharge}</h3>
            </div>
        );
    }
}
