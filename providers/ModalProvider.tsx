import { Modal } from 'common/Modal'
import React, { useContext, useState } from 'react'

export interface ModalProviderValues {
  showModal: (content: JSX.Element) => void
  closeModal: () => void
}

const ModalContext: React.Context<ModalProviderValues> =
  React.createContext<ModalProviderValues>({
    showModal: () => <></>,
    closeModal: () => <></>,
  })

export function ModalProvider({ children }: { children: JSX.Element }) {
  const [content, setContent] = useState<JSX.Element>()
  return (
    <ModalContext.Provider
      value={{
        showModal: (content: JSX.Element) => {
          setContent(content)
        },
        closeModal: () => {
          setContent(undefined)
        },
      }}
    >
      <Modal isOpen={!!content} onDismiss={() => setContent(undefined)}>
        {content}
      </Modal>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalProviderValues {
  return useContext(ModalContext)
}
