// ============================================================
// VETSTRIP — Cattle Service (Data Access Layer)
// Menangani semua operasi CRUD ke tabel 'cattles'
// ============================================================
import { createClient } from "@/lib/supabase/client";

// ── 1. TYPE DEFINITIONS & ENUMS ──────────────────────────────
// Menyamakan persis dengan ENUM di database PostgreSQL kita

export type CattleBreed =
  | "Friesian Holstein (FH)"
  | "Jersey"
  | "Brown Swiss"
  | "Ayrshire"
  | "Guernsey"
  | "Peranakan Friesian Holstein (PFH)";

export type CattleHealthStatus = "Healthy" | "Monitoring" | "Sick";

// Model Database Utama
export interface Cattle {
  id: string;
  tag_number: string;
  name: string | null;
  breed: CattleBreed;
  birth_date: string; // Format: YYYY-MM-DD
  status: CattleHealthStatus;
  created_at: string;
}

// DTO (Data Transfer Object) untuk Insert
export type CreateCattleDTO = Omit<Cattle, "id" | "created_at">;

// DTO untuk Update (Semua field opsional)
export type UpdateCattleDTO = Partial<CreateCattleDTO>;

// ── 2. SERVICE LAYER (BUSINESS LOGIC) ────────────────────────

export const CattleService = {
  /**
   * Mengambil semua data sapi, diurutkan dari yang terbaru
   */
  async getAllCattles() {
    const supabase = await createClient();
    
    // Secara otomatis Supabase mengembalikan { data, error }
    const { data, error } = await supabase
      .from("cattles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[CattleService] getAllCattles Error:", error.message);
      return { data: null, error };
    }

    // Type casting ke interface kita agar UI punya autocomplete
    return { data: data as Cattle[], error: null };
  },

  /**
   * Mengambil detail satu sapi berdasarkan ID
   */
  async getCattleById(id: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("cattles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[CattleService] getCattleById Error:", error.message);
      return { data: null, error };
    }

    return { data: data as Cattle, error: null };
  },

  /**
   * Menambahkan data sapi baru ke database
   */
  async createCattle(payload: CreateCattleDTO) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("cattles")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("[CattleService] createCattle Error:", error.message);
      return { data: null, error };
    }

    return { data: data as Cattle, error: null };
  },

  /**
   * Mengupdate data sapi berdasarkan ID
   */
  async updateCattle(id: string, payload: UpdateCattleDTO) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("cattles")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[CattleService] updateCattle Error:", error.message);
      return { data: null, error };
    }

    return { data: data as Cattle, error: null };
  },

  /**
   * Menghapus data sapi secara permanen (Cascade delete akan otomatis 
   * menghapus data di test_records berkat constraint PostgreSQL)
   */
  async deleteCattle(id: string) {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("cattles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[CattleService] deleteCattle Error:", error.message);
      return { success: false, error };
    }

    return { success: true, error: null };
  },
};