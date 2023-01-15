import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Suggestions } from './suggestions'
import { useClickOutside } from 'handlers/hooks/clickOutside'
import { CountryInfo } from 'api/apiService'
import { useDebounce } from 'handlers/hooks/useDebounce'
import { CountriesStore } from 'store/countriesStore'
import './index.css'

interface props {
  maxSuggestionsCount: number
}

export const InputWithSuggestions: React.FC<props> = observer(({maxSuggestionsCount}) => {
  const { selectedCountry, countries, fetchCountries, setCurrent, clearCountries } = CountriesStore
  const [inputValue, setInputValue] = useState(selectedCountry?.name || '')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hide = useCallback(() => {
    setShowSuggestions(false)
    setTimeout(() => { clearCountries() }, 300)}, [setShowSuggestions])
  const show = useCallback(() => {setShowSuggestions(true)}, [setShowSuggestions])
  const onOptionClick = useCallback((country: CountryInfo) => {
    setCurrent(country)
    setInputValue(country.name)
    hide()
  }, [])

  const getSuggestions = useDebounce(fetchCountries, 500)
  useClickOutside(containerRef, hide)

  const changeHandler = useCallback( (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    getSuggestions(value, maxSuggestionsCount)
    if (!value) hide()
    else show()
  }, [])

  return (
    <div ref={containerRef} className="suggestionInput__wrapper">
      <input
        value={inputValue}
        onChange={changeHandler}
        type="text"
        placeholder="Enter country name"
      />
      { showSuggestions && <Suggestions onOptionClick={onOptionClick} suggestions={countries} /> }
    </div>
  )
})