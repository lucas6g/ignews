import { useEffect, useState } from "react"

export function Async(){

  const [isButtonViseble,setIsButtonViseble] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
        setIsButtonViseble(true)
    },1000)
  },[])

  return (
    <div>
      <div>helloword</div>

      {isButtonViseble && (
        <button>Clique</button>
      )}
    </div>
  )
}