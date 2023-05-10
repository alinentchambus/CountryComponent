import React, { useState } from 'react'
import './country.css'

export default function Country() {

    const countryList = [
        {
            id: 1,
            code: 'CMR',
            name: 'Cameroun'

        },
        {
            id: 2,
            code: 'FR',
            name: 'France'

        },
    
    ]

    const [countries, setCountries] = useState(countryList);
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [currentId, setCurrentId] = useState(null)
    const [mode, setMode] = useState('add')
    const [nexId, setNextId] = useState(3)


    const handleSubmit = (event) => {
        event.preventDefault();

        if (mode === 'edit') {
            const countries_ = countries.filter(c => c.id !== currentId)
            setCountries([...countries_, {
                id: currentId,
                name: countryName,
                code: countryCode
            }])
            setCountryCode('');
            setCountryName('')
            setMode('add')
        } else {
            const country = {
                id: nexId,
                name: countryName,
                code: countryCode
            }
    
            setCountries([...countries, country])
            setNextId(nexId + 1)
            setCountryCode('');
            setCountryName('')
        }
    }

    const editCountry = (id) => {
        const country_ = countries.find(c => c.id === id)
        setCurrentId(id)
        setCountryName(country_.name)
        setCountryCode(country_.code)
        
    }

    const deleteCountry = (id) => {
        const newCountryList = countries.filter(c => c.id !== id)
        setCountries(newCountryList)
    }

  return (
    <div className='container'>
        <h1>Country List</h1>
        <form onSubmit={handleSubmit} className='flex'>
            <div className='form-element'>
                <label >Name</label>
                <input
                    type="text"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                />
            </div>
            <div className='form-element'>
                <label>Code</label>
                <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                />
            </div>
            {mode === 'add' ? (
                <input className='primary-btn' type='submit' value='Add'></input>
            ) : (
                <input className='warning-btn' type='submit' value='Edit'></input>
            )}
        </form>
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {countries.map((country) => (
                <tr>
                    <td>{country.code}</td>
                    <td>{country.name}</td>
                    <td>
                        <button className='margin-right warning-btn'  onClick={() => {
                            setMode('edit')
                            editCountry(country.id)

                            } }>edit</button>
                        <button className='danger-btn' onClick={() => deleteCountry(country.id)}>delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
