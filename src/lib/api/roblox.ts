import { supabase } from "@/integrations/supabase/client";

export interface RobloxUser {
  id: number;
  username: string;
  displayName: string;
  description: string;
  created: string;
  friends: number;
  followers: number;
  following: number;
  rap: number;
  inventory: Array<{
    assetId: number;
    name: string;
    recentAveragePrice: number;
    assetStock: number;
  }>;
}

export interface RobloxGame {
  id: number;
  rootPlaceId: number;
  name: string;
  description: string;
  creator: {
    id: number;
    name: string;
    type: string;
  };
  playing: number;
  visits: number;
  maxPlayers: number;
  created: string;
  updated: string;
  favoritedCount: number;
}

export const robloxApi = {
  async getUser(username: string): Promise<{ success: boolean; data?: RobloxUser; error?: string }> {
    const { data, error } = await supabase.functions.invoke("roblox-api", {
      body: { type: "user", query: username },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return data;
  },

  async getGame(query: string): Promise<{ success: boolean; data?: RobloxGame; error?: string }> {
    const { data, error } = await supabase.functions.invoke("roblox-api", {
      body: { type: "game", query },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return data;
  },

  async getPopularGames(): Promise<{ success: boolean; data?: any[]; error?: string }> {
    const { data, error } = await supabase.functions.invoke("roblox-api", {
      body: { type: "popular" },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return data;
  },
};
