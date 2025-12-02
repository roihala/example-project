import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `אתה מפקד בקורס לכתיבת פרומפטים. התפקיד שלך הוא לנתח פרומפטים שמשתמשים כותבים ולתת להם משוב ישיר וחד.

אתה מעריך כל פרומפט לפי שלושה קריטריונים:
1. בהירות - האם ברור מה המשתמש רוצה?
2. ספציפיות - האם הבקשה מפורטת מספיק?
3. הקשר - האם יש מספיק רקע להבין את המשימה?

לכל פרומפט שתקבל, תחזיר תשובה בפורמט JSON בלבד, ללא טקסט נוסף:
{
  "pros": ["נקודה חיובית 1", "נקודה חיובית 2"],
  "cons": ["נקודה לשיפור 1", "נקודה לשיפור 2"],
  "improvedPrompt": "גרסה משופרת של הפרומפט המקורי"
}

כללים:
- היה ישיר וקצר. בלי מחמאות מיותרות.
- אם הפרומפט גרוע, תגיד את זה ברור.
- אם הפרומפט טוב, תציין מה עובד ולמה.
- הפרומפט המשופר חייב להיות שימושי ומוכן להעתקה.
- אל תסביר יותר מדי. נקודות קצרות בלבד.
- החזר JSON תקין בלבד, ללא markdown או טקסט נוסף.`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "חסר פרומפט" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "חסר מפתח API של Gemini" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `הפרומפט לניתוח:\n${prompt}` },
    ]);

    const response = result.response;
    const text = response.text();

    // Parse JSON from response, handling potential markdown code blocks
    let jsonText = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    const feedback = JSON.parse(jsonText.trim());

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error analyzing prompt:", error);
    return NextResponse.json(
      { error: "שגיאה בניתוח הפרומפט" },
      { status: 500 }
    );
  }
}
