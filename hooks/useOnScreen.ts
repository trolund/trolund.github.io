import { useEffect, useState } from "react"

export default function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    let observer: IntersectionObserver = null

    useEffect(() => {
        observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        )

        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])

    return isIntersecting
}