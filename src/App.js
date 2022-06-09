import { useCallback, useEffect, useState } from 'react'
import Loader from './components/UI/Loader/Loader'
import Navbar from './components/UI/Navbar/Navbar'
import CurrencyBlock from './components/CurrencyBlock/CurrencyBlock'
import './App.css'

function App() {
    const apidata = 'https://api.exchangerate.host/latest'
    const [loading, setLoading] = useState(true)
    const [allRates, setAllRates] = useState({})

    const [valueFrom, setValueFrom] = useState(1)
    const [valueTo, setValueTo] = useState()
    const [currencyFrom, setCurrencyFrom] = useState('USD')
    const [currencyTo, setCurrencyTo] = useState('BYN')

    const [baseCurrencyFrom, setBaseCurrencyFrom] = useState('')
    const [baseCurrencyTo, setBaseCurrencyTo] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch(apidata)
                .then((response) => response.json())
                .then((data) => {
                    setAllRates(data.rates)
                    setLoading(false)
                })
                .catch((err) => console.log(err))
        }, 1000)
    }, [])

    const init = useCallback(() => {
        setCurrencyTo(currencyTo)
        setValueTo(converting(valueFrom, currencyFrom, currencyTo))
        setBaseCurrencies(currencyFrom, currencyTo)
    }, [allRates])

    useEffect(() => {
        init()
    }, [init])

    const converting = (value, i, j) => {
        return ((value * allRates[j]) / allRates[i]).toFixed(2)
    }

    const onCurrencyFromChange = (currencyFrom) => {
        if (currencyFrom !== currencyTo) {
            setValueTo(converting(valueFrom, currencyFrom, currencyTo))
            setCurrencyFrom(currencyFrom)
            setBaseCurrencies(currencyFrom, currencyTo)
        }
    }

    const onInputFromChange = (valueFrom) => {
        setValueFrom(valueFrom)
        setValueTo(converting(valueFrom, currencyFrom, currencyTo))
    }

    const onCurrencyToChange = (currencyTo) => {
        if (currencyFrom !== currencyTo) {
            setValueTo(converting(valueFrom, currencyFrom, currencyTo))
            setCurrencyTo(currencyTo)
            setBaseCurrencies(currencyFrom, currencyTo)
        }
    }

    const onInputToChange = (valueTo) => {
        setValueTo(valueTo)
        setValueFrom(converting(valueTo, currencyTo, currencyFrom))
    }

    const setBaseCurrencies = (currencyFrom, currencyTo) => {
        setBaseCurrencyFrom(
            `1 ${currencyFrom} = ${(
                (1 * allRates[currencyTo]) /
                allRates[currencyFrom]
            ).toFixed(2)} ${currencyTo}`
        )
        setBaseCurrencyTo(
            `1 ${currencyTo} = ${(
                (1 * allRates[currencyFrom]) /
                allRates[currencyTo]
            ).toFixed(2)} ${currencyFrom}`
        )
    }

    return (
        <div className="App">
            <Navbar
                headlist={[
                    'Bank',
                    'Business',
                    'Investment',
                    'Insurance',
                    'Mobile',
                    'Travel',
                    'Entertainment',
                ]}
            />
            <h1>Currency Converter Online</h1>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="converter">
                        <CurrencyBlock
                            // allСurrencies={Object.keys(allRates)}
                            currencies={['BYN', 'USD', 'EUR', 'UAH']}
                            defaultCurrency={currencyFrom}
                            value={valueFrom}
                            onInputChange={onInputFromChange}
                            onCurrencyChange={onCurrencyFromChange}
                            baseCurrency={baseCurrencyFrom}
                        />
                        <CurrencyBlock
                            // allСurrencies={Object.keys(allRates)}
                            currencies={['BYN', 'USD', 'EUR', 'UAH']}
                            defaultCurrency={currencyTo}
                            value={valueTo}
                            onInputChange={onInputToChange}
                            onCurrencyChange={onCurrencyToChange}
                            baseCurrency={baseCurrencyTo}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default App
