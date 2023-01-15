import { runInAction, makeAutoObservable } from 'mobx'
import { CountryInfo, getCountryByName } from 'api/apiService'

class CountriesStoreIml {
  constructor() {
    makeAutoObservable(this)
  }
  countries: CountryInfo[] = []
  fetchError: string | null = null
  selectedCountry: CountryInfo | null = null

  clearCountries = () => {
    this.countries = []
  }
  fetchCountries = async (value: string, cutTo = 5) => {
    try {
      const countries: CountryInfo[] = await getCountryByName(value)
      const uniqueArr = [...new Set(countries)]
      runInAction(() => {
        this.countries = uniqueArr.slice(0, cutTo)
      })
    }
    catch (err: any) {
      runInAction(() => {
        this.fetchError = err
      })
    }
}
  setCurrent = (country: CountryInfo) => {
    this.selectedCountry = country
  }
}
export const CountriesStore = new CountriesStoreIml()