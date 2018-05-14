//import liraries
import React, { Component } from 'react';

// create a component
export default class Payments extends Component {
    render() {
        const payments = this.props.data.map((payment, index) => <Payment key={index} payment={payment} />);
        return (
            <div>
                <h2>See all your payments here!</h2>
                <div>
                    <h2>Payments</h2>
                    {this.props.loading ? <div>Loading ...</div> : null}
                    <table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Amount</td>
                                <td>Refunded</td>
                                <td>Disputed</td>
                                <td>Refund</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {payments}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
class Payment extends React.Component{
    render(){
        return (
            <tr>    
                <td>{this.props.payment.id}</td>
                <td>{this.props.payment.amount}</td>
                <td>{this.props.payment.refunded.toString()}</td>
                <td>{(this.props.payment.dispute != null).toString()}</td>
                <td>{this.props.payment.refundReason}</td>
                <td><button disabled={this.props.payment.refunded || this.props.payment.dispute} /></td>
            </tr>
        );
    }
}