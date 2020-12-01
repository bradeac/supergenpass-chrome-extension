/* global chrome */

import { useEffect, useState } from 'react'
import { generate } from 'supergenpass-lib'

import './App.css'

function App() {
    const [masterPassword, setMasterPassword] = useState(process.env.REACT_APP_MASTER_PASSWORD || '')
    const [isCopyToClipboard, setIsCopyToClipboard] = useState(false)
    const [passwordLength, setPasswordLength] = useState(16)
    const [domain, setDomain] = useState('')

    useEffect(() => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = new URL(tabs[0].url)
            setDomain(url.hostname)
        })

        return (() => {
            setMasterPassword('')
            setIsCopyToClipboard(false)
            setDomain('')
        })
    }, [])

    const generatePassword = () => {
        generate(masterPassword, domain, { length: passwordLength }, password => {
            if (isCopyToClipboard) {
                navigator.clipboard.writeText(password)
            }

            chrome.tabs.executeScript({
                code: `
                    [...document.getElementsByTagName("input")]
                        .find(input => 
                            input.type.toLowerCase() === 'password'
                        )
                        .value = '${password}'
                `
            })
        })
    }

    const handleEnterKey = event => {
        if (event.key === 'Enter') {
            generatePassword()
        }
    }

    return (
        <section className="app">
            <section className="optionsContainer">
                <div className="container">
                    <span>Master password: </span>
                    <input
                        className="masterPasswordInput"
                        value={masterPassword}
                        type="password"
                        onChange={event => setMasterPassword(event.target.value)}
                        onKeyDown={handleEnterKey}
                    />
                </div>
                <div className="container">
                    <label>Password length: </label>
                    <input
                        className="passwordLengthInput"
                        type="text"
                        value={passwordLength}
                        onChange={event => setPasswordLength(event.target.value)}
                        onKeyDown={handleEnterKey}
                    />
                </div>
                <div className="checkboxContainer">
                    <label>
                        <input
                            checked={isCopyToClipboard} 
                            type="checkbox" 
                            onChange={() => setIsCopyToClipboard(prevState => !prevState)}
                        />
                        Copy to clipboard
                    </label>
                </div>
            </section>
            <button
                className="button"
                onClick={generatePassword}
            >
                Fill in password
            </button>
        </section>
    )
}

export default App