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

export interface AuthResult {
  error: string | null;
  requiresEmailConfirmation?: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: FarmerProfile | null;
  loading: boolean;
  isSupabaseActive: boolean;
  signUp: (email: string, pass: string, profileData: Partial<FarmerProfile>) => Promise<AuthResult>;
  signIn: (email: string, pass: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<FarmerProfile>) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (currentUser: User) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('farmer_profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (!error && data) {
        setProfile({
          id: data.id,
          fullName: data.full_name,
          phoneNumber: data.phone_number,
          district: data.district,
          state: data.state,
          preferredLanguage: data.preferred_language || 'en',
          landAcreage: data.land_acreage,
          primaryCrops: data.primary_crops,
          createdAt: data.created_at,
        });
      } else {
        // Fallback to user_metadata saved during signup if DB record is pending
        const meta = currentUser.user_metadata || {};
        setProfile({
          id: currentUser.id,
          fullName: meta.full_name || currentUser.email?.split('@')[0] || 'Farmer',
          phoneNumber: meta.phone_number || '',
          district: meta.district || 'Coimbatore',
          state: meta.state || 'Tamil Nadu',
          preferredLanguage: meta.preferred_language || 'en',
          landAcreage: meta.land_acreage || 5,
        });

        // Ensure record exists in DB when session is active
        await supabase.from('farmer_profiles').upsert({
          id: currentUser.id,
          full_name: meta.full_name || currentUser.email?.split('@')[0] || 'Farmer',
          phone_number: meta.phone_number || '',
          district: meta.district || 'Coimbatore',
          state: meta.state || 'Tamil Nadu',
          preferred_language: meta.preferred_language || 'en',
          land_acreage: meta.land_acreage || 5,
        });
      }
    } catch (err) {
      console.error('Exception fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, profileData: Partial<FarmerProfile>): Promise<AuthResult> => {
    if (!isSupabaseConfigured || !supabase) {
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

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: {
            full_name: profileData.fullName,
            phone_number: profileData.phoneNumber,
            district: profileData.district,
            state: profileData.state,
            land_acreage: profileData.landAcreage,
            preferred_language: profileData.preferredLanguage || 'en',
          },
        },
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          return { error: 'Email send rate limit reached. Please check your inbox or try again shortly.' };
        }
        if (error.message.includes('already registered')) {
          return { error: 'This email is already registered. Please sign in instead.' };
        }
        return { error: error.message };
      }

      if (data.user && !data.session) {
        // Email confirmation is required by Supabase auth configuration
        return { error: null, requiresEmailConfirmation: true };
      }

      if (data.user && data.session) {
        // Email confirmation is disabled; session is active immediately
        await fetchProfile(data.user);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Registration failed. Please check network connection.' };
    }
  };

  const signIn = async (email: string, pass: string): Promise<AuthResult> => {
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Invalid email or password. If you recently registered, please confirm your email first.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: 'Your email is not confirmed yet. Please check your inbox for the confirmation link.' };
        }
        return { error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Failed to connect to authentication server.' };
    }
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

  const updateProfile = async (profileData: Partial<FarmerProfile>): Promise<AuthResult> => {
    if (!user) return { error: 'No authenticated user' };

    if (!isSupabaseConfigured || !supabase) {
      const updated = { ...profile, ...profileData } as FarmerProfile;
      setProfile(updated);
      localStorage.setItem('farmer_ai_demo_user', JSON.stringify({ user, profile: updated }));
      return { error: null };
    }

    try {
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
        await fetchProfile(user);
      }
      return { error: error ? error.message : null };
    } catch (err: any) {
      return { error: err.message || 'Profile update failed.' };
    }
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
