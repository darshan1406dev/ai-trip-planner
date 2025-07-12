export const SelectTravelersList = [
  {
    id: 1,
    title: "Solo Traveler",
    desc: "Explore the world on your own terms, discover new places at your own pace.",
    icon: "🧍‍♂️",
    people: "1"
  },
  {
    id: 2,
    title: "Couple",
    desc: "Plan a romantic getaway or an adventurous trip with your partner.",
    icon: "❤️",
    people: "2"
  },
  {
    id: 3,
    title: "Family",
    desc: "Perfect for families looking for fun, safe, and memorable vacations.",
    icon: "👨‍👩‍👧‍👦",
    people: "4"
  },
  {
    id: 4,
    title: "Friends Group",
    desc: "Adventure and fun with your best buddies – from beach trips to road trips.",
    icon: "👯‍♂️",
    people: "3 to 10"
  },
  {
    id: 5,
    title: "Business",
    desc: "Plan professional trips with convenience and efficiency.",
    icon: "💼",
    people: "1 to 5"
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cost Effective",
    desc: "Affordable trips with essential experiences for cost-conscious travelers.",
    icon: "💸"
  },
  {
    id: 2,
    title: "Standard",
    desc: "Balanced travel experience with comfort, quality, and good value.",
    icon: "💰"
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium travel with top-tier stays, fine dining, and exclusive experiences.",
    icon: "💎"
  }
];

export const AI_PROMPT= `
Generate a detailed travel itinerary in **valid JSON format** for a trip to "{{location}}" for "{{noofdays}}" days, planned for "{{travelers}}" people with a "{{budget}}" budget (include cost values with currency).

Your response must contain a JSON object with these **three top-level keys**:
- "hotels": array of hotel objects(with many hotels)
- "itinerary": array of daily plans(many number of places within a day,like 3or 4 places dont give one or two place give more places,all the days need not have same number of places,even if one day has 2 places, another day can have 5 places)
- "cityImageUrl": a valid image URL representing the city

---

###  Use this exact structure and key names:

{
  "hotels": [
    {
      "hotelName": "",
      "address": "",
      "price": {
        "amount": 0,//price range like 40-60 for amount
        "currency": ""//mention like "USD" along with symbol in same field
      },
      "imageUrl": "", // must be a valid, real URL
      "geoCoordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": 0.0,
      "description": ""
    }
  ],

  "itinerary": [
    {
      "day": "Day 1",
      "places": [
        {
          "name": "",
          "description": "",
          "imageUrl": "", // must be a valid, real URL
          "geoCoordinates": {
            "latitude": 0.0,
            "longitude": 0.0
          },
          "ticketPrice": {
            "amount": 0,
            "currency": ""
          },
          "rating": 0.0,
          "bestTime": "HH:mm", // e.g., "15:00-17.00"
          "travelTime": "" // e.g., "20 minutes"
        }
      ]
    }
  ],

  "cityImageUrl": "https://..." // must be a valid city photo URL
}

---

###  Rules:
- Use the **exact key names** as above — no synonyms or alternate keys.
- All image URLs must be valid and real (no placeholders or broken links).
- All locations must include both latitude and longitude.
- Ensure "noofdays" days in itinerary with appropriate places to visit.
- "ticketPrice" and "price" must include **both amount and currency**.
- Return strictly **a valid JSON object** with no explanations or extra text.
`;

