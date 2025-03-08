

export interface Message {
    text: string;
    sender: "user" | "bot"; // Assuming you're tracking who sent the message
    timestamp: number;
  }

export const responses = {
    "hello": "Hi there! How can I help you today?",
    "hi": "Hello! 😊 How can I assist you with halal food?",
    "hey": "Hey! Need help finding some halal food?",
    "good morning": "Good morning! Ready to find some halal food?",
    "good afternoon": "Good afternoon! How can I assist you with halal food?",
    "good evening": "Good evening! What halal food can I help you find today?",
    "how are you": "I'm doing great, thanks for asking! How can I assist you today?",
    "how are you doing": "I'm doing well! What can I help you with regarding halal food?",
    "bye": "Goodbye! Have a great day and enjoy your halal meal!",
    "goodbye": "Goodbye! Hope you found the best halal food! 😊",
    "see you": "See you soon! Let me know if you need help with halal food later!",
    "thanks": "You're welcome! 😊 Let me know if you need anything else.",
    "thank you": "You're welcome! I’m here whenever you need halal food help!",
    "what is halal": "Halal refers to food that is permissible under Islamic law. It excludes items like pork and alcohol.",
    "define halal": "Halal is a term in Islam that means something is lawful or permissible, including food.",
    "what foods are halal": "Halal foods include meats like chicken, beef, and lamb, provided they are slaughtered according to Islamic guidelines. Also, fruits, vegetables, and grains are halal!",
    "halal meat": "Halal meat comes from animals that are slaughtered according to Islamic law, ensuring ethical treatment and respect for the animal.",
    "can you eat halal food anywhere": "You can find halal food in many places, especially in countries with a Muslim population or multicultural cities.",
    "where to find halal restaurants": "You can use our website to find halal restaurants near you! Just search for your location and get recommendations.",
    "are there halal fast food options": "Yes! Many fast food chains offer halal options like chicken or beef burgers, especially in Muslim-majority countries.",
    "can i eat at a non-halal restaurant": "It depends on the restaurant. If they offer halal options and prepare them according to Islamic guidelines, it's fine. Just be sure to check!",
    "what is halal certification": "Halal certification ensures that the food you eat meets the requirements of Islamic law, including no pork or alcohol and proper slaughtering methods.",
    "can i get halal food delivery": "Yes! Many halal food restaurants offer delivery through apps or direct services. Check your local delivery apps for halal options.",
    "where can i get halal food near me": "Use our HalalGPS platform to find the best halal food options near you!",
    "how do i know if food is halal": "Look for halal certification labels, or ask the restaurant staff if the food is halal. Our platform can help with verified halal options!",
    "what are some halal snacks": "Some popular halal snacks include falafel, hummus with pita, samosas, and dates. Many packaged snacks also have halal certification!",
    "is sushi halal": "Sushi can be halal if it doesn't contain non-halal ingredients like pork or alcohol-based sauces. Vegetarian sushi or sushi with halal fish are good options.",
    "is halal food expensive": "Halal food can sometimes be more expensive due to the extra steps required for certification and slaughter, but it's available at many price points!",
    "how can i find halal food in my area": "You can use HalalGPS to find halal food options around your area easily! Just enter your location.",
    "is pizza halal": "Pizza can be halal if it's made with halal meat (like chicken, beef, or lamb) and no non-halal ingredients like pork or alcohol-based sauces.",
    "is chicken halal": "Chicken can be halal if it is slaughtered according to Islamic guidelines. Always check for halal certification!",
    "what is haram": "Haram refers to food or activities that are forbidden in Islam, such as pork and alcohol.",
    "can i eat at a halal restaurant if i'm not muslim": "Yes, anyone can eat at a halal restaurant. Halal food is just food that follows Islamic dietary laws, and it’s safe and delicious for everyone!",
    "is halal food healthy": "Halal food can be healthy, especially when it's made with fresh ingredients. It's important to choose well-balanced meals, like grilled meats with vegetables.",
    "is halal food only for muslims": "Halal food is not exclusive to Muslims; it’s just food prepared in accordance with Islamic dietary laws. Anyone can enjoy it!",
    "can i eat halal food during ramadan": "Yes, halal food is especially important during Ramadan, as Muslims fast from dawn till dusk and break their fast with halal meals.",
    "can halal food be vegan": "Yes! Vegan food can be halal if it doesn't contain any haram (forbidden) ingredients like alcohol or non-halal meat.",
    "what is the best halal restaurant": "It depends on your location! Use HalalGPS to find top-rated halal restaurants nearby.",
    "can you recommend a halal restaurant": "Sure! Use our platform to find the best halal restaurants based on your location and preferences!",
    "what is the difference between halal and kosher": "Halal and kosher are both dietary laws followed by Muslims and Jews, respectively. Both involve specific slaughtering methods, but there are differences in what is allowed (e.g., halal allows certain animals that kosher doesn't).",
    "how do i get halal certification": "You can contact a halal certifying body or organization that provides halal certification services for food businesses.",
    "how do i know if a restaurant is halal": "You can check if a restaurant is halal by asking the staff or looking for halal certification symbols on the menu or website.",
    "where can I find halal food online": "You can use HalalGPS to search for halal restaurants, food delivery, and online grocery stores that specialize in halal items.",
    "tell me a joke": "Why don't skeletons fight each other? They don't have the guts! 😂",
    "make me laugh": "Why did the tomato turn red? Because it saw the salad dressing! 😂",
    "tell me something funny": "Why did the bicycle fall over? Because it was two-tired! 😆",
    "can you sing": "I’m not great at singing, but I can help you find some good halal food! 🎶",
    "halal food near my area": "Enable location services or enter your location in the search bar to discover great halal food options nearby!",
    "who are you": "I am your friendly Halal GPS chatbot, here to help you find halal food and answer any questions you might have!",
    "what is your name": "I am HalalGPS Chatbot! How can I assist you today?",
    "what’s your favorite halal food": "I’m a fan of all types of food! But if I had to choose, I’d say Somali food, baris and hilib with banana on the side, yum!! 😋",
    "favorite food":"I’m a fan of all types of food! But if I had to choose, I’d say Somali food, baris and hilib with banana on the side, yum!!"
  
};
