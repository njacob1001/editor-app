'use client'

import { Input } from '@/components/atoms/input'
import { Search } from 'lucide-react'
import { Suspense } from 'react'

const Spinner = () => {
  console.log('render spinner')
  return <div>loading</div>
}

export const SearchBox = () => {
  //   const {} = useQuery({queryFn})
  return (
    <Suspense fallback={<Spinner />}>
      <form
        role="search"
        onSubmit={() => {
          console.log('submit')
        }}
      >
        <div className="relative">
          <Input
            type="search"
            className="rounded-full py-2  px-4 pl-12 w-full text-lg"
            placeholder="Search"
            // value={'hola'}
            autoCorrect="off"
            autoComplete="off"
            // onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute top-1/2 left-0 ml-4 -translate-y-1/2 ">
            <Search />
          </div>
        </div>
      </form>
    </Suspense>
  )
}
