import connectDB from '@/lib/mongodb';
import Itinerary from '@/models/Itinerary';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const getAllItineraries = async (searchParams: URLSearchParams) => {
  await connectDB();
  const user_id = searchParams.get('user_id');
  let query: any = {};
  if (user_id) query.user_id = user_id;
  return await Itinerary.find(query).sort({ createdAt: -1 });
};

export const generateItinerary = async (data: any) => {
  await connectDB();
  const { title, days, trip_type, interests, user_id } = data;

  const apiKey = process.env.GEMINI_API_KEY;
  let responseText;

  if (apiKey) {
    try {
      const prompt = `Create a ${days}-day ${trip_type} travel itinerary for Vagad region (Banswara & Dungarpur), Rajasthan. 
      Interests: ${interests.join(', ')}. 
      Return ONLY a JSON object with this structure: { "title": "...", "summary": "...", "days": [{ "day": 1, "theme": "...", "activities": [{ "time": "...", "name": "...", "description": "...", "type": "...", "location": "...", "duration": "..." }], "meals": { "breakfast": "...", "lunch": "...", "dinner": "..." }, "stay_suggestion": "...", "tips": "..." }], "packing_tips": [], "best_time_to_visit": "...", "estimated_budget_per_person": "..." }`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
    } catch (err) {
      console.warn("AI failed, using mock");
    }
  }

  if (!responseText) {
    responseText = JSON.stringify({
      title: `Perfect ${days}-Day ${trip_type} Trip to Vagad`,
      summary: `Experience the hidden gems of Banswara and Dungarpur with this carefully curated ${trip_type} itinerary.`,
      days: Array.from({ length: days }).map((_, i) => ({
        day: i + 1,
        theme: i === 0 ? "Heritage & Culture" : "Nature & Exploration",
        stay_suggestion: "Traditional Heritage Homestay",
        tips: "Carry comfortable walking shoes and a water bottle.",
        meals: { breakfast: "Poha & Tea", lunch: "Dal Baati Churma", dinner: "Local Tribal Thali" },
        activities: [
          { time: "Morning", name: "Tripura Sundari Temple", description: "Visit the ancient and powerful Shakti Peeth.", location: "Banswara", type: "temple", duration: "2 hours" },
          { time: "Afternoon", name: "Juna Mahal", description: "Explore the stunning frescoes and architecture.", location: "Dungarpur", type: "heritage", duration: "3 hours" },
          { time: "Evening", name: "Mahi Backwaters", description: "Enjoy a peaceful sunset by the lake.", location: "Banswara", type: "nature", duration: "2 hours" }
        ]
      })),
      packing_tips: ["Light cotton clothes", "Sunscreen", "Camera"],
      estimated_budget_per_person: "₹4000 - ₹7000"
    });
  }
  
  const cleanedJson = responseText.replace(/```json\n?|\n?```/g, '').trim();

  return await Itinerary.create({
    user_id,
    title,
    days,
    trip_type,
    interests,
    generated_plan: cleanedJson,
    is_public: false
  });
};
