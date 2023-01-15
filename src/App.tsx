import React, { useCallback, useRef } from 'react'
import './App.css'
import { Button, InputWithButtons } from 'components/inputWithButtons'
import { InputWithSuggestions } from 'components/inputWithSuggestions'
export const App = () => {
  const firstInput = useRef<HTMLInputElement | null>(null)
  const secondInput = useRef<HTMLInputElement | null>(null)
  const firsButtonsHandler = useCallback((clearValue?: boolean) => {
    if (!firstInput.current) return
    if (clearValue) firstInput.current.value = ''
    else firstInput.current.value = 'Hello world!'
  }, [])

  const secondButtonsHandler = useCallback((checkForNumber?: boolean) => {
    const value = secondInput.current?.value
    if (checkForNumber) Number(value) && alert(value)
    else alert(value)
  }, [])

  const firstButtons: Button[] = [
    {
      orientation: 'right',
      component: (
        <button onClick={() => firsButtonsHandler(true)}> clear </button>
      ),
    },
    {
      orientation: 'right',
      component: <button onClick={() => firsButtonsHandler()}> hello </button>,
    },
  ]
  const secondButtons: Button[] = [
    {
      orientation: 'right',
      component: (
        <button onClick={() => secondButtonsHandler()}> alert </button>
      ),
    },
    {
      orientation: 'left',
      component: (
        <button onClick={() => secondButtonsHandler(true)}> alert num </button>
      ),
    },
  ]

  return (
    <div className="wrapper">
      <InputWithButtons inputRef={firstInput} buttons={firstButtons} />
      <InputWithButtons inputRef={secondInput} buttons={secondButtons} />
      <InputWithSuggestions maxSuggestionsCount={3} />
      <InputWithSuggestions maxSuggestionsCount={10} />
    </div>
  )
}
