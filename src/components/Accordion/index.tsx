import React, { useState } from 'react'

// components/Accordion.tsx

interface AccordionItem {
  title: string
  content: React.ReactElement
}

interface AccordionProps {
  items: AccordionItem[]
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className="flex-col space-y-8">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex-col border border-solid ${
            activeIndex === index ? 'border-crayola' : 'border-semi-gray'
          } ${
            activeIndex === index ? 'rounded-lg' : 'rounded-full'
          }  overflow-hidden`}
        >
          <div
            className="w-full py-2 px-4 text-left font-medium bg-transparent border-none flex items-center justify-between"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-xl">{item.title}</span>

            <span
              className={`transform transition-transform ${
                activeIndex === index ? '-rotate-180' : 'rotate-0'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#999999"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
          <div
            className={`flex-col px-4 border-t overflow-hidden text-sm transition-max-h font-light ${
              activeIndex === index ? 'max-h-[9999px] pb-2' : 'max-h-[0]'
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export { Accordion }
