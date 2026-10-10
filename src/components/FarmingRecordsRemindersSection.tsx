import React, { useState, useEffect } from 'react';
import { ClipboardList, Bell, Plus, CheckCircle2, Trash2, Calendar, DollarSign, Sprout, Tag } from 'lucide-react';
import { recordsService, FarmRecordItem, FarmingReminderItem } from '../services/recordsService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const FarmingRecordsRemindersSection: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'records' | 'reminders'>('records');

  // State for Farm Records
  const [records, setRecords] = useState<FarmRecordItem[]>([]);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [newCropName, setNewCropName] = useState('Paddy (Rice)');
  const [newFieldName, setNewFieldName] = useState('Field Block A');
  const [newActivityType, setNewActivityType] = useState<FarmRecordItem['activityType']>('fertilization');
  const [newCost, setNewCost] = useState(1500);
  const [newYield, setNewYield] = useState(0);
  const [newNotes, setNewNotes] = useState('');

  // State for Reminders
  const [reminders, setReminders] = useState<FarmingReminderItem[]>([]);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newRemTitle, setNewRemTitle] = useState('');
  const [newRemCategory, setNewRemCategory] = useState<FarmingReminderItem['category']>('watering');
  const [newRemDueDate, setNewRemDueDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newRemNotes, setNewRemNotes] = useState('');

  const loadAll = async () => {
    try {
      const recs = await recordsService.getRecords(user?.id);
      setRecords(recs);

      const rems = await recordsService.getReminders(user?.id);
      setReminders(rems);
    } catch (err) {
      console.error('Error loading records and reminders:', err);
    }
  };

  useEffect(() => {
    loadAll();
  }, [user]);

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    await recordsService.addRecord(
      {
        cropName: newCropName,
        fieldName: newFieldName,
        activityType: newActivityType,
        costIncurred: newCost,
        yieldAmountQuintals: newYield,
        notes: newNotes,
        recordDate: new Date().toISOString().split('T')[0],
      },
      user?.id
    );
    setShowAddRecordModal(false);
    setNewNotes('');
    loadAll();
  };

  const handleDeleteRecord = async (id: string) => {
    await recordsService.deleteRecord(id, user?.id);
    loadAll();
  };

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRemTitle.trim()) return;

    await recordsService.addReminder(
      {
        title: newRemTitle.trim(),
        category: newRemCategory,
        dueDate: newRemDueDate,
        isCompleted: false,
        notes: newRemNotes,
      },
      user?.id
    );
    setShowAddReminderModal(false);
    setNewRemTitle('');
    setNewRemNotes('');
    loadAll();
  };

  const handleToggleReminder = async (id: string, currentVal: boolean) => {
    await recordsService.toggleReminderComplete(id, !currentVal, user?.id);
    loadAll();
  };

  const handleDeleteReminder = async (id: string) => {
    await recordsService.deleteReminder(id, user?.id);
    loadAll();
  };

  return (
    <section id="records-reminders" className="py-16 bg-[#F7F6EF] border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143D2B]/10 text-[#143D2B] text-xs font-bold uppercase tracking-wider mb-4">
            <ClipboardList className="w-4 h-4 text-[#1B5E20]" />
            <span>Farm Operational Management</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17251D] tracking-tight">
            {t('records_title', 'Farm Management Records & Reminders')}
          </h2>
          <p className="mt-3 text-base text-[#17251D]/70">
            {t('records_subtitle', 'Track your expenses, crop cycles, irrigation schedules, and task reminders.')}
          </p>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-gray-200 shadow-xs flex gap-2">
            <button
              onClick={() => setActiveTab('records')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'records'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Farm Logs & Expense Records ({records.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'reminders'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Reminders & Irrigation Schedule ({reminders.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FARM RECORDS */}
        {activeTab === 'records' && (
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200">
              <h3 className="text-sm font-bold text-[#143D2B]">Field Activity & Input Expense Logs</h3>
              <button
                onClick={() => setShowAddRecordModal(true)}
                className="px-4 py-2 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Farm Record</span>
              </button>
            </div>

            {records.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-xs text-gray-500">
                No farm records logged yet. Click "Add Farm Record" to log sowing, fertilizer costs, or harvest yields.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {records.map((r) => (
                  <div key={r.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-start">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#17251D]">{r.cropName}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {r.activityType}
                        </span>
                      </div>
                      <p className="text-gray-500 font-semibold">{r.fieldName} • {r.recordDate}</p>
                      {r.notes && <p className="text-gray-700 bg-gray-50 p-2 rounded-lg text-[11px]">{r.notes}</p>}
                      <div className="flex gap-4 text-gray-600 font-medium pt-1">
                        <span>Cost: <strong>₹{r.costIncurred}</strong></span>
                        {r.yieldAmountQuintals > 0 && <span>Yield: <strong>{r.yieldAmountQuintals} qtl</strong></span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteRecord(r.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REMINDERS */}
        {activeTab === 'reminders' && (
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200">
              <h3 className="text-sm font-bold text-[#143D2B]">Scheduled Tasks & Irrigation Reminders</h3>
              <button
                onClick={() => setShowAddReminderModal(true)}
                className="px-4 py-2 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Reminder</span>
              </button>
            </div>

            {reminders.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-xs text-gray-500">
                No reminders scheduled. Click "Create Reminder" to set watering, fertilizing, or harvest notifications.
              </div>
            ) : (
              <div className="space-y-3">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className={`bg-white p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      rem.isCompleted ? 'border-gray-200 opacity-60 bg-gray-50/60' : 'border-[#143D2B]/20 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleReminder(rem.id, rem.isCompleted)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center cursor-pointer transition-colors ${
                          rem.isCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-gray-300 hover:border-emerald-600'
                        }`}
                      >
                        {rem.isCompleted && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <div>
                        <h4 className={`text-sm font-bold ${rem.isCompleted ? 'line-through text-gray-500' : 'text-[#17251D]'}`}>
                          {rem.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-0.5">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">{rem.category}</span>
                          <span>Due: {rem.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteReminder(rem.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Delete Reminder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal: Create Farm Record */}
        {showAddRecordModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-2xl border border-gray-200">
              <h3 className="text-base font-bold text-[#143D2B] mb-4">Add Field Operational Record</h3>
              <form onSubmit={handleCreateRecord} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Crop Name</label>
                  <input
                    type="text"
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B]"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Field Name / Block</label>
                  <input
                    type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Activity Type</label>
                    <select
                      value={newActivityType}
                      onChange={(e) => setNewActivityType(e.target.value as any)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] bg-white"
                    >
                      <option value="sowing">Sowing / Planting</option>
                      <option value="fertilization">Fertilization</option>
                      <option value="pest_control">Pest Control Spray</option>
                      <option value="irrigation">Irrigation</option>
                      <option value="harvest">Harvesting</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Cost Incurred (₹)</label>
                    <input
                      type="number"
                      value={newCost}
                      onChange={(e) => setNewCost(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Notes & Activity Details</label>
                  <textarea
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B]"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddRecordModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold rounded-xl"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Create Reminder */}
        {showAddReminderModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-2xl border border-gray-200">
              <h3 className="text-base font-bold text-[#143D2B] mb-4">Create Farming Task Reminder</h3>
              <form onSubmit={handleCreateReminder} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Reminder Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Water Block B Paddy Fields"
                    value={newRemTitle}
                    onChange={(e) => setNewRemTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Category</label>
                    <select
                      value={newRemCategory}
                      onChange={(e) => setNewRemCategory(e.target.value as any)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B] bg-white"
                    >
                      <option value="watering">Watering / Irrigation</option>
                      <option value="fertilizing">Fertilizing</option>
                      <option value="spraying">Pest Spraying</option>
                      <option value="planting">Planting</option>
                      <option value="harvesting">Harvesting</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newRemDueDate}
                      onChange={(e) => setNewRemDueDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Notes / Instructions</label>
                  <textarea
                    value={newRemNotes}
                    onChange={(e) => setNewRemNotes(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#143D2B]"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReminderModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#143D2B] hover:bg-[#1B5E20] text-white font-bold rounded-xl"
                  >
                    Create Reminder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
