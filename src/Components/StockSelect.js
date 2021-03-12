import React from 'react';

const StockSelect = (props) => {
    return (
        <div className="stock-select">
            <input onChange={(e) => props.onChange(e)} type="radio" id="Facebook" name="radio-stock" value="FB" defaultChecked />
            <label htmlFor="Facebook">Facebook</label>
            <input onChange={(e) => props.onChange(e)} type="radio" id="IBM" name="radio-stock" value="IBM" />
            <label htmlFor="IBM">IBM</label>
            <input onChange={(e) => props.onChange(e)} type="radio" id="Microsoft" name="radio-stock" value="MSFT" />
            <label htmlFor="Microsoft">Microsoft</label>
        </div>
    )
}
export default StockSelect;