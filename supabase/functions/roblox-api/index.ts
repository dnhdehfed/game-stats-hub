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
    const { type, query } = await req.json();

    if (type === "user") {
      // Get user by username
      const usersResponse = await fetch(
        `https://users.roblox.com/v1/usernames/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usernames: [query], excludeBannedUsers: true }),
        }
      );
      const usersData = await usersResponse.json();

      if (!usersData.data || usersData.data.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "User not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const userId = usersData.data[0].id;
      const username = usersData.data[0].name;
      const displayName = usersData.data[0].displayName;

      // Get user profile info
      const profileResponse = await fetch(`https://users.roblox.com/v1/users/${userId}`);
      const profileData = await profileResponse.json();

      // Get friends count
      const friendsResponse = await fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`);
      const friendsData = await friendsResponse.json();

      // Get followers count
      const followersResponse = await fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`);
      const followersData = await followersResponse.json();

      // Get following count
      const followingResponse = await fetch(`https://friends.roblox.com/v1/users/${userId}/followings/count`);
      const followingData = await followingResponse.json();

      // Get user's inventory (limited items for RAP)
      const inventoryResponse = await fetch(
        `https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?limit=50&sortOrder=Desc`
      );
      const inventoryData = await inventoryResponse.json();

      // Calculate RAP
      let totalRap = 0;
      const inventory = inventoryData.data || [];
      inventory.forEach((item: any) => {
        if (item.recentAveragePrice) {
          totalRap += item.recentAveragePrice;
        }
      });

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            id: userId,
            username,
            displayName,
            description: profileData.description,
            created: profileData.created,
            friends: friendsData.count || 0,
            followers: followersData.count || 0,
            following: followingData.count || 0,
            rap: totalRap,
            inventory: inventory.slice(0, 12),
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (type === "game") {
      // Search for games
      const searchResponse = await fetch(
        `https://games.roblox.com/v1/games/list?keyword=${encodeURIComponent(query)}&maxRows=1`
      );
      const searchData = await searchResponse.json();

      if (!searchData.games || searchData.games.length === 0) {
        // Try searching via universe ID if it's a number
        if (!isNaN(Number(query))) {
          const universeResponse = await fetch(
            `https://games.roblox.com/v1/games?universeIds=${query}`
          );
          const universeData = await universeResponse.json();

          if (universeData.data && universeData.data.length > 0) {
            return new Response(
              JSON.stringify({ success: true, data: universeData.data[0] }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        }

        return new Response(
          JSON.stringify({ success: false, error: "Game not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const game = searchData.games[0];

      // Get detailed game info
      const gameResponse = await fetch(
        `https://games.roblox.com/v1/games?universeIds=${game.universeId}`
      );
      const gameData = await gameResponse.json();

      return new Response(
        JSON.stringify({
          success: true,
          data: gameData.data?.[0] || game,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (type === "popular") {
      // Get popular games
      const response = await fetch(
        "https://games.roblox.com/v1/games/list?sortToken=&gameFilter=1&maxRows=12"
      );
      const data = await response.json();

      return new Response(
        JSON.stringify({ success: true, data: data.games || [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid request type" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in roblox-api:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
