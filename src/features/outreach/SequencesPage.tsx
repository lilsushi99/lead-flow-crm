import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Sequence } from '../../types/crm';
import { StatusBadge } from '../../components/shared/StatusBadge';

interface SequencesPageProps {
  sequences: Sequence[];
  setSequences: React.Dispatch<React.SetStateAction<Sequence[]>>;
}

export function SequencesPage({ sequences, setSequences }: SequencesPageProps) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'sequences' | 'followups'>('sequences');

  const filtered = useMemo(
    () =>
      sequences.filter(
        (s: Sequence) => !search || s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [sequences, search]
  );

  return (
    <div className="flex flex-col gap-[20px] max-w-[1440px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[12px]">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">Sequences & Follow-ups</h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-[2px]">
            Automate outreach steps. Simulated sequences.
          </p>
        </div>
        <button
          onClick={() => {
            const ns: Sequence = {
              id: `s${Date.now()}`,
              name: `New Sequence ${sequences.length + 1}`,
              audience: 'Lagos Technology Leads',
              status: 'Draft',
              steps: 2,
              enrolled: 0,
              performance: '-',
              lastActivity: 'Now',
              owner: 'Dominion Castiel',
            };
            setSequences([ns, ...sequences]);
          }}
          className="h-[40px] px-[18px] rounded-[10px] bg-[var(--primary)] text-[13px] font-semibold flex items-center gap-[8px] text-[#1B4D0F] cursor-pointer hover:bg-[var(--primary-hover)]"
        >
          <Plus size={16} />
          New Sequence
        </button>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-[14px] p-[4px] w-fit flex gap-[4px]">
        <button
          onClick={() => setTab('sequences')}
          className={`h-[32px] px-[14px] rounded-[10px] text-[13px] font-medium transition-all cursor-pointer ${
            tab === 'sequences' ? 'bg-[var(--text-primary)] text-white' : 'text-[var(--text-muted)]'
          }`}
        >
          Sequences
        </button>
        <button
          onClick={() => setTab('followups')}
          className={`h-[32px] px-[14px] rounded-[10px] text-[13px] font-medium transition-all cursor-pointer ${
            tab === 'followups' ? 'bg-[var(--text-primary)] text-white' : 'text-[var(--text-muted)]'
          }`}
        >
          Follow-ups
        </button>
      </div>

      {tab === 'sequences' ? (
        <div className="bg-white border border-[var(--border)] rounded-[14px] p-[16px]">
          <div className="relative max-w-[320px] mb-[14px]">
            <Search size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sequences..."
              className="w-full h-[38px] pl-[36px] rounded-[10px] bg-[var(--input-bg)] border border-transparent text-[13px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[12px]">
            {filtered.map((s: Sequence) => (
              <div key={s.id} className="border border-[var(--border)] rounded-[12px] p-[16px]">
                <div className="flex justify-between mb-[8px]">
                  <div className="font-medium text-[14px]">{s.name}</div>
                  <StatusBadge label={s.status} />
                </div>
                <div className="text-[12px] text-[var(--text-secondary)]">Audience: {s.audience}</div>
                <div className="mt-[8px] flex gap-[12px] text-[11px]">
                  <span>{s.steps} steps</span>
                  <span>{s.enrolled} enrolled</span>
                  <span>{s.performance}</span>
                </div>
                <div className="mt-[10px] text-[11px] text-[var(--text-muted)]">
                  {s.owner} • {s.lastActivity}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[var(--border)] rounded-[14px] p-[16px]">
          <div className="text-[14px] font-medium mb-[12px]">
            Follow-up tasks generated from sequences (simulated)
          </div>
          <div className="text-[12px] text-[var(--text-muted)]">
            Tasks due from sequences appear in Sales → Tasks & Activities. No real automation running.
          </div>
        </div>
      )}
    </div>
  );
}
