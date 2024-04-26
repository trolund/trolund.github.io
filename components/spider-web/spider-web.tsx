import { motion, useMotionValue, useTransform } from 'framer-motion'
import useRelative from '../../hooks/useRelative'
import { CSSProperties, useRef } from 'react'
import styles from './spider-web.module.css';

export default function SpiderWeb() {

    const itemSize = 50;

    const style: CSSProperties = {margin: 0, padding: 0, backdropFilter: "blur(10px)", opacity: 0.8}

    const box = { w: 500, h: 400 }

    const constraintsRef = useRef(null)

    const yShift = 100;

    const dragXa = useMotionValue(box.w / 2 - itemSize / 2)
    const dragYa = useMotionValue(150 - yShift)

    const dragXb = useMotionValue(box.w / 2 - itemSize / 2 - 150)
    const dragYb = useMotionValue(400 - yShift)

    const dragXc = useMotionValue(box.w / 2 - itemSize / 2 + 150)
    const dragYc = useMotionValue(400 - yShift)

    const transform = (a, b, c) => (a + b + c) === 0 ? 0 : ((a + b + c) / 3)

    const averageX = useRelative(
        transform,
        dragXa,
        dragXb,
        dragXc
    )

    const averageY = useRelative(
        transform, 
        dragYa,
        dragYb,
        dragYc
    )

    const shift = (v: number) => (v + itemSize / 2)

    const averageXs = useTransform(averageX, shift)
    const averageYs = useTransform(averageY, shift)

    const dragXas = useTransform(dragXa, shift)
    const dragYas = useTransform(dragYa, shift)

    const dragXbs = useTransform(dragXb, shift)
    const dragYbs = useTransform(dragYb, shift)

    const dragXcs = useTransform(dragXc, shift)
    const dragYcs = useTransform(dragYc, shift)

    const props: object = {
        drag: true,
        whileHover: { scale: 1.2 },
        whileTap: {
            scale: 0.8,
            borderRadius: "100%"
            },
        whileDrag: { scale: 1.2 },
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        },
        height: itemSize,
        width: itemSize,
        dragConstraints: constraintsRef
    }       

    const rx: number = 10;

    return (
    <div className={styles.container} style={{height: box.h, width: box.w}}>
    <div className={styles.area} style={{height: box.h, width: box.w}} ref={constraintsRef} />
    <motion.svg className={styles.area} height={box.h} width={box.w}>
        {/* lines */}
        <motion.line
            x1={averageXs}
            y1={averageYs}
            x2={dragXas}
            y2={dragYas}
            stroke="var(--content-text)"
        />
        <motion.line
            x1={averageXs}
            y1={averageYs}
            x2={dragXbs}
            y2={dragYbs}
            stroke="var(--content-text)"
        />
        <motion.line
            x1={averageXs}
            y1={averageYs}
            x2={dragXcs}
            y2={dragYcs}
            stroke="var(--content-text)"
        />
        {/* rects */}
        <motion.rect    
            style={{x: averageX, y: averageY, width: itemSize + "px", height: itemSize + "px"}} 
            fill="purple" 
            rx={rx}
            height={itemSize}
            width={itemSize}
        />
        <motion.g 
            style={{x: dragXa, y: dragYa, touchAction: "none"}} 
            fill="green"
            height={itemSize}
            width={itemSize}
            {...props}
        >
        <motion.rect 
            style={style}
            fill="yellow"
            rx={rx}
            height={itemSize}
            width={itemSize}
        />
            <text fill="black" color='black'>A</text>
        </motion.g>
        <motion.g 
            style={{x: dragXb, y: dragYb, touchAction: "none"}}  
            {...props} 
        >
            <motion.rect 
                style={style}
                fill="blue"
                rx={rx}
                height={itemSize}
                width={itemSize}
            />
            <text fill="black" color='black'>B</text>
        </motion.g>
        <motion.g 
            style={{x: dragXc, y: dragYc, touchAction: "none"}} 
            {...props} 
        >
            <motion.rect 
            style={style}
            fill="blue"
            rx={rx}
            height={itemSize}
            width={itemSize}
            />
            <text fill="black" color='black'>C</text>
        </motion.g>  
    </motion.svg>
    </div>
  )
}
