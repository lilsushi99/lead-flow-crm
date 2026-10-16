import React, { useState, useMemo } from 'react';
import { Plus, Search, Eye, Trash2, X } from 'lucide-react';
import { Deal, DealStage, SalesTaskPriority, Lead, Activity, Meeting } from '../../types/crm';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Dropdown } from '../../components/shared/Dropdown';
import { dealStages, stageProbability } from '../../data/mock/sales';
import { branches, users } from '../../data/mock/leads';

interface DealsPageProps {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  leads: Lead[];
  activities: Activity[];
  meetings: Meeting[];
}

export function DealsPage({
  deals,
  setDeals,
  leads,
  activities,
  meetings,
}: DealsPageProps) {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newDeal, setNewDeal] = useState({
    name: '',
    company: '',
    value: '',
    stage: 'New Opportunity' as DealStage,
    owner: users[0],
    branch: branches[1],
    expectedCloseDate: new Date().toISOString().split('T')[0],
    priority: 'Medium' as SalesTaskPriority,
  });

  const filtered = useMemo(() => {
    return deals.filter((d: Deal) => {
      if (
        search &&
        !`${d.name} ${d.company} ${d.leadName}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (stageFilter !== 'All' && d.stage !== stageFilter) return false;
      if (ownerFilter !== 'All' && d.owner !== ownerFilter) return false;
      if (branchFilter !== 'All' && d.branch !== branchFilter) return false;
      if (stateFilter === 'Won' && d.stage !== 'Closed Won') return false;
      if (stateFilter === 'Lost' && d.stage !== 'Closed Lost') return false;
      if (stateFilter === 'Open' && ['Closed Won', 'Closed Lost'].includes(d.stage))
        return false;
      return true;
    });
  }, [deals, search, stageFilter, ownerFilter, branchFilter, stateFilter]);

  const handleAdd = () => {
    if (!newDeal.name || !newDeal.company || !newDeal.value) return;
    const lead = leads.find((l: Lead) => l.company === newDeal.company) || leads[0];
    const deal: Deal = {
      id: `deal-${Date.now()}`,
      name: newDeal.name,
      leadId: lead?.id || 'lead-1',
      company: newDeal.company,
      leadName: lead ? `${lead.firstName} ${lead.lastName}` : 'Prospective Lead',
      value: Number(newDeal.value),
      currency: 'USD',
      stage: newDeal.stage,
      probability: stageProbability[newDeal.stage],
      expectedCloseDate: newDeal.expectedCloseDate,
      owner: newDeal.owner,
      branch: newDeal.branch,
      description: `Opportunity for ${newDeal.company}`,
      createdAt: 'Now',
      lastActivityAt: 'Now',
      priority: newDeal.priority,
    };
    setDeals([deal, ...deals]);
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col gap-[18px] max-w-[1440px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[12px]">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">Deals</h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-[2px]">
            Review and manage sales opportunities across your workspace.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="h-[40px] px-[18px] rounded-[10px] bg-[var(--primary)] text-[#1B2D15] text-[14px] font-semibold flex items-center gap-[8px] hover:bg-[var(--primary-hover)] cursor-pointer"
        >
          <Plus size={16} />
          Add Deal
        </button>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-[14px] p-[14px] flex flex-col lg:flex-row gap-[10px] justify-between">
        <div className="relative w-full lg:max-w-[280px]">
          <Search size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deal, contact, company..."
            className="w-full h-[38px] pl-[36px] rounded-[10px] bg-[var(--input-bg)] border border-transparent text-[13px] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div className="flex flex-wrap gap-[8px]">
          <Dropdown value={stageFilter} onChange={setStageFilter} options={['All', ...dealStages]} />
          <Dropdown value={stateFilter} onChange={setStateFilter} options={['All', 'Open', 'Won', 'Lost']} />
          <Dropdown value={ownerFilter} onChange={setOwnerFilter} options={['All', ...users]} />
          <Dropdown value={branchFilter} onChange={setBranchFilter} options={['All', ...branches.slice(1)]} />
          <button
            onClick={() => {
              setSearch('');
              setStageFilter('All');
              setOwnerFilter('All');
              setBranchFilter('All');
              setStateFilter('All');
            }}
            className="h-[36px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px] hover:bg-[#EAECE8] cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-[14px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="text-[11px] text-[var(--text-muted)] bg-[#FBFDFB] border-b border-[var(--border)]">
              <tr>
                <th className="text-left p-[10px]">Deal Name</th>
                <th className="text-left">Lead / Contact</th>
                <th className="text-left">Company</th>
                <th className="text-left">Stage</th>
                <th className="text-left">Value</th>
                <th className="text-left">Prob</th>
                <th className="text-left">Expected Close</th>
                <th className="text-left">Owner</th>
                <th className="text-left">Branch</th>
                <th className="text-left">Last Activity</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d: Deal) => (
                <tr key={d.id} className="border-b border-[#F3F5F2] hover:bg-[#FBFBF9] text-[13px]">
                  <td className="p-[10px]">
                    <button
                      onClick={() => setSelectedDeal(d)}
                      className="font-medium hover:underline text-left cursor-pointer"
                    >
                      {d.name}
                    </button>
                  </td>
                  <td className="text-[12px]">{d.leadName}</td>
                  <td className="text-[12px]">{d.company}</td>
                  <td>
                    <StatusBadge label={d.stage} />
                  </td>
                  <td className="font-medium text-[12px]">
                    ${d.value.toLocaleString()} {d.currency}
                  </td>
                  <td className="text-[11px]">{d.probability}%</td>
                  <td className="text-[11px] text-[var(--text-muted)]">{d.expectedCloseDate}</td>
                  <td className="text-[11px]">{d.owner.split(' ')[0]}</td>
                  <td className="text-[11px]">{d.branch.replace(' Branch', '')}</td>
                  <td className="text-[11px] text-[var(--text-muted)]">{d.lastActivityAt}</td>
                  <td>
                    <div className="flex gap-[6px]">
                      <button
                        onClick={() => setSelectedDeal(d)}
                        className="h-[28px] w-[28px] rounded-[8px] bg-[var(--input-bg)] flex items-center justify-center cursor-pointer"
                        aria-label="View deal details"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={() => setDeals(deals.filter((x: Deal) => x.id !== d.id))}
                        className="h-[28px] w-[28px] rounded-[8px] bg-[var(--input-bg)] flex items-center justify-center cursor-pointer"
                        aria-label="Delete deal"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-[30px] text-center text-[13px] text-[var(--text-muted)]">
            No matching deals. Clear filters.
          </div>
        )}
      </div>

      {selectedDeal && (
        <div
          className="fixed inset-0 z-[60] flex justify-end bg-black/20"
          onClick={() => setSelectedDeal(null)}
        >
          <div
            className="w-full max-w-[440px] bg-white h-full overflow-auto p-[20px] border-l border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-[14px]">
              <div>
                <div className="font-semibold">{selectedDeal.name}</div>
                <div className="text-[12px] text-[var(--text-muted)]">
                  {selectedDeal.company} • {selectedDeal.leadName}
                </div>
              </div>
              <button
                onClick={() => setSelectedDeal(null)}
                className="p-[6px] bg-[var(--input-bg)] rounded-[8px] cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex gap-[8px] mb-[12px]">
              <StatusBadge label={selectedDeal.stage} />
              <span className="text-[11px] px-[8px] py-[2px] rounded-full bg-[var(--input-bg)]">
                {selectedDeal.probability}% • ${selectedDeal.value.toLocaleString()}
              </span>
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-[12px]">{selectedDeal.description}</div>
            <div className="text-[11px] font-medium mb-[6px]">Related Activities</div>
            <div className="flex flex-col gap-[6px] mb-[12px]">
              {activities
                .filter((a: Activity) => a.dealId === selectedDeal.id)
                .map((a: Activity) => (
                  <div
                    key={a.id}
                    className="text-[11px] border border-[var(--border)] rounded-[8px] p-[8px] flex justify-between"
                  >
                    <span>
                      {a.type}: {a.summary}
                    </span>
                    <span className="text-[var(--text-muted)]">{a.occurredAt}</span>
                  </div>
                ))}
              {activities.filter((a: Activity) => a.dealId === selectedDeal.id).length === 0 && (
                <div className="text-[11px] text-[var(--text-muted)]">No activities yet.</div>
              )}
            </div>
            <div className="text-[11px] font-medium mb-[6px]">Related Meetings</div>
            <div className="flex flex-col gap-[6px]">
              {meetings
                .filter((m: Meeting) => m.dealId === selectedDeal.id)
                .map((m: Meeting) => (
                  <div
                    key={m.id}
                    className="text-[11px] border border-[var(--border)] rounded-[8px] p-[8px] flex justify-between"
                  >
                    <span>
                      {m.title} • {m.status}
                    </span>
                    <span className="text-[var(--text-muted)]">{m.dateLabel}</span>
                  </div>
                ))}
              {meetings.filter((m: Meeting) => m.dealId === selectedDeal.id).length === 0 && (
                <div className="text-[11px] text-[var(--text-muted)]">No meetings linked.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-[16px]">
          <div className="w-full max-w-[520px] bg-white rounded-[16px] p-[20px] border border-[var(--border)] max-h-[90vh] overflow-auto">
            <div className="flex justify-between mb-[14px]">
              <div className="font-semibold">Add Deal</div>
              <button onClick={() => setShowAdd(false)} className="cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-[12px]">
              <div>
                <label className="text-[12px] font-medium text-[var(--text-primary)] block mb-[4px]">Deal Name *</label>
                <input
                  value={newDeal.name}
                  onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
                  placeholder="e.g. Annual Enterprise Subscription"
                  className="w-full h-[40px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:border-[#76E05B] focus:ring-[2px] focus:ring-[#EFFBEA]"
                />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[var(--text-primary)] block mb-[4px]">Company *</label>
                <input
                  value={newDeal.company}
                  onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
                  placeholder="Company name"
                  className="w-full h-[40px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:border-[#76E05B] focus:ring-[2px] focus:ring-[#EFFBEA]"
                />
              </div>
              <div className="grid grid-cols-2 gap-[10px]">
                <div>
                  <label className="text-[12px] font-medium text-[var(--text-primary)] block mb-[4px]">Value (USD) *</label>
                  <input
                    type="number"
                    value={newDeal.value}
                    onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                    placeholder="25000"
                    className="w-full h-[40px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:border-[#76E05B] focus:ring-[2px] focus:ring-[#EFFBEA]"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-[var(--text-primary)] block mb-[4px]">Expected Close</label>
                  <input
                    type="date"
                    value={newDeal.expectedCloseDate}
                    onChange={(e) => setNewDeal({ ...newDeal, expectedCloseDate: e.target.value })}
                    className="w-full h-[40px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:border-[#76E05B] focus:ring-[2px] focus:ring-[#EFFBEA]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[10px]">
                <div>
                  <label className="text-[12px] font-medium text-[var(--text-primary)] block mb-[4px]">Stage</label>
                  <Dropdown
                    value={newDeal.stage}
                    onChange={(v: string) => setNewDeal({ ...newDeal, stage: v as DealStage })}
                    options={dealStages}
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-[var(--text-primary)] block mb-[4px]">Owner</label>
                  <Dropdown
                    value={newDeal.owner}
                    onChange={(v: string) => setNewDeal({ ...newDeal, owner: v })}
                    options={users}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[14px] flex justify-end gap-[8px]">
              <button
                onClick={() => setShowAdd(false)}
                className="h-[36px] px-[14px] rounded-[10px] bg-[var(--input-bg)] text-[13px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="h-[36px] px-[14px] rounded-[10px] bg-[var(--primary)] text-[13px] font-semibold text-[#1B4D0F] cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
