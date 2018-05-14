import React from 'react';

export function withStripeData(WrappedComponent, publicKey, secretKey, route){
    const base = class extends React.Component{
        constructor(props){
            super(props);
            this.refresh = this.refresh.bind(this);
            this.state = {
                data: [],
                loading: false
            }
        }
        componentDidMount(props){
            this.refresh();
        }
    
        async refresh() {
            this.setState({
                loading:true
            });
            const data = await this.props.getSecret(route);
            this.setState({
                data:data.data,
                loading:false
            });
        }
        render(){
            return <WrappedComponent
                    data = {this.state.data}
                    loading= {this.state.loading}
                    {...this.props} />
        }
    }
    
    return withStripe(base, publicKey, secretKey);
}

export function withStripe(WrappedComponent, publicKey, secretKey){
    const request = async (route, method, key, postData)=> {
        let dataStr= null;
        if(postData) {
            dataStr = Object.keys(postData).map(k => {
                return `${k}=${postData[k]}`
            }).join('&')
        }

        const response = await fetch('https://api.stripe.com/v1/' + route, {
            method:method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${key}`,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:dataStr
        });
        return await response.json();
    };

    return class extends React.Component{
        postPublic(route, postData){
            return request (route, 'POST', publicKey, postData);
        }
        postSecret(route, postData){
            return request (route, 'POST', secretKey, postData);
        }
        getSecret(route){
            return request(route, 'GET', secretKey, null);
        }

        render(){
            return <WrappedComponent
                    postPublic={this.postPublic}
                    postSecret={this.postSecret}
                    getSecret={this.getSecret}
                    {...this.props}
                    />
        }
    };
}