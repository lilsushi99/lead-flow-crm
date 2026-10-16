import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Delivery } from '../../types/crm';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Dropdown } from '../../components/shared/Dropdown';

interface EmailDeliveriesPageProps {
  deliveries: Delivery[];
}

export function EmailDeliveriesPage({ deliveries }: EmailDeliveriesPageProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(
    () =>
      deliveries.filter((d: Delivery) => {
        if (
          search &&
          !`${d.recipient} ${d.email} ${d.campaign}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          return false;
        if (statusFilter !== 'All' && d.status !== statusFilter) return false;
        return true;
      }),
    [deliveries, search, statusFilter]
  );

  const total = deliveries.length;
  const delivered = deliveries.filter((d: Delivery) => d.status === 'Delivered').length;
  const bounced = deliveries.filter((d: Delivery) => d.status === 'Bounced').length;
  const failed = deliveries.filter((d: Delivery) => d.status === 'Failed').length;

  return (
    <div className="flex flex-col gap-[20px] max-w-[1440px]">
      <div>
        <h1 className="text-[24px] font-semibold tracking-tight">Email Deliveries</h1>
        <p className="text-[14px] text-[var(--text-secondary)] mt-[2px]">
          Monitor delivery status across campaigns. Simulated data.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[12px]">
        {[
          { label: 'Total', value: total },
          { label: 'Delivered', value: delivered },
          { label: 'Bounced', value: bounced },
          { label: 'Failed', value: failed },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[var(--border)] rounded-[12px] p-[14px]">
            <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-[0.06em]">{s.label}</div>
            <div className="text-[20px] font-semibold mt-[4px]">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[var(--border)] rounded-[14px] p-[16px]">
        <div className="flex flex-col lg:flex-row gap-[12px] justify-between mb-[14px]">
          <div className="relative w-full lg:max-w-[320px]">
            <Search size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipient, email, campaign..."
              className="w-full h-[38px] pl-[36px] rounded-[10px] bg-[var(--input-bg)] border border-transparent text-[13px] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div className="flex gap-[8px]">
            <Dropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={['All', 'Delivered', 'Bounced', 'Failed', 'Queued']}
            />
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
              }}
              className="h-[36px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px] hover:bg-[#EAECE8] cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="text-[11px] text-[var(--text-muted)] border-b border-[var(--border)]">
              <tr>
                <th className="text-left py-[8px]">Recipient</th>
                <th className="text-left">Campaign</th>
                <th className="text-left">Status</th>
                <th className="text-left">Time</th>
                <th className="text-left">Error</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d: Delivery) => (
                <tr key={d.id} className="border-b border-[#F3F5F2] text-[13px]">
                  <td className="py-[10px]">
                    <div className="font-medium">{d.recipient}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{d.email}</div>
                  </td>
                  <td className="text-[12px]">{d.campaign}</td>
                  <td>
                    <StatusBadge label={d.status} />
                  </td>
                  <td className="text-[12px] text-[var(--text-muted)]">{d.timestamp}</td>
                  <td className="text-[11px] text-[#B91C1C]">{d.error || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-[30px] text-center text-[13px] text-[var(--text-muted)]">
            No matching deliveries.
          </div>
        )}
      </div>
    </div>
  );
}
