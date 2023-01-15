import React from 'react'
import { v4 as uuid } from 'uuid'
import './index.css'
import { CountryInfo } from 'api/apiService'

interface props {
  suggestions: CountryInfo[]
  onOptionClick: (option: CountryInfo) => void
}
export const Suggestions: React.FC<props> = ({ suggestions, onOptionClick }) => {
  return(
      <div className="suggestionsContainer">
        {suggestions.length === 0 ? 'Nothing found' : suggestions.map(country => {
          return (
            <div onClick={() => onOptionClick(country)} key={uuid()} className="suggestions__item">
              <div className="suggestions__item__name">
                {country.name}
              </div>
              <div className="suggestions__item__fullName">
                {country.fullName}
              </div>
              <img alt="flag" src={country.flag} className="suggestions__item__flag" />
            </div>
          )})}
      </div>
  )
}