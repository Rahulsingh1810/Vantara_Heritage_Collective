'use client'

import ReactMarkdown from 'react-markdown'

interface RichTextRendererProps {
  /** The markdown string from Contentful */
  document: any
  /** Optional extra className on the wrapper */
  className?: string
}

/**
 * Renders a Contentful Markdown (Long Text) field into styled React elements.
 */
export default function RichTextRenderer({ document, className }: RichTextRendererProps) {
  if (!document || typeof document !== 'string') return null

  return (
    <div className={`rich-text-content text-(--color-wine-red)/70 ${className ?? ''}`}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-4 leading-relaxed last:mb-0">{children}</p>,

          h1: ({ children }) => (
            <h2 className="mt-8 mb-4 text-3xl font-bold text-(--color-wine-red) first:mt-0">{children}</h2>
          ),
          h2: ({ children }) => (
            <h3 className="mt-7 mb-3 text-2xl font-bold text-(--color-wine-red) first:mt-0">{children}</h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-6 mb-3 text-xl font-semibold text-(--color-wine-red) first:mt-0">{children}</h4>
          ),
          h4: ({ children }) => (
            <h5 className="mt-5 mb-2 text-lg font-semibold text-(--color-wine-red) first:mt-0">{children}</h5>
          ),

          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,

          ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 last:mb-0">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-(--color-wine-red)/40 pl-5 text-(--color-wine-red)/70 italic">
              {children}
            </blockquote>
          ),

          hr: () => <hr className="my-8 border-t border-(--color-wine-red)/20" />,

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-(--color-wine-red) underline underline-offset-2 transition-colors hover:text-(--color-wine-red)/70"
            >
              {children}
            </a>
          ),

          code: ({ children }) => (
            <code className="rounded bg-(--color-wine-red)/10 px-1.5 py-0.5 font-mono text-sm">{children}</code>
          )
        }}
      >
        {document}
      </ReactMarkdown>
    </div>
  )
}
