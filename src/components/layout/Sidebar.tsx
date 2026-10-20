import React, { useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  UsersRound,
  Mail,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Building2,
  Settings,
  ChevronDown,
  X,
} from 'lucide-react';
import { Logo } from '../shared/Logo';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  creditBalance?: number;
}

interface NavChild {
  id: string;
  label: string;
}

interface NavParent {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: NavChild[];
}

export function Sidebar({
  currentPage,
  setCurrentPage,
  expanded,
  setExpanded,
  mobileOpen,
  setMobileOpen,
  creditBalance = 2452,
}: SidebarProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = navRef.current;
    if (!root) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('button[data-nav-id]') as HTMLButtonElement | null;
      if (!btn) return;
      const id = btn.getAttribute('data-nav-id') || '';
      try {
        btn.setAttribute('data-clicked', Date.now().toString());
        const fb = document.getElementById('interaction-feedback');
        if (fb) {
          fb.textContent = `active:${id}:${Date.now()}`;
          fb.style.display = 'none';
        }
        const ns = document.getElementById('nav-state');
        if (ns) {
          ns.textContent = id;
          ns.setAttribute('data-current', id);
          ns.style.display = 'none';
        }
        document.body.setAttribute('data-last-nav', id);
        document.documentElement.setAttribute('data-last-nav', id);
      } catch {}
    };
    root.addEventListener('pointerdown', handler, true);
    root.addEventListener('click', handler, true);
    return () => {
      root.removeEventListener('pointerdown', handler, true);
      root.removeEventListener('click', handler, true);
    };
  }, []);

  const navParents: NavParent[] = [
    {
      id: 'lead-intelligence',
      label: 'Lead Intelligence',
      icon: UsersRound,
      children: [
        { id: 'all-leads', label: 'All Leads' },
        { id: 'discovery', label: 'Lead Discovery' },
        { id: 'lists', label: 'Lists & Segments' },
        { id: 'import', label: 'Import & Enrichment' },
      ],
    },
    {
      id: 'outreach',
      label: 'Outreach',
      icon: Mail,
      children: [
        { id: 'outreach-email-campaigns', label: 'Email Campaigns' },
        { id: 'outreach-email-deliveries', label: 'Email Deliveries' },
        { id: 'outreach-sequences', label: 'Sequences & Follow-ups' },
        { id: 'outreach-templates', label: 'Templates' },
      ],
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: BriefcaseBusiness,
      children: [
        { id: 'sales-pipeline', label: 'Sales Pipeline' },
        { id: 'sales-deals', label: 'Deals' },
        { id: 'sales-tasks', label: 'Tasks & Activities' },
        { id: 'sales-meetings', label: 'Meetings & Calls' },
      ],
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: ChartNoAxesCombined,
      children: [
        { id: 'insights-analytics', label: 'Analytics & Reports' },
        { id: 'insights-team', label: 'Team Performance' },
      ],
    },
    {
      id: 'workspace',
      label: 'Workspace',
      icon: Building2,
      children: [
        { id: 'workspace-team', label: 'Team & Assignments' },
        { id: 'workspace-branches', label: 'Branches' },
        { id: 'workspace-integrations', label: 'Integrations' },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: Settings,
      children: [
        { id: 'admin-billing', label: 'Credits & Billing' },
        { id: 'admin-settings', label: 'Settings' },
        { id: 'admin-audit', label: 'Audit & Compliance' },
      ],
    },
  ];

  // Auto-expand the parent containing the currently active page so children remain visible
  useEffect(() => {
    navParents.forEach((parent) => {
      if (parent.children.some((c) => c.id === currentPage)) {
        setExpanded((prev) => {
          if (prev[parent.id]) return prev;
          return { ...prev, [parent.id]: true };
        });
      }
    });
  }, [currentPage]);

  const isChildActive = (childId: string) => currentPage === childId;
  const isParentActive = (parent: NavParent) => parent.children.some((c) => c.id === currentPage);

  const toggleParent = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const navigateTo = (pageId: string, label: string) => {
    setCurrentPage(pageId);
    setMobileOpen(false);
    try {
      window.location.hash = pageId;
      document.title = `LeadFlow CRM - ${label}`;
    } catch {}
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen w-[280px] bg-white border-r border-[var(--border)] flex flex-col justify-between transition-transform duration-200 select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ paddingTop: 'var(--safe-area-inset-top)' }}
      >
        {/* Brand / Logo Top Bar */}
        <div className="h-[56px] px-[16px] flex items-center justify-between border-b border-[var(--border)] shrink-0">
          <Logo />
          <button
            className="lg:hidden p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-[6px]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Independent scrollable navigation area with balanced compact spacing */}
        <div
          ref={navRef}
          className="flex-1 overflow-y-auto px-[12px] pt-[10px] pb-[16px] flex flex-col min-h-0"
        >
          {/* MAIN GROUP */}
          <div className="mb-[12px]">
            <div className="px-[8px] mb-[4px] text-[10.5px] font-semibold tracking-[0.05em] uppercase text-[var(--text-muted)]">
              Main
            </div>
            <button
              type="button"
              data-nav-id="overview"
              onClick={() => navigateTo('overview', 'Overview')}
              className={`relative w-full h-[34px] flex items-center gap-[9px] px-[10px] rounded-[8px] text-[13px] font-medium transition-all text-left overflow-hidden ${
                currentPage === 'overview'
                  ? 'bg-[#EFFBEA] text-[#15803D] font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-[#F3F5F2]'
              }`}
            >
              {currentPage === 'overview' && (
                <span
                  className="absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#76E05B] rounded-r-full"
                  aria-hidden="true"
                />
              )}
              <LayoutDashboard
                size={16}
                className={currentPage === 'overview' ? 'text-[#16A34A]' : 'text-[var(--text-muted)]'}
              />
              <span>Overview</span>
            </button>
          </div>

          {/* LEAD OPERATIONS GROUP */}
          <div>
            <div className="px-[8px] mb-[4px] text-[10.5px] font-semibold tracking-[0.05em] uppercase text-[var(--text-muted)]">
              Lead Operations
            </div>
            <div className="flex flex-col gap-[2px]">
              {navParents.map((parent) => {
                const activeParent = isParentActive(parent);
                const isExpanded = !!expanded[parent.id];

                return (
                  <div key={parent.id} className="relative">
                    <button
                      type="button"
                      data-parent-id={parent.id}
                      onClick={() => toggleParent(parent.id)}
                      className={`relative w-full h-[34px] flex items-center gap-[9px] px-[10px] rounded-[8px] text-[13px] font-medium transition-all text-left overflow-hidden ${
                        activeParent
                          ? 'bg-[#EFFBEA] text-[#15803D] font-semibold'
                          : 'text-[var(--text-secondary)] hover:bg-[#F3F5F2]'
                      }`}
                    >
                      {activeParent && (
                        <span
                          className="absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#76E05B] rounded-r-full"
                          aria-hidden="true"
                        />
                      )}
                      <parent.icon
                        size={16}
                        className={activeParent ? 'text-[#16A34A]' : 'text-[var(--text-muted)]'}
                      />
                      <span className="flex-1 text-left truncate">{parent.label}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-150 shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        } ${activeParent ? 'text-[#16A34A]' : 'text-[var(--text-muted)]'}`}
                      />
                    </button>

                    {/* Child Navigation Items */}
                    {isExpanded && (
                      <div className="relative ml-[20px] mt-[2px] mb-[3px] pl-[10px] border-l border-[var(--border)] flex flex-col gap-[1px]">
                        {parent.children.map((child) => {
                          const active = isChildActive(child.id);
                          return (
                            <button
                              key={child.id}
                              type="button"
                              data-nav-id={child.id}
                              onClick={() => navigateTo(child.id, child.label)}
                              className={`relative h-[28px] flex items-center gap-[8px] px-[8px] rounded-[6px] text-[12px] transition-all text-left overflow-hidden ${
                                active
                                  ? 'bg-[#EFFBEA] text-[#15803D] font-semibold'
                                  : 'text-[var(--text-secondary)] hover:bg-[#F3F5F2]'
                              }`}
                            >
                              {active && (
                                <span
                                  className="absolute left-0 top-[4px] bottom-[4px] w-[2.5px] bg-[#76E05B] rounded-r-full"
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                className={`w-[5px] h-[5px] rounded-full shrink-0 transition-all ${
                                  active ? 'bg-[#76E05B]' : 'bg-[#D1D5D0]'
                                }`}
                              />
                              <span className="truncate">{child.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Lead Credits & Profile Card anchored at bottom with guaranteed breathing room */}
        <div className="shrink-0 p-[12px] border-t border-[var(--border)] bg-white flex flex-col gap-[8px] mt-auto">
          <div
            onClick={() => navigateTo('admin-billing', 'Credits & Billing')}
            className="rounded-[10px] bg-gradient-to-r from-[#181A19] via-[#232724] to-[#121413] py-[5px] px-[10px] cursor-pointer shadow-sm transition-all hover:brightness-110"
          >
            <div className="flex items-center justify-between mb-[2.5px]">
              <span className="text-[11.5px] font-semibold text-white tracking-tight">Lead Credits</span>
              <span className="text-[9.5px] font-semibold text-[#76E05B] bg-[#76E05B]/20 px-[5px] py-[0.5px] rounded-[4px]">
                {Math.round(((5000 - creditBalance) / 5000) * 100)}% used
              </span>
            </div>
            <div className="h-[3.5px] w-full bg-white/20 rounded-full overflow-hidden mb-[2.5px]">
              <div
                className="h-full bg-[#76E05B] rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.max(10, ((5000 - creditBalance) / 5000) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-[9.5px] text-white/85 font-medium">
              <span>{(5000 - creditBalance).toLocaleString()} / 5,000 used</span>
              <span className="font-semibold text-[#76E05B]">{creditBalance.toLocaleString()} left</span>
            </div>
          </div>

          <div
            onClick={() => navigateTo('admin-settings', 'Settings')}
            className="flex items-center gap-[8px] px-[6px] py-[4px] rounded-[8px] hover:bg-[#F3F5F2] cursor-pointer transition-colors border-t border-[var(--border)] pt-[8px]"
          >
            <div className="w-[30px] h-[30px] rounded-full bg-[#76E05B] flex items-center justify-center text-[12px] font-semibold text-[#15803D] shrink-0">
              DC
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[12.5px] font-semibold text-[var(--text-primary)] truncate">Dominion Castiel</span>
              <span className="text-[10.5px] text-[var(--text-muted)] truncate">Admin • Lagos HQ</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
