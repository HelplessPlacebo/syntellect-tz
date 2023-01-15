import React, { useMemo, memo, ChangeEvent, RefObject, useCallback } from 'react'
import './index.css'
import { v4 as uuid } from 'uuid'

export type Button = {
  orientation: 'left' | 'right'
  component: JSX.Element
}
interface props {
  buttons: Button[],
  inputRef: RefObject<HTMLInputElement> | null
}

const ButtonsGroup: React.FC<{buttons: React.ReactNode[]}> = memo(({buttons}) => {
  if(buttons.length == 0) return null

  return <> {buttons} </>
})

export const InputWithButtons: React.FC<props> = ({buttons, inputRef}) => {
  const leftButtons = useMemo(() => buttons.map(b => b.orientation === 'left' && {...b.component, key: uuid()}), [buttons])
  const rightButtons = useMemo(() => buttons.map(b => b.orientation === 'right' && {...b.component, key: uuid()}), [buttons])
  const inputChangeHandler = useCallback((event:ChangeEvent<HTMLInputElement>) => {
    if (inputRef?.current) {
      inputRef.current.value = event.target.value
    }
  }, [])
  
  return (
    <div className="container">
      {leftButtons.length > 0 && <ButtonsGroup buttons={leftButtons} />}
      <input
        ref={inputRef}
        type="text"
        defaultValue=""
        onChange={(event:ChangeEvent<HTMLInputElement>) => inputChangeHandler(event)}
      />
      {leftButtons.length > 0 && <ButtonsGroup buttons={rightButtons} />}
    </div>)
}