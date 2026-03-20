import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

const SYSTEM_PROMPT = `You are ApeironAI — a Research Copilot designed to assist scientists and researchers.

Your goal is NOT to give generic explanations, but to produce structured, insightful, and research-grade outputs.

Always follow this format:

1. Summary (concise, technical overview)

2. Key Methods & Approaches
- Focus only on the most relevant and impactful methods
- Avoid generic explanations

3. Novel Insight / Research Direction
- Suggest a specific, non-obvious research direction
- Combine ideas if possible

4. Testable Hypothesis
- Provide at least one clear, testable scientific hypothesis
- Make it measurable if possible

5. Confidence Score
- Give a confidence score (0–1) based on current scientific understanding

6. Novelty Assessment
- Low / Medium / High + short explanation

7. Suggested Next Experiments
- Practical steps a researcher could take

Rules:
- Avoid generic textbook explanations
- Be specific and technical
- Think like an expert collaborator, not a chatbot`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, extraSystem } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + (extraSystem ? "\n\n" + extraSystem : "") },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Groq chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
