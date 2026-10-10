-- =========================================================================
-- FARMER AI - COMPLETE SUPABASE DATABASE MIGRATION & RLS POLICIES
-- =========================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Farmer Profiles Table
CREATE TABLE IF NOT EXISTS farmer_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  preferred_language TEXT DEFAULT 'en',
  land_acreage NUMERIC DEFAULT 0,
  primary_crops TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Farm Details Table
CREATE TABLE IF NOT EXISTS farm_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  land_acreage NUMERIC NOT NULL CHECK (land_acreage > 0),
  soil_type TEXT NOT NULL,
  irrigation_source TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Crops Table (Market Data)
CREATE TABLE IF NOT EXISTS crops (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  hindi_name TEXT,
  variety TEXT,
  season TEXT,
  standard_unit TEXT DEFAULT 'quintal',
  reference_price NUMERIC NOT NULL,
  price_unit TEXT DEFAULT '₹ / quintal',
  day_change_percent NUMERIC DEFAULT 0,
  msp_government NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Crop Recommendations Table
CREATE TABLE IF NOT EXISTS crop_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nitrogen_n NUMERIC,
  phosphorus_p NUMERIC,
  potassium_k NUMERIC,
  ph_level NUMERIC,
  soil_type TEXT NOT NULL,
  location TEXT NOT NULL,
  season TEXT NOT NULL,
  irrigation_available TEXT NOT NULL,
  recommended_crops JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Farming Records Table
CREATE TABLE IF NOT EXISTS farming_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  field_name TEXT NOT NULL,
  activity_type TEXT NOT NULL, -- 'sowing', 'irrigation', 'fertilization', 'pest_control', 'harvest'
  cost_incurred NUMERIC DEFAULT 0,
  yield_amount_quintals NUMERIC DEFAULT 0,
  notes TEXT,
  record_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Disease Scan Records Table
CREATE TABLE IF NOT EXISTS disease_scan_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  image_url TEXT,
  crop_name TEXT,
  predicted_disease TEXT NOT NULL,
  confidence_percent NUMERIC,
  symptoms TEXT,
  organic_treatment TEXT,
  chemical_treatment TEXT,
  preventive_measures TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Farming Reminders Table
CREATE TABLE IF NOT EXISTS farming_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'watering', 'fertilizing', 'planting', 'harvesting', 'spraying'
  due_date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Buyer Offers Table
CREATE TABLE IF NOT EXISTS buyer_offers (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  buyer_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  crop_id TEXT REFERENCES crops(id),
  target_volume_quintals NUMERIC NOT NULL,
  offered_price_per_unit NUMERIC NOT NULL,
  quality_grade TEXT NOT NULL,
  payment_terms TEXT NOT NULL,
  verified_buyer BOOLEAN DEFAULT true,
  delivery_window TEXT NOT NULL,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_farm_details_farmer_id ON farm_details(farmer_id);
CREATE INDEX IF NOT EXISTS idx_crop_rec_farmer_id ON crop_recommendations(farmer_id);
CREATE INDEX IF NOT EXISTS idx_farming_records_farmer_id ON farming_records(farmer_id);
CREATE INDEX IF NOT EXISTS idx_disease_scans_farmer_id ON disease_scan_records(farmer_id);
CREATE INDEX IF NOT EXISTS idx_farming_reminders_farmer_id ON farming_reminders(farmer_id);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE farming_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_scan_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE farming_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_offers ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read on crops" ON crops FOR SELECT USING (true);
CREATE POLICY "Allow public read on buyer_offers" ON buyer_offers FOR SELECT USING (true);

-- farmer_profiles RLS
CREATE POLICY "Farmers can view own profile" ON farmer_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Farmers can insert own profile" ON farmer_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Farmers can update own profile" ON farmer_profiles FOR UPDATE USING (auth.uid() = id);

-- farm_details RLS
CREATE POLICY "Farmers can view own farm details" ON farm_details FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can manage own farm details" ON farm_details FOR ALL USING (auth.uid() = farmer_id);

-- crop_recommendations RLS
CREATE POLICY "Farmers can view own crop recommendations" ON crop_recommendations FOR SELECT USING (auth.uid() = farmer_id OR farmer_id IS NULL);
CREATE POLICY "Farmers can insert crop recommendations" ON crop_recommendations FOR INSERT WITH CHECK (auth.uid() = farmer_id OR farmer_id IS NULL);

-- farming_records RLS
CREATE POLICY "Farmers can view own records" ON farming_records FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can insert own records" ON farming_records FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Farmers can update own records" ON farming_records FOR UPDATE USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can delete own records" ON farming_records FOR DELETE USING (auth.uid() = farmer_id);

-- disease_scan_records RLS
CREATE POLICY "Farmers can view own disease scans" ON disease_scan_records FOR SELECT USING (auth.uid() = farmer_id OR farmer_id IS NULL);
CREATE POLICY "Farmers can insert disease scans" ON disease_scan_records FOR INSERT WITH CHECK (auth.uid() = farmer_id OR farmer_id IS NULL);

-- farming_reminders RLS
CREATE POLICY "Farmers can view own reminders" ON farming_reminders FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can insert own reminders" ON farming_reminders FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Farmers can update own reminders" ON farming_reminders FOR UPDATE USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can delete own reminders" ON farming_reminders FOR DELETE USING (auth.uid() = farmer_id);

-- =========================================================================
-- INITIAL SEED DATA FOR CROPS
-- =========================================================================
INSERT INTO crops (id, name, hindi_name, variety, season, reference_price, day_change_percent, msp_government)
VALUES 
  ('paddy', 'Paddy (Rice)', 'धान', 'BPT 5204 (Samba Mahsuri)', 'Kharif / Rabi Harvest', 2350, 1.8, 2300),
  ('tomato', 'Tomato', 'टमाटर', 'Hybrid F1 Seminis / Shivam', 'Perennial Vegetable Cycle', 1840, -2.4, 0),
  ('onion', 'Onion (Red)', 'प्याज', 'Nasik Red Medium Bulbs', 'Rabi Late Harvest', 2180, 3.2, 0),
  ('maize', 'Maize (Yellow Corn)', 'मक्का', 'Pioneer 3396 Hybrid Feed Grade', 'Kharif Harvest Post-Monsoon', 2090, 0.6, 2225),
  ('groundnut', 'Groundnut (Peanut)', 'मूंगफली', 'TAG 24 Pods in Shell', 'Kharif Oilseed Harvest', 6450, 1.1, 6780)
ON CONFLICT (id) DO NOTHING;
