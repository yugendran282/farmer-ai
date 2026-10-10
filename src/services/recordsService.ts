import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface FarmRecordItem {
  id: string;
  farmerId?: string;
  cropName: string;
  fieldName: string;
  activityType: 'sowing' | 'irrigation' | 'fertilization' | 'pest_control' | 'harvest';
  costIncurred: number;
  yieldAmountQuintals: number;
  notes: string;
  recordDate: string;
  createdAt?: string;
}

export interface FarmingReminderItem {
  id: string;
  farmerId?: string;
  title: string;
  category: 'watering' | 'fertilizing' | 'planting' | 'harvesting' | 'spraying';
  dueDate: string;
  isCompleted: boolean;
  notes?: string;
  createdAt?: string;
}

const LOCAL_RECORDS_KEY = 'farmer_ai_local_records';
const LOCAL_REMINDERS_KEY = 'farmer_ai_local_reminders';

export const recordsService = {
  // ==========================================
  // FARM RECORDS
  // ==========================================
  async getRecords(farmerId?: string): Promise<FarmRecordItem[]> {
    if (isSupabaseConfigured && supabase && farmerId) {
      try {
        const { data, error } = await supabase
          .from('farming_records')
          .select('*')
          .eq('farmer_id', farmerId)
          .order('record_date', { ascending: false });

        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            farmerId: item.farmer_id,
            cropName: item.crop_name,
            fieldName: item.field_name,
            activityType: item.activity_type,
            costIncurred: Number(item.cost_incurred || 0),
            yieldAmountQuintals: Number(item.yield_amount_quintals || 0),
            notes: item.notes || '',
            recordDate: item.record_date,
            createdAt: item.created_at,
          }));
        }
      } catch (err) {
        console.error('Error fetching records from Supabase:', err);
      }
    }

    // LocalStorage fallback
    const stored = localStorage.getItem(LOCAL_RECORDS_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }

    // Default sample record if empty
    return [
      {
        id: 'rec-1',
        cropName: 'Paddy (BPT 5204)',
        fieldName: 'North Field Block A',
        activityType: 'fertilization',
        costIncurred: 2450,
        yieldAmountQuintals: 0,
        notes: 'Applied 50kg DAP + 25kg MOP at tillering stage.',
        recordDate: new Date().toISOString().split('T')[0],
      },
    ];
  },

  async addRecord(record: Omit<FarmRecordItem, 'id'>, farmerId?: string): Promise<FarmRecordItem> {
    const newItem: FarmRecordItem = {
      ...record,
      id: 'rec-' + Date.now(),
      farmerId,
    };

    if (isSupabaseConfigured && supabase && farmerId) {
      try {
        const { data, error } = await supabase
          .from('farming_records')
          .insert([
            {
              farmer_id: farmerId,
              crop_name: record.cropName,
              field_name: record.fieldName,
              activity_type: record.activityType,
              cost_incurred: record.costIncurred,
              yield_amount_quintals: record.yieldAmountQuintals,
              notes: record.notes,
              record_date: record.recordDate,
            },
          ])
          .select();

        if (!error && data && data.length > 0) {
          newItem.id = data[0].id;
        }
      } catch (err) {
        console.error('Error saving record to Supabase:', err);
      }
    }

    // Update local storage
    const current = await this.getRecords();
    const updated = [newItem, ...current];
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(updated));
    return newItem;
  },

  async deleteRecord(recordId: string, farmerId?: string): Promise<void> {
    if (isSupabaseConfigured && supabase && farmerId) {
      try {
        await supabase.from('farming_records').delete().eq('id', recordId);
      } catch (err) {
        console.error('Error deleting record from Supabase:', err);
      }
    }

    const current = await this.getRecords();
    const updated = current.filter(r => r.id !== recordId);
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(updated));
  },

  // ==========================================
  // FARMING REMINDERS
  // ==========================================
  async getReminders(farmerId?: string): Promise<FarmingReminderItem[]> {
    if (isSupabaseConfigured && supabase && farmerId) {
      try {
        const { data, error } = await supabase
          .from('farming_reminders')
          .select('*')
          .eq('farmer_id', farmerId)
          .order('due_date', { ascending: true });

        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            farmerId: item.farmer_id,
            title: item.title,
            category: item.category,
            dueDate: item.due_date,
            isCompleted: item.is_completed,
            notes: item.notes || '',
            createdAt: item.created_at,
          }));
        }
      } catch (err) {
        console.error('Error fetching reminders from Supabase:', err);
      }
    }

    const stored = localStorage.getItem(LOCAL_REMINDERS_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }

    // Default sample reminders
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    const in3days = new Date(today); in3days.setDate(in3days.getDate() + 3);

    return [
      {
        id: 'rem-1',
        title: 'Water Paddy Field Block B (Drip Canal)',
        category: 'watering',
        dueDate: tomorrow.toISOString().split('T')[0],
        isCompleted: false,
        notes: 'Check main valve pressure before turning on motor.',
      },
      {
        id: 'rem-2',
        title: 'Apply Neem Oil Spray on Tomato Crops',
        category: 'spraying',
        dueDate: in3days.toISOString().split('T')[0],
        isCompleted: false,
        notes: 'Prevent leaf miner infestation.',
      },
    ];
  },

  async addReminder(reminder: Omit<FarmingReminderItem, 'id'>, farmerId?: string): Promise<FarmingReminderItem> {
    const newItem: FarmingReminderItem = {
      ...reminder,
      id: 'rem-' + Date.now(),
      farmerId,
    };

    if (isSupabaseConfigured && supabase && farmerId) {
      try {
        const { data, error } = await supabase
          .from('farming_reminders')
          .insert([
            {
              farmer_id: farmerId,
              title: reminder.title,
              category: reminder.category,
              due_date: reminder.dueDate,
              is_completed: reminder.isCompleted,
              notes: reminder.notes,
            },
          ])
          .select();

        if (!error && data && data.length > 0) {
          newItem.id = data[0].id;
        }
      } catch (err) {
        console.error('Error adding reminder to Supabase:', err);
      }
    }

    const current = await this.getReminders();
    const updated = [...current, newItem];
    localStorage.setItem(LOCAL_REMINDERS_KEY, JSON.stringify(updated));
    return newItem;
  },

  async toggleReminderComplete(reminderId: string, isCompleted: boolean, farmerId?: string): Promise<void> {
    if (isSupabaseConfigured && supabase && farmerId) {
      try {
        await supabase
          .from('farming_reminders')
          .update({ is_completed: isCompleted })
          .eq('id', reminderId);
      } catch (err) {
        console.error('Error toggling reminder in Supabase:', err);
      }
    }

    const current = await this.getReminders();
    const updated = current.map(r => r.id === reminderId ? { ...r, isCompleted } : r);
    localStorage.setItem(LOCAL_REMINDERS_KEY, JSON.stringify(updated));
  },

  async deleteReminder(reminderId: string, farmerId?: string): Promise<void> {
    if (isSupabaseConfigured && supabase && farmerId) {
      try {
        await supabase.from('farming_reminders').delete().eq('id', reminderId);
      } catch (err) {
        console.error('Error deleting reminder from Supabase:', err);
      }
    }

    const current = await this.getReminders();
    const updated = current.filter(r => r.id !== reminderId);
    localStorage.setItem(LOCAL_REMINDERS_KEY, JSON.stringify(updated));
  },
};
