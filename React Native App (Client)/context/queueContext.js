import { createContext, useState, useMemo, useContext } from "react"

const QueueContext = createContext({})

const QueueContextWrapper = ({ children }) => {
  const queueValue = useMemo(() => ({}), [])
  return (
    <QueueContext.Provider value={queueValue}>{children}</QueueContext.Provider>
  )
}

export const useQueueContext = () => useContext(QueueContext)

export default QueueContextWrapper
