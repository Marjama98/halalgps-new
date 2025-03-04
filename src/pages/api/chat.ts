// src/pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from 'next';

const predefinedAnswers = [
  {
    question: ["where can i find halal restaurants", "halal restaurants near me", "halal places to eat", "halal food near me", "halal food places", "halal food locations", "halal food", "halal restaurants", "halal"],
    answer: "You can find halal restaurants near you by using the search function in the app. We have a list of halal places in your area!"
  },
  {
    question: ["is this restaurant halal", "restaurant halal", "is this halal", "halal certification"],
    answer: "We only list halal-certified restaurants in our app. However, please verify with the restaurant directly if you're unsure."
  },
  {
    question: ["vegan halal restaurants", "vegetarian halal", "halal vegan options"],
    answer: "Yes, there are vegan and vegetarian-friendly halal restaurants listed in the app. Check the specific restaurant for more details."
  },
  {
    question: ["how can i contact you", "contact us", "how do i reach you"],
    answer: "You can contact us via email at support@halalgps.com or through the contact form on our website."
  },
  {
    question: ["about us", "who are we", "what is this app", "what do you do", "what is halalgps", "what is halal gps","who are you","halalgps"],
    answer: "HalalGPS helps you find halal-certified restaurants around you. We aim to make it easier for people to find halal food wherever they are."
  },
  {
    question: ["hello", "hi", "hey", "greetings", "hi there"],
    answer: "Hello! How can I assist you today?"
  },
  {
    question: ["how are you", "how's it going", "how are you doing", "what's up"],
    answer: "I'm just a bot, but I'm doing great! How can I help you?"
  },
  {
    question: ["are you a bot", "are you real", "are you human", "are you an AI"],
    answer: "Yes, I am a bot, powered by AI, here to help you with halal food queries!"
  },
  {
    question: ["thank you", "thanks", "thanks a lot"],
    answer: "You're welcome! Feel free to ask anything else."
  },
  {
    question: ["goodbye", "bye", "see you", "take care"],
    answer: "Goodbye! Take care and have a great day!"
  },
    {
        question: ["help", "need help", "can you help me", "support"],
        answer: "Sure! How can I assist you today?"
    },
    {
        question: ["what is halal", "halal definition", "what does halal mean", "halal food"],
        answer: "Halal refers to what is permissible or lawful in traditional Islamic law. Halal food is prepared according to Islamic dietary guidelines."
    },
    {
        question: ["what is haram", "haram definition", "what does haram mean", "haram food"],
        answer: "Haram refers to what is forbidden or unlawful in traditional Islamic law. Haram food is not permissible to consume."
    },
    {
        question: ["halal meat", "halal chicken", "halal beef", "halal lamb", "halal goat", "halal meat products"],
        answer: "Halal meat comes from animals that are slaughtered according to Islamic law. The process involves reciting a blessing and ensuring the animal is treated humanely."
    },
    {
        question: ["halal certification", "what is halal certification", "halal certifying bodies", "halal logo"],
        answer: "Halal certification is a process by which a product or service is verified to be halal-compliant by a recognized certifying body. Look for the halal logo on packaging."
    },
    {
        question: ["halal ingredients", "halal food ingredients", "halal food additives", "halal food products"], 
        answer: "Halal ingredients are those that are permissible to consume according to Islamic dietary guidelines. Check the packaging for a list of ingredients."
    },
    {
        question: ["halal restaurants in [city]", "halal food in [city]", "halal places in [city]", "halal dining in [city]"],
        answer: "You can find halal restaurants in your city by using the search function in the app. We have a list of halal places in various cities!"
    },
    {
        question: ["halal fast food", "halal burgers", "halal pizza", "halal fried chicken", "halal fast food chains"],
        answer: "Yes, there are halal fast food options available. Check the app for a list of halal fast food chains near you."
    },
    {
        question: ["halal desserts", "halal sweets", "halal bakeries", "halal cakes", "halal ice cream"],
        answer: "There are halal dessert options available. Check the app for a list of halal bakeries and sweet shops near you."
    },
    {
        question: ["halal buffet", "halal all-you-can-eat", "halal buffet restaurants", "halal food buffet"],
        answer: "Yes, there are halal buffet options available. Check the app for a list of halal buffet restaurants near you."
    },
    {
        question: ["halal catering", "halal event catering", "halal party catering", "halal wedding catering"],
        answer: "Yes, there are halal catering services available. Check the app for a list of halal caterers for your event."
    },
    {
        question: ["halal delivery", "halal food delivery", "halal home delivery", "halal online ordering"],
        answer: "Yes, there are halal food delivery options available. Check the app for a list of halal restaurants that offer delivery services."
},
{
  question: ["ok", "okay", "alright", "got it", "understood"],
  answer: "Great! Let me know if you have any other questions."
},
{
  question: ["how do i use this app", "how to find halal restaurants", "how to search for halal places", "how to navigate the app"],
  answer: "To find halal restaurants, simply enter your location in the search bar. You can also filter by cuisine type, price range, and more!"
},
{
  question: ["halal food recommendations", "best halal restaurants", "top halal places", "popular halal food spots"],
  answer: "Check out our list of top-rated halal restaurants in the app. You can also read reviews and ratings from other users!"
},
{
  question: ["halal food blog", "halal food articles", "halal food news", "halal food updates"],
  answer: "Stay updated on the latest halal food trends and news by visiting our blog section in the app. We cover a wide range of topics!"
},
{
  question: ["thnklm", "thnks", "thx", "thnx", "tq", "ty", "thanks", "thank you"],
  answer: "You're welcome! Let me know if you need any more help."
},
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const { message } = req.body;
        console.log("Received message:", message);
  
        let responseMessage = "Sorry, I couldn't understand that. Could you please rephrase?";
        
        for (const qa of predefinedAnswers) {
          for (const question of qa.question) {
            if (message.toLowerCase().includes(question.toLowerCase())) {
              responseMessage = qa.answer;
              break;
            }
          }
        }
  
        if (responseMessage === "Sorry, I couldn't understand that. Could you please rephrase?") {
          responseMessage = "Sorry, we couldn't find an answer to your question. Please send us an email at support@halalgps.com, and we'll get back to you. Thank you for understanding!";
        }
  
        console.log("Response Message:", responseMessage);
        res.status(200).json({ response: responseMessage });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ response: "Something went wrong. Please try again later." });
      }
    } else {
      console.log("Invalid method:", req.method);
      res.status(405).json({ response: "Method not allowed" });
    }
  }