import { motion } from 'framer-motion'
import React, { useState, useEffect, useCallback, CSSProperties } from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {GrInstallOption} from "react-icons/gr"


interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

interface PromptProps {
  background?: string;
  overlay?: string;
  disableOverlay?: boolean;
}

const Prompt = ({ background, overlay, disableOverlay }: PromptProps) => {

  const [isVisible, setVisibleState] = useState(false)
  const [isIOSVisible, setIOSVisibleState] = useState(false)
  const [prompt, setState] = useState<IBeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if(!isVisible){
      saveState(isVisible)
    }
  }, [isVisible, isIOSVisible])

  // useEffect(() => {    

  // }, [])

  const localStorageKey = "installPrompt"

  const saveState = (b: boolean) => {
    localStorage.setItem(localStorageKey, String(b))
  }

  const loadState = () => {
    return localStorage.getItem(localStorageKey) === "true"
  }

  const hide = () => setVisibleState(false)

  const promptToInstall = useCallback(() => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    )
  }, [prompt])

  const isIos = (): boolean => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  }

  const isInStandaloneMode = (): boolean =>
    'standalone' in window.navigator && (window.navigator as any).standalone

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault()
      setState(e)
    }

    if (isIos() && !isInStandaloneMode()) {
      setIOSVisibleState(true)
      setVisibleState(true)
    }

    window.addEventListener('beforeinstallprompt', ready as any)
    window.addEventListener('appinstalled', () => console.log('appinstalled'));
    window.addEventListener('install', () => console.log('install'));


    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any)
      window.removeEventListener('appinstalled', () => console.log('appinstalled remove'))
      window.removeEventListener('install', () => console.log('install remove'))
    }
  }, [])

  useEffect(() => {
    if (prompt) {
      setVisibleState(loadState())
      setVisibleState(true)
    }
  }, [prompt])

  if (!isVisible) {
    return <></>
  }

  return (
    <motion.div
      role='button'
      tabIndex={0}
      onClick={hide}
      onKeyDown={hide}
      className='overlay'
      style={{position: "fixed"}}
      // animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className='box'>
        <span className='closebtn'>
          <AiOutlineClose />
        </span>
        {isIOSVisible ? (
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <p>Do the following to install the app</p>
            <ol>
              <li>Click the share button</li>
              <li>Add to home screen</li>
              <li>And then add</li>
            </ol>
          </div>
        ) : (
          <button
            type='button'
            onClick={promptToInstall}
            className='button bottombtn'
          >
          <GrInstallOption color="white" style={{float: "left", marginTop: "auto", marginBottom: "auto", margin: "5px"}}/> <span style={{float: "right"}}>Installerer app</span>
          </button>
        )}
      </div>
      <style jsx>{`
      .button {
        transition: ease-in-out 0.3s all;
        border-bottom: var(--border-color) solid 1px;
        border-radius: 5px;
        background: var(--gradient);
        padding: 15px;
        color: white;
      }
        .closebtn {
          float: right;
          color: var(--accent);
          border: none;
        }
        .overlay {
          width: 100%;
          height: ${disableOverlay ? "auto" : "100%"};
          bottom: 0;
          left: 0;
          background-color: none;
          position: fixed;
          backdrop-filter: blur(10px);
          z-index: 999999;
        }
        .box {
          width: 100%;
          height: fit-content;
          position: sticky;
          bottom: 0px;
          left: 0px;
          right: 0px;
          padding: 10px;
          box-shadow: -1px -4px 51px -24px rgba(0, 0, 0, 0.75);
          text-align: center;
          backdrop-filter: blur(10px);
          background-color: var(--bg-color);
          color: var(--content-text) !important;
          transition: ease-in-out 0.3s all;
          border-bottom: var(--border-color) solid 1px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          width: 90vw;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </motion.div>
  )
}

export default Prompt