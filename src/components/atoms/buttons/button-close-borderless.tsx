import { FC } from 'react'

interface ButtonCloseBorderlessProps {
  onClick: () => void
}

export const ButtonCloseBorderless: FC<ButtonCloseBorderlessProps> = ({
  onClick,
}) => {
  // taildwind border less button for close window
  return (
    <button
      onClick={onClick}
      type="button"
      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
    >
      <span className="sr-only">Close panel</span>
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}
