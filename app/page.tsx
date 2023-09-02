'use client'

import { memo, useCallback, useMemo, useState } from 'react'

// eslint-disable-next-line react/display-name
const Child1 = memo(() => {
  return (
    <>
      <p>Child1コンポーネントです</p>
    </>
  )
})

type Child2Props = {
  handleClick: () => void
}
// eslint-disable-next-line react/display-name
const Child2 = memo(({ handleClick }: Child2Props) => {
  return (
    <>
      <p>Child2コンポーネントです</p>
      <button
        className="mt-5 py-2 px-4 border-2 border-slate-200 rounded-md"
        onClick={handleClick}
      >
        Click
      </button>
    </>
  )
})

const Home = () => {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  // Propsとして渡されるがuseCallbackがないとtextなどState更新時にこの関数も再生成され、子コンポーネントも再レンダリングされる（関数をキャッシュするため）
  const handleClick = useCallback(() => console.log('click'), [])

  const double = (count: number) => {
    let i = 0
    while (i < 3000000000) i++
    return count * 2
  }

  // countの変更のレンダリングには時間が掛かるが、textの更新によるレンダリングには時間がかからない（doubleCountがキャッシュされる）
  const doubleCount = useMemo(() => double(count), [count])

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
      <Child2 handleClick={handleClick} />
      <p>親コンポーネントで重い計算処理</p>
      <p>
        Counter: {count}, {doubleCount}{' '}
      </p>
      <button
        className="border-2 border-slate-200 rounded-md py-2 px-4 mt-5"
        onClick={() => setCount(count + 1)}
      >
        Increment Count2
      </button>
    </div>
  )
}

export default Home
