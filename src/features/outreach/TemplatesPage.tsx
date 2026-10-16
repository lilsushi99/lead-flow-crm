import React, { useState, useMemo } from 'react';
import { Plus, Search, Trash2, X } from 'lucide-react';
import { Template } from '../../types/crm';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Dropdown } from '../../components/shared/Dropdown';

interface TemplatesPageProps {
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

export function TemplatesPage({ templates, setTemplates }: TemplatesPageProps) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [draft, setDraft] = useState({
    name: '',
    category: 'Sales',
    subject: '',
    body: '',
  });

  const filtered = useMemo(
    () =>
      templates.filter((t: Template) => {
        if (
          search &&
          !`${t.name} ${t.subject}`.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        if (cat !== 'All' && t.category !== cat) return false;
        return true;
      }),
    [templates, search, cat]
  );

  const handleSave = () => {
    if (!draft.name || !draft.subject) return;
    if (editing) {
      setTemplates(
        templates.map((t: Template) =>
          t.id === editing.id ? { ...t, ...draft, updated: 'Now' } : t
        )
      );
      setEditing(null);
    } else {
      const nt: Template = {
        id: `t${Date.now()}`,
        name: draft.name,
        category: draft.category,
        subject: draft.subject,
        body: draft.body,
        updated: 'Now',
        usage: 0,
      };
      setTemplates([nt, ...templates]);
    }
    setDraft({ name: '', category: 'Sales', subject: '', body: '' });
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col gap-[20px] max-w-[1440px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[12px]">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">Templates</h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-[2px]">
            Browse and manage email templates with tokens.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="h-[40px] px-[18px] rounded-[10px] bg-[var(--primary)] text-[13px] font-semibold flex items-center gap-[8px] text-[#1B4D0F] cursor-pointer hover:bg-[var(--primary-hover)]"
        >
          <Plus size={16} />
          New Template
        </button>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-[14px] p-[16px]">
        <div className="flex flex-col lg:flex-row gap-[12px] justify-between mb-[14px]">
          <div className="relative w-full lg:max-w-[320px]">
            <Search size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full h-[38px] pl-[36px] rounded-[10px] bg-[var(--input-bg)] border border-transparent text-[13px]"
            />
          </div>
          <Dropdown
            value={cat}
            onChange={setCat}
            options={['All', 'Sales', 'Follow-up', 'Marketing']}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          {filtered.map((t: Template) => (
            <div key={t.id} className="border border-[var(--border)] rounded-[12px] p-[14px]">
              <div className="flex justify-between mb-[6px]">
                <div className="font-medium text-[13px]">{t.name}</div>
                <StatusBadge label={t.category} />
              </div>
              <div className="text-[12px] text-[var(--text-secondary)] truncate mb-[6px]">{t.subject}</div>
              <div className="text-[11px] text-[var(--text-muted)] line-clamp-2">{t.body}</div>
              <div className="mt-[10px] flex justify-between items-center">
                <span className="text-[11px] text-[var(--text-muted)]">
                  {t.updated} • Used {t.usage}x
                </span>
                <div className="flex gap-[6px]">
                  <button
                    onClick={() => {
                      setEditing(t);
                      setDraft({
                        name: t.name,
                        category: t.category,
                        subject: t.subject,
                        body: t.body,
                      });
                      setShowAdd(true);
                    }}
                    className="h-[28px] px-[10px] rounded-[8px] bg-[var(--input-bg)] text-[11px] cursor-pointer hover:bg-[#EAECE8]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setTemplates(templates.filter((x: Template) => x.id !== t.id))}
                    className="h-[28px] px-[8px] rounded-[8px] bg-[var(--input-bg)] text-[11px] cursor-pointer hover:bg-[#FEECEC]"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-[16px]">
          <div className="w-full max-w-[560px] bg-white rounded-[16px] p-[20px] border border-[var(--border)]">
            <div className="flex justify-between mb-[14px]">
              <div className="font-semibold">{editing ? 'Edit Template' : 'New Template'}</div>
              <button
                onClick={() => {
                  setShowAdd(false);
                  setEditing(null);
                  setDraft({ name: '', category: 'Sales', subject: '', body: '' });
                }}
                className="cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-[10px]">
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Template name"
                className="h-[40px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px]"
              />
              <Dropdown
                value={draft.category}
                onChange={(v: string) => setDraft({ ...draft, category: v })}
                options={['Sales', 'Follow-up', 'Marketing']}
              />
              <input
                value={draft.subject}
                onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                placeholder="Subject with tokens e.g. {{company}}"
                className="h-[40px] px-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px]"
              />
              <textarea
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                placeholder="Body with tokens {{firstName}} {{company}} {{location}}"
                className="min-h-[120px] p-[12px] rounded-[10px] bg-[var(--input-bg)] text-[13px]"
              />
            </div>
            <div className="mt-[14px] flex justify-end gap-[8px]">
              <button
                onClick={() => {
                  setShowAdd(false);
                  setEditing(null);
                }}
                className="h-[36px] px-[14px] rounded-[10px] bg-[var(--input-bg)] text-[13px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="h-[36px] px-[14px] rounded-[10px] bg-[var(--primary)] text-[13px] font-semibold text-[#1B4D0F] cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
