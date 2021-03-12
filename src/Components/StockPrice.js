import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import StockSelect from './StockSelect'

class StockPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            selectedCompanySignature: 'FB',
            selectedCompanyName: 'Facebook',
        }
        this.selectStockCompany = this.selectStockCompany.bind(this);
    }
    componentDidMount() {
        this.fetchStockPrice();
    }
/*****************************************************************************************************
 To fetch live stock for selected company 
 *****************************************************************************************************/
    fetchStockPrice() {
        const API_KEY = 'HGJWFG4N8AQ66ICD';
        let stockCompany = this.state.selectedCompanySignature;
        let stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCompany}&interval=1min&outputsize=compact&apikey=${API_KEY}`;
        let stockXValuesDate = [];
        let stockYValuesPrice = [];
        axios.get(stockApi)
            .then((stockResponse) => {
                var stockValue = stockResponse.data;
                for (var key in stockValue['Time Series (1min)']) {
                    stockXValuesDate.push(key);
                    stockYValuesPrice.push(stockValue['Time Series (1min)'][key]['1. open']);
                }
                this.setState({
                    stockChartXValues: stockXValuesDate,
                    stockChartYValues: stockYValuesPrice
                });
            }).catch(error => {
                console.error(error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                }
            });
    }
/*****************************************************************************************************
 To select company whose stock needs to be displayed on chart
 *****************************************************************************************************/
    selectStockCompany(e) {
        const changedCompanySignature = e.target.value;
        const changedCompanyName = e.target.id;
        // Implemented callback (call to API) as setState is asynchronous 
        this.setState({
            selectedCompanySignature: changedCompanySignature,
            selectedCompanyName: changedCompanyName
        }, () => { this.fetchStockPrice() })
    }

    render() {
        return (
            <div>
                <h1>Live Stock Price</h1>        
                <StockSelect onChange={this.selectStockCompany} />
                <p>Stock Price for {this.state.selectedCompanyName} : {this.state.stockChartYValues.length > 1 &&
                   this.state.stockChartYValues[0]}</p>  
                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'blue'}
                        }
                    ]}
                    layout={{
                        xaxis: {
                            title: {
                                text: "Time"
                            },
            
        
                        },
                        yaxis: {
                            title: {
                                text: "Stock price",
                            }
                        },
                        width: 750, height: 450, title: ''
                    }}
                />
            </div>
        )
    }
}
export default StockPrice;