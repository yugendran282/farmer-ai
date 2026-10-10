import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  Info,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { PracticeCriterion } from '../types';
import { INITIAL_PRACTICES } from '../data/mockData';

interface CropScoreSectionProps {
  onPreviewEvidence: (practice: PracticeCriterion) => void;
}

export const CropScoreSection: React.FC<CropScoreSectionProps> = ({ onPreviewEvidence }) => {
  const [practices, setPractices] = useState<PracticeCriterion[]>(INITIAL_PRACTICES);

  // Calculate current score
  const totalScore = practices.reduce((acc, curr) => {
    return acc + (curr.completed ? curr.earnedPoints : 0);
  }, 0);

  const togglePractice = (id: string) => {
    setPractices((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newCompleted = !p.completed;
          return {
            ...p,
            completed: newCompleted,
            status: newCompleted ? 'verified' : 'not_submitted',
          };
        }
        return p;
      })
    );
  };

  // SVG Circular Meter Math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <section id="crop-rewards" className="py-20 lg:py-28 bg-white border-b border-[#143D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1B5E20] mb-3">
            <span>Crop Intelligence Score & Rewards</span>
            <span aria-hidden="true">·</span>
            <span>Practice Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251D] font-serif leading-[1.18] mb-4 text-balance">
            Better Farming Practices Deserve Recognition.
          </h2>
          <p className="text-base sm:text-lg text-[#69786E] leading-relaxed">
            FARMERS AI helps farmers document recommended farming practices and build a transparent crop-practice score that participating buyers may use to provide additional incentives.
          </p>
        </div>

        {/* Top Grid: Circular Score Visualizer + Workflow Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          {/* Circular Score Visualizer (Col-span 5) */}
          <div className="lg:col-span-5 bg-[#143D2B] text-white rounded-3xl p-8 border border-white/10 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#4CAF50]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between w-full mb-6 text-xs text-white/70">
                <span className="uppercase tracking-widest text-[#F2C14E] font-semibold">
                  Live Farm Audit
                </span>
                <span className="font-mono">Paddy Batch #KA-24</span>
              </div>

              {/* Animated SVG Circular Meter */}
              <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {/* Active Progress */}
                  <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    stroke="#F2C14E"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                    {totalScore}
                  </span>
                  <span className="text-xs text-white/70 uppercase tracking-wider font-medium mt-0.5">
                    out of 100
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-white/10 px-4 py-2 rounded-xl mb-4 text-xs font-semibold text-[#DDF3E4] flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
                <span>
                  {totalScore >= 80
                    ? 'Eligible for Participating Buyer Premium'
                    : totalScore >= 60
                    ? 'Standard Practice Verified'
                    : 'Basic Registration Tier'}
                </span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Interactive score recalculates dynamically as you toggle completed farming criteria below.
              </p>

              <div className="text-[11px] text-white/50 border-t border-white/10 pt-3 text-left">
                *Incentives are determined independently by participating commercial buyers based on their individual procurement specifications.
              </div>
            </div>
          </div>

          {/* Reward Workflow Journey (Col-span 7) */}
          <div className="lg:col-span-7 bg-[#F7F6EF] rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-2">
                The Recognition Engine
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] font-serif mb-6">
                Transparent 5-Stage Reward Lifecycle
              </h3>

              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Recommended Practice Adopted',
                    desc: 'Farmer implements soil-test dosage, micro-irrigation, or approved biological crop inputs.',
                  },
                  {
                    step: '02',
                    title: 'Evidence Submitted',
                    desc: 'Farmer uploads geotagged photo, lab test receipt, or links soil health card via mobile app.',
                  },
                  {
                    step: '03',
                    title: 'Digital & Agronomic Validation',
                    desc: 'Automated satellite NDVI verification or certified field inspector verification.',
                  },
                  {
                    step: '04',
                    title: 'Crop Points Awarded',
                    desc: 'Verified practice points added to the farm profile and public crop traceability dossier.',
                  },
                  {
                    step: '05',
                    title: 'Buyer Incentive Eligibility',
                    desc: 'Exporters and quality millers review verifiable score and apply agreed premium upon harvest pickup.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3 bg-white rounded-xl border border-gray-200/70"
                  >
                    <span className="font-mono text-xs font-bold text-[#143D2B] bg-[#DDF3E4] px-2.5 py-1 rounded-md shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#17251D] mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#69786E] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Practice Criteria Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-1">
                Interactive Audit Checklist
              </div>
              <h3 className="text-2xl font-bold text-[#17251D] font-serif">
                Documented Farm Practices
              </h3>
            </div>
            <div className="text-xs text-[#69786E]">
              Click checkboxes to test dynamic score recalculation
            </div>
          </div>

          <div className="space-y-4">
            {practices.map((practice) => (
              <div
                key={practice.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  practice.completed
                    ? 'bg-[#F7F6EF] border-[#1B5E20]/40'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <input
                    type="checkbox"
                    id={practice.id}
                    checked={practice.completed}
                    onChange={() => togglePractice(practice.id)}
                    className="w-5 h-5 accent-[#1B5E20] rounded mt-0.5 cursor-pointer shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <label
                        htmlFor={practice.id}
                        className="text-sm font-bold text-[#17251D] cursor-pointer hover:text-[#1B5E20]"
                      >
                        {practice.title}
                      </label>
                      <span className="text-[11px] text-[#69786E]">
                        ({practice.category})
                      </span>
                    </div>
                    <p className="text-xs text-[#69786E] leading-relaxed mb-2">
                      {practice.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#69786E]">
                      <span>
                        <strong className="text-[#17251D]">Required Proof:</strong> {practice.evidenceRequirement}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        <strong className="text-[#17251D]">Verification:</strong> {practice.verificationMethod}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-base font-bold font-mono text-[#143D2B] tabular-nums">
                      {practice.completed ? `+${practice.earnedPoints}` : `0`}
                    </span>
                    <span className="text-xs text-[#69786E] block font-mono">
                      / {practice.maxPoints} pts
                    </span>
                  </div>

                  <button
                    onClick={() => onPreviewEvidence(practice)}
                    className="px-3 py-1.5 bg-white border border-gray-300 hover:border-gray-400 text-[#17251D] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    View Criteria
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Incentive Explanatory Policy Card */}
        <div className="bg-[#DDF3E4] rounded-2xl p-6 border border-[#1B5E20]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#1B5E20] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#143D2B] leading-relaxed">
              <strong className="font-bold">Transparent Incentive Policy:</strong> Crop practice points establish objective stewardship documentation. Actual buyer incentives vary by processor, procurement contract, crop grade, and prevailing market prices. Practice points do not replace physical produce grading.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
