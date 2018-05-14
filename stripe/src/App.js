import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabs from './components/Tabs';
import Tab from './components/Tab';
import Checkout from './components/payment/Checkout';
import Payments from './components/payment/Payments';
import {withStripe, withStripeData} from './StripeApi';

const publicKey = 'pk_test_a9UpYXCGToBoIajBDTn39ngA';
const secretKey = 'sk_test_Sr8B9ngZAxXTK5hR38g0mya8';

const SuperCheckout = withStripe(Checkout, publicKey, secretKey);
const SuperPayments = withStripeData(Payments, publicKey, secretKey,'charges');

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs>
        <Tab name="Checkouts" selected="true">
          <SuperCheckout/>
        </Tab>
        <Tab name="Payments">
          <SuperPayments/>
        </Tab>
      </Tabs>
    );
  }
}

export default App;
