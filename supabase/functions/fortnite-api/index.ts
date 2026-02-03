import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FORTNITE_API_KEY = Deno.env.get("FORTNITE_API_KEY");
    if (!FORTNITE_API_KEY) {
      throw new Error("FORTNITE_API_KEY is not configured");
    }

    const { username, type } = await req.json();

    if (type === "stats") {
      // Fetch player stats
      const response = await fetch(
        `https://fortnite-api.com/v2/stats/br/v2?name=${encodeURIComponent(username)}`,
        {
          headers: {
            Authorization: FORTNITE_API_KEY,
          },
        }
      );

      const data = await response.json();

      if (data.status !== 200) {
        return new Response(
          JSON.stringify({ success: false, error: data.error || "Player not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: data.data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (type === "shop") {
      // Fetch item shop (no auth needed)
      const response = await fetch("https://fortnite-api.com/v2/shop/br");
      const data = await response.json();

      return new Response(
        JSON.stringify({ success: true, data: data.data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (type === "cosmetics") {
      // Search cosmetics for locker simulation
      const response = await fetch(
        `https://fortnite-api.com/v2/cosmetics/br/search/all?matchMethod=contains&name=${encodeURIComponent(username)}&language=en`
      );
      const data = await response.json();

      return new Response(
        JSON.stringify({ success: true, data: data.data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid request type" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in fortnite-api:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
