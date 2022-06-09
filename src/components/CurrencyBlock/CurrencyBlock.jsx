import React from 'react'
import classes from './CurrencyBlock.module.css'

const CurrencyBlock = ({
    // allСurrencies,
    currencies,
    defaultCurrency,
    value,
    onInputChange,
    onCurrencyChange,
    baseCurrency,
    converting,
}) => {
    return (
        <div className={classes.exchanges}>
            <div className={classes.buttons}>
                {currencies.map((currency) => (
                    <button
                        className={
                            defaultCurrency === currency
                                ? [classes.button, classes.active].join(' ')
                                : classes.button
                        }
                        key={currency}
                        value={currency}
                        onClick={(event) => onCurrencyChange(event.target.value)}
                    >
                        {currency}
                    </button>
                ))}
            </div>
            <div className={classes.inputs}>
                <input
                    type="number"
                    value={value}
                    onChange={(event) => onInputChange(event.target.value)}
                />
                <p>{baseCurrency}</p>
            </div>
        </div>
    )
}

export default CurrencyBlock
