"use client";
import Navbar from "@/components/Navbar"; // Juster importstien hvis nødvendig
import Footer from "@/components/footer"; // Importer footeren
import "./aboutus.css"; // Pass på at CSS-stien er riktig
import { FaPlus } from "react-icons/fa"; // Kun FaPlus-ikonet
import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const icons = document.querySelectorAll(".icon-transition");
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        icon.classList.toggle("active");
      });
    });

    return () => {
      icons.forEach((icon) => {
        icon.removeEventListener("click", () => {
          icon.classList.toggle("active");
        });
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="aboutus-hero relative mb-8">
        <img
          src="/images/about.jpg"
          alt="About Us"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Halal GPS connects people with great local businesses.
          </h1>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-6 p-6 lg:p-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
        <div className="text-center">
          <div className="mb-4">
            <img src="/images/reviews.png" alt="Reviews" className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Reviews</h3>
          <p className="text-gray-500">
            Check out the latest reviews of all <br />halal restaurants near you.
          </p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <img src="/images/map.png" alt="Restaurants" className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Restaurants</h3>
          <p className="text-gray-500">
            Easily find halal restaurants in your <br />area with our map view.
          </p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <img src="/images/halal.png" alt="Halal Verification" className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Halal Verified</h3>
          <p className="text-gray-500">
            We only feature verified halal restaurants <br />so you can dine with ease and peace of mind.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="mt-2 p-2 lg:p-12 bg-white mb-5">
        <div className="about-title max-w-4xl mx-auto p-6 bg-white rounded-lg">
          <h1 className="about-title text-center text-2xl font-semibold my-6 mb-8">
            A Better Way to Find Halal
          </h1>
          <p className="about-text text-gray-500 text-center">
            Our purpose is to make halal food easy to find and more accessible. No more scrolling through endless social media accounts to find a halal place to eat at.
            With our amazing map view, you can find halal restaurants anywhere in the world with a click of a button.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <h2 className="faq-title text-center text-2xl font-semibold mt-0 mb-8">
        Facts & Questions
      </h2>

      <div className="faq-container px-6 py-10 bg-white mx-auto my-10 max-w-3xl">
        {[
          {
            question: "What is the mission of HalalGPS?",
            answer:
              "Our mission is to provide a quick and easy way to find halal food. So no matter where you are, you will always know where you can find halal food.",
          },
          {
            question: "How do we know if a restaurant is truly halal?",
            answer:
              "We have a dedicated team that manually verifies all restaurants. We ensure each restaurant provides valid halal certification, confirm halal practices directly with the owners, and regularly monitor and update listings.",
          },
          {
            question: "Is HalalGPS Muslim-owned?",
            answer: "Yes, HalalGPS is proudly Muslim-owned.",
          },
          {
            question: "Where is HalalGPS available?",
            answer:
              "HalalGPS is currently available in Scandinavia. We focus on providing halal restaurant listings in countries like Sweden, Norway, and Denmark, and we're working on expanding to more locations soon!",
          },
        ].map((faq, index) => (
          <div key={index} className="faq-item border-b border-gray-200 mb-6">
            <div
              className="flex justify-between items-start cursor-pointer text-gray-600"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-xl font-medium">{faq.question}</h3>
              <div className={`icon-transition ${activeIndex === index ? "active" : ""}`}>
                <FaPlus className="text-muted-green text-xl transition-all duration-300" />
              </div>
            </div>
            {activeIndex === index && <p className="mt-4 text-gray-500">{faq.answer}</p>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
