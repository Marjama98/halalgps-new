"use client";
import Navbar from "@/components/Navbar"; // Adjust the import path if necessary
import Footer from "@/components/footer"; // Import the footer correctly
import { FaPlus } from "react-icons/fa"; // Use only the FaPlus icon
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const faqData = [
  {
    question: 'What is Halal GPS?',
    answer: 'Halal GPS helps users find halal-friendly businesses near them, making it easier to navigate and discover halal options.',
  },
  {
    question: 'How do I use Halal GPS?',
    answer: 'You can search for halal restaurants, stores, and services based on your location. Just use the search bar on the homepage.',
  },
  {
    question: 'How are restaurants halal verified?',
    answer: 'Restaurants are verified by our team to ensure they meet halal standards before being listed.',
  },
  {
    question: 'Can I add a restaurant to Halal GPS?',
    answer: 'Yes! If you know of a halal restaurant that is not listed, you can submit it through our platform, and our team will verify its halal status before adding it.',
  },
  {
    question: 'How do I report an issue with a listing?',
    answer: 'If you find any incorrect information on a listing, you can report it through our platform, and our team will review and update the details as necessary.',
  },
  {
    question: 'Is there a mobile app for Halal GPS?',
    answer: 'Currently, Halal GPS is available through a responsive website, but we are working on developing a mobile app for a better experience.',
  },
  {
    question: 'Is Halal GPS Muslim owned?',
    answer: 'Yes, HalalGPS is proudly Muslim-owned!',
  },
];

const AboutUsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <section className="relative px-4 h-[580px]">
        <Image
          src="/images/about.jpg"
          alt="About Us"
          width={1280}
          height={700}
          className="absolute object-cover top-0 left-0 w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-[60px] font-bold leading-[75px] text-center font-[Poppins,Helvetica Neue,Helvetica,Arial,sans-serif] break-words mt-auto mb-6">
            HalalGPS connects people with <br /> great local businesses.
          </h1>
        </div>
      </section>

      <div className="px-32">
        {/* Feature Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
          <div className="flex flex-col items-center justify-center bg-white text-center p-6 rounded-lg">
            <Image
              src="/images/map.png"
              alt="Restaurant"
              width={70}
              height={70}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Restaurants</h3>
            <p>Easily find halal restaurants in your <br /> area with our map view.</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white text-center p-6 rounded-lg">
            <Image
              src="/images/rating.png"
              alt="Reviews"
              width={70}
              height={70}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Reviews</h3>
            <p>Check out the latest reviews of all <br />halal restaurants near you.</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white text-center p-6 rounded-lg">
            <Image
              src="/images/halal.png"
              alt="Halal"
              width={70}
              height={70}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Halal Verified</h3>
            <p>All restaurants are verified by HalalGPS so you can dine with ease.</p>
          </div>
        </section>
      </div>

      <section className="max-w-7xl px-20 py-16 ml-32 mr-32">
        {/* Content */}
      </section>

      {/* About Us Section */}
      <section className="max-w-7xl mx-auto px-20 py-10 mt-25">
        <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Spartan, sans-serif' }}> Halal Food Locator</h3>
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex-1">
            <p className="text-[rgb(66,71,103)] text-lg font-sans" style={{ fontFamily: 'Spartan, sans-serif' }}>
              Halal GPS is your go-to guide for discovering halal food places. <br />
              No more scrolling through endless social media accounts to 
              find <br />a halal place to eat at. With our extensive restaurant database, <br />you can locate 
              halal restaurants anywhere with a click of a button.
            </p>
          </div>
          {/* Image container */}
          <div className="lg:w-[350px] -mt-30 mx-20 h-auto">
            <Image
              src="/images/1pic.png"
              alt="About Us"
              width={350}
              height={350}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <h2 className="text-center text-[#6d7f43] text-4xl font-medium mb-6 lg:text-3xl lg:font-normal lg:mb-6 xl:text-4xl xl:font-normal xl:mb-6 mt-50" style={{ fontFamily: 'Spartan, sans-serif' }}>
        Frequently Asked Questions
      </h2>
      <p className="text-center text-xl text-[rgb(66,71,103)] mb-8" style={{ fontFamily: 'Spartan, sans-serif' }}>
        Have a question? Read through our FAQ below. If you can't find an answer, <br />please email our support team. We're here to help.
      </p>

      <section
        id="about-faq"
        className="mx-auto mt-8 px-4 py-4 max-w-full lg:max-w-[940px] mb-20 shadow-lg rounded-lg"
      >
        {faqData.map((faq, index) => (
          <div className="mb-8 border-b border-gray-300 pb-4" key={index}>
            <div
              className="flex justify-between items-center cursor-pointer gap-x-4"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-xl font-medium">{faq.question}</h3>
              <div className={`transition-all duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                <FaPlus className="text-[#6d7f43] text-xl transition-all duration-300" />
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[1000px]' : 'max-h-0'}`}
            >
              {activeIndex === index && <p className="mt-4 text-gray-500">{faq.answer}</p>}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
