"use client"
import { Disclosure } from '@headlessui/react';
import { ArrowRight, MoveDown, MoveUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FAQAccordion() {
  const router = useRouter();
  const [openItem, setOpenItem] = useState(0);

  const faqItems = [
    {
      id: 1,
      number: "01",
      question: "What does an engineering consulting company do?",
      answer: "An engineering consulting company like Encimex provides expert guidance, technical analysis, and project management across various engineering disciplines. We assist in planning, designing, and executing engineering projects — ensuring safety, efficiency, compliance, and cost-effectiveness from concept to completion."
    },
    {
      id: 2,
      number: "02",
      question: "What types of engineering services does Encimex offer?",
      answer: "Encimex offers a wide range of services including civil, structural, mechanical, electrical, environmental, and infrastructure engineering. We also provide feasibility studies, project planning, design development, construction supervision, and sustainability consulting."
    },
    {
      id: 3,
      number: "03",
      question: "How early should I involve an engineering consultant in my project?",
      answer: "Ideally, an engineering consultant should be involved at the very beginning of a project. Early engagement ensures better planning, risk mitigation, cost estimation, and design efficiency, ultimately saving time and resources throughout the project lifecycle."
    },
    {
      id: 4,
      number: "04",
      question: "What industries does Encimex work with?",
      answer: "Encimex serves a broad range of industries including construction, infrastructure, energy, transportation, manufacturing, water management, and environmental sectors. Our multidisciplinary expertise allows us to adapt solutions to the specific needs of each industry."
    },
    {
      id: 5,
      number: "05",
      question: "How does Encimex ensure quality and compliance in projects?",
      answer: "We follow strict industry standards, local regulations, and international best practices. Our quality control systems, skilled engineers, and advanced digital tools ensure that each project is executed with precision, safety, and full regulatory compliance."
    },
    {
      id: 6,
      number: "06",
      question: "Do you provide sustainable engineering solutions?",
      answer: "Yes, sustainability is a core part of our engineering approach. Encimex integrates environmentally responsible practices such as energy-efficient designs, low-impact materials, and long-term lifecycle planning into all our projects to reduce environmental impact and improve resilience."
    },
    {
      id: 7,
      number: "07",
      question: "How can I get a quote or consultation for my project?",
      answer: "Getting started with Encimex is easy. Simply visit our Contact page or reach out via email or phone. Our team will schedule a consultation to understand your needs and provide a tailored proposal, including estimated timelines and costs."
    }
];

  const PlusMinusIndicator = ({ isOpen }) => (
    <div className="w-10 h-10 flex items-center justify-center bg-[#D9D9D9]/20 text-white rounded-full p-2.5">
      {isOpen ? <MoveUp /> : <MoveDown />}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row text-white min-h-screen bg-[#0D0D0D] ">
      {/* Left sidebar */}
      <div className="bg-orang pt-8 py-12 pl-10 lg:pl-28 md:w-[30%]">
        <div className='flex flex-col justify-between h-full md:gap-10 gap-3'>
          <div>
            <h1 className="md:text-[6.5vw] text-[17.5vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-orang md:mb-24 mb-2">FAQ</h1>
          </div>
          <div className="mt-auto">
            <h3 className="text-white text-xl mb-4">Having Another Questions ?</h3>
            <div className="flex cursor-pointer">
              <div
                onClick={() => router.push('/contact')}
                className="flex flex-row items-center justify-center gap-2 w-[65%] border border-white rounded-full bg-gray-500/30">
                <p className="text-white text-lg font-light p-2">Send a Message</p>
                <ArrowRight className="text-black bg-white rounded-full p-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right content area */}
      <div className="md:pl-10 md:w-[70%] md:py-20 py-10">
        <div className="max-w-3xl">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Disclosure key={item.id}>
                {({ open }) => (
                  <div className={`border-b border-white/30 ${open ? 'bg-orang' : ''}`}>
                    <Disclosure.Button
                      className={`w-full flex items-center justify-between py-6 px-3 rounded-lg relative ${
                        open ? 'bg-orang' : ''
                      }`}
                      onClick={() => setOpenItem(index)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[#595959]">{item.number}</span>
                        <p className="text-white text-xl text-left pl-4 md:pr-0 pr-15">
                          {item.question}
                        </p>
                      </div>
                      <div className="absolute right-4 top-10 -translate-y-1/2">
                        <PlusMinusIndicator isOpen={open} />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-orang p-6 rounded-b-lg">
                      <p className="text-white md:pl-0 pl-8">{item.answer}</p>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}