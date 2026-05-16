// ============================================================
// VETSTRIP — Application Types
// Single source of truth dari skema SQL Supabase
// ============================================================

// --- Enums (harus sinkron dengan SQL ENUM) ---

export type DiagnosticStatus = "Normal" | "Suspect" | "Mastitis";

export type UdderConditionStatus = "Normal" | "Bengkak" | "Keras" | "Kemerahan";

export type MilkConditionStatus =
  | "Normal"
  | "Menggumpal"
  | "Encer"
  | "Flakes"
  | "Berdarah";

export type MilkProductionStatus = "Normal" | "Menurun" | "Berhenti";

export type CattleBreed =
  | "Friesian Holstein"
  | "Jersey"
  | "Brown Swiss"
  | "Ayrshire"
  | "Guernsey"
  | "Peranakan Ongole"
  | "Lainnya";

export type CattleStatus = "Active" | "Sick" | "Dry" | "Sold" | "Deceased";

export type PhotoType = "before_test" | "after_test" | "udder_close" | "general";

// --- Database Row Types ---

export interface Cattle {
  id: string;
  tag_number: string;
  name: string;
  breed: CattleBreed;
  birth_date: string; // ISO date string
  status: CattleStatus;
  created_at: string;
  updated_at: string;
}

export interface TestRecord {
  id: string;
  cattle_id: string;
  tester_id: string;
  diagnostic_result: DiagnosticStatus;
  ph_level: number;
  raw_rgb_data: RGBData | null;
  udder_condition: UdderConditionStatus;
  milk_condition: MilkConditionStatus;
  milk_production: MilkProductionStatus;
  barn_keeper_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TestPhoto {
  id: string;
  test_record_id: string;
  photo_url: string;
  photo_type: PhotoType;
  created_at: string;
}

// --- Nested / Composite Types ---

export interface RGBData {
  r: number;
  g: number;
  b: number;
  raw_value?: string;
  timestamp?: string;
}

/** TestRecord lengkap dengan relasi ke Cattle */
export interface TestRecordWithCattle extends TestRecord {
  cattle: Pick<Cattle, "id" | "tag_number" | "name" | "breed">;
}

/** TestRecord lengkap dengan foto-fotonya */
export interface TestRecordWithPhotos extends TestRecord {
  test_photos: TestPhoto[];
}

// --- UI / View Types (bukan dari DB, tapi dipakai di Presentation) ---

export interface DashboardStats {
  totalCattle: number;
  activeCattle: number;
  testsToday: number;
  mastitisCases: number;
  suspectCases: number;
  normalCases: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string; // nama icon Lucide
  badge?: number; // untuk notifikasi count
}

// --- Helper / Utility Types ---

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export type SortDirection = "asc" | "desc";

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface CattleFilters {
  status?: CattleStatus;
  breed?: CattleBreed;
  search?: string;
}

export interface TestRecordFilters {
  diagnosticResult?: DiagnosticStatus;
  dateFrom?: string;
  dateTo?: string;
  cattleId?: string;
}
