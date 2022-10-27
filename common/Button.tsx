import { useState } from 'react'

import { LoadingSpinner } from './LoadingSpinner'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  icon?: JSX.Element
  count?: number
  className?: string
  disabled?: boolean
  loading?: boolean
  inlineLoader?: boolean
  loader?: React.ReactElement
}

export const Button: React.FC<Props> = ({
  children,
  onClick,
  className,
  disabled,
  loading,
  inlineLoader,
  loader,
  ...rest
}: Props) => {
  const [loadingClick, setLoadingClick] = useState(false)
  const loaderElement = loader || (
    <LoadingSpinner height="24" className="flex items-center justify-center" />
  )
  return (
    <div
      {...rest}
      className={`flex items-center gap-1 rounded-lg bg-primary p-3 text-light-0 transition-colors ${className} ${
        disabled
          ? 'cursor-default opacity-50'
          : 'cursor-pointer hover:bg-primary-hover'
      }`}
      onClick={async (e) => {
        if (!onClick || disabled) return
        try {
          setLoadingClick(true)
          await onClick(e)
        } finally {
          setLoadingClick(false)
        }
      }}
    >
      {loading || loadingClick ? (
        inlineLoader ? (
          <div className="flex items-center justify-center gap-2">
            {loaderElement}
            {children}
          </div>
        ) : (
          loaderElement
        )
      ) : (
        children
      )}
    </div>
  )
}
