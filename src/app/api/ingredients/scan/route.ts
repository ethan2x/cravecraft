
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Please log in to scan a photo." },
        { status: 401 }
      );
    }

    const { image } = await request.json();

    if (
      typeof image !== "string" ||
      !/^data:image\/(jpeg|png|webp);base64,/.test(image) ||
      image.length > 2_800_000
    ) {
      return NextResponse.json(
        { error: "Photo is too large. Please choose a smaller image." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Photo scanning is not configured." },
        { status: 503 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 250,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'Identify visible food ingredients in the image. Return JSON only: {"ingredients":["ingredient 1","ingredient 2"]}. Do not guess hidden ingredients, quantities, or brands. If no food is visible, return an empty array.',
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "List the food ingredients you can identify in this photo.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
                detail: "low",
              },
            },
          ],
        },
      ],
    });

    const result = JSON.parse(
      completion.choices[0]?.message?.content || "{}"
    );

    const ingredients = Array.isArray(result.ingredients)
      ? result.ingredients
          .filter(
            (item: unknown): item is string =>
              typeof item === "string"
          )
          .map((item: string) => item.trim().slice(0, 60))
          .filter(Boolean)
          .slice(0, 30)
      : [];

    return NextResponse.json({ ingredients });
  } catch (error) {
    console.error("Photo scanning failed:", error);
    return NextResponse.json(
      { error: "Could not scan photo. Please try again." },
      { status: 500 }
    );
  }
}
