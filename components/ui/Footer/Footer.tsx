import Logo from '@/components/icons/Logo'
import GitHub from '@/components/icons/GitHub'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between px-4 py-12 mx-auto max-w-7xl md:flex-row">
      <p className="mb-8 text-sm text-center text-gray-700 md:text-left md:mb-0">
        © Copyright 2020 Stacks. All Rights Reserved.
      </p>
      <div className="flex items-center space-x-6">
        <a href="https://github.com/stackhackerio" target="_blank">
          <span className="sr-only">GitHub</span>
          <GitHub />
        </a>
      </div>
    </footer>
  )
}
