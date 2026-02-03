import { supabase } from "@/integrations/supabase/client";

export interface FortnitePlayerStats {
  account: {
    id: string;
    name: string;
  };
  battlePass: {
    level: number;
    progress: number;
  };
  stats: {
    all: {
      overall: {
        wins: number;
        kills: number;
        deaths: number;
        kd: number;
        winRate: number;
        matches: number;
        minutesPlayed: number;
        top10: number;
        top25: number;
      };
    };
  };
}

export interface FortniteShopItem {
  mainId: string;
  displayName: string;
  displayType: string;
  mainType: string;
  rarity: {
    value: string;
    displayValue: string;
  };
  displayAssets: Array<{
    url: string;
  }>;
  price: {
    regularPrice: number;
    finalPrice: number;
  };
}

export const fortniteApi = {
  async getPlayerStats(username: string): Promise<{ success: boolean; data?: FortnitePlayerStats; error?: string }> {
    const { data, error } = await supabase.functions.invoke("fortnite-api", {
      body: { username, type: "stats" },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return data;
  },

  async getItemShop(): Promise<{ success: boolean; data?: any; error?: string }> {
    const { data, error } = await supabase.functions.invoke("fortnite-api", {
      body: { type: "shop" },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return data;
  },
};
