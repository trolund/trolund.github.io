import { MotionValue, useMotionValue } from "framer-motion"
import { useCallback, useEffect } from "react"

export default function useRelative(transformationFunction: (a: number, b: number, c: number) => number, xA: MotionValue<number>, xB: MotionValue<number>, xC: MotionValue<number>) {

    const betweenX = useMotionValue(transformationFunction(xA.get(), xB.get(), xC.get()))

    const calc = useCallback((a, b, c) => {
       betweenX.set(transformationFunction(a, b, c))
    }, [])
    
    useEffect(() => {
      const cancelA = xA.onChange(v => calc(v, xB.get(), xC.get()))
      const cancelB = xB.onChange(v => calc(xA.get(), v, xC.get()))
      const cancelC = xC.onChange(v => calc(xA.get(), xB.get(), v))
      return () => {
        cancelA()
        cancelB()
        cancelC()
      }
    }, [])

    return betweenX
}