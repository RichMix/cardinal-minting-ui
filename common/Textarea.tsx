import { css } from '@emotion/react'

export const Textarea = (
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & { className?: string; error?: boolean }
) => (
  <textarea
    css={css`
      color-scheme: dark;
    `}
    {...{
      ...props,
      className: `appearance-none rounded border bg-dark-4 py-2 px-3 text-light-0 placeholder-medium-3 outline-none transition-all focus:border-light-4 ${
        props.error ? 'border-red-500' : 'border-border'
      }
    ${props.disabled ? 'opacity-30' : ''} ${props.className}`,
    }}
  />
)
