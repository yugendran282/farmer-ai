import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface FarmerProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  district: string;
  state: string;
  preferredLanguage: string;
  landAcreage?: number;
  primaryCrops?: string[];
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: FarmerProfile | null;
  loading: boolean;
  isSupabaseActive: boolean;
  signUp: (email: string, pass: string, profileData: Partial<FarmerProfile>) => Promise<{ error: any }>;
  signIn: (email: string, pass: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<FarmerProfile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check demo user in localStorage if Supabase is not configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      const storedUser = localStorage.getItem('farmer_ai_demo_user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setProfile(parsed.profile);
          setUser(parsed.user);
        } catch (e) {
          console.error('Failed to parse local demo user:', e);
        }
      }
      setLoading(false);
      return;
    }

    // Initialize Supabase auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('farmer_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile({
          id: data.id,
          fullName: data.full_name,
          phoneNumber: data.phone_number,
          district: data.district,
          state: data.state,
          preferredLanguage: data.preferred_language,
          landAcreage: data.land_acreage,
          primaryCrops: data.primary_crops,
          createdAt: data.created_at,
        });
      }
    } catch (err) {
      console.error('Exception fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, profileData: Partial<FarmerProfile>) => {
    if (!isSupabaseConfigured || !supabase) {
      // Local demo fallback authentication mode
      const demoUser = {
        id: 'demo-farmer-' + Date.now(),
        email,
      } as User;
      const demoProfile: FarmerProfile = {
        id: demoUser.id,
        fullName: profileData.fullName || 'Demo Farmer',
        phoneNumber: profileData.phoneNumber || '9876543210',
        district: profileData.district || 'Coimbatore',
        state: profileData.state || 'Tamil Nadu',
        preferredLanguage: profileData.preferredLanguage || 'en',
        landAcreage: profileData.landAcreage || 5,
        primaryCrops: profileData.primaryCrops || ['Paddy', 'Tomato'],
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
      setProfile(demoProfile);
      localStorage.setItem('farmer_ai_demo_user', JSON.stringify({ user: demoUser, profile: demoProfile }));
      return { error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error) return { error };

    if (data.user) {
      const { error: profError } = await supabase.from('farmer_profiles').insert([
        {
          id: data.user.id,
          full_name: profileData.fullName,
          phone_number: profileData.phoneNumber,
          district: profileData.district,
          state: profileData.state,
          preferred_language: profileData.preferredLanguage || 'en',
          land_acreage: profileData.landAcreage || 0,
          primary_crops: profileData.primaryCrops || [],
        },
      ]);
      if (profError) {
        console.error('Error inserting farmer profile:', profError);
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, pass: string) => {
    if (!isSupabaseConfigured || !supabase) {
      const demoUser = {
        id: 'demo-farmer-1',
        email,
      } as User;
      const demoProfile: FarmerProfile = {
        id: demoUser.id,
        fullName: 'Demo Farmer',
        phoneNumber: '9876543210',
        district: 'Coimbatore',
        state: 'Tamil Nadu',
        preferredLanguage: 'en',
        landAcreage: 5,
        primaryCrops: ['Paddy', 'Tomato'],
      };
      setUser(demoUser);
      setProfile(demoProfile);
      localStorage.setItem('farmer_ai_demo_user', JSON.stringify({ user: demoUser, profile: demoProfile }));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    return { error };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('farmer_ai_demo_user');
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (profileData: Partial<FarmerProfile>) => {
    if (!user) return { error: 'No authenticated user' };

    if (!isSupabaseConfigured || !supabase) {
      const updated = { ...profile, ...profileData } as FarmerProfile;
      setProfile(updated);
      localStorage.setItem('farmer_ai_demo_user', JSON.stringify({ user, profile: updated }));
      return { error: null };
    }

    const { error } = await supabase.from('farmer_profiles').upsert({
      id: user.id,
      full_name: profileData.fullName,
      phone_number: profileData.phoneNumber,
      district: profileData.district,
      state: profileData.state,
      preferred_language: profileData.preferredLanguage,
      land_acreage: profileData.landAcreage,
      primary_crops: profileData.primaryCrops,
      updated_at: new Date().toISOString(),
    });

    if (!error) {
      await fetchProfile(user.id);
    }
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isSupabaseActive: isSupabaseConfigured,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
