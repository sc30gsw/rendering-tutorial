'use client'

import { memo, useState } from 'react'

// eslint-disable-next-line react/display-name
const Child1 = memo(() => {
  return (
    <>
      <p>子コンポーネントです</p>
    </>
  )
})

const Home = () => {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  return (
    <div>
      <p>親コンポーネントです</p>
      <input
        type="text"
        className="border-2 border-slate-200 rounded-md"
        value={text}
        onChange={handleChange}
      />
      <Child1 />
    </div>
  )
}

export default Home
