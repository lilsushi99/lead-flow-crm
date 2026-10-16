import React from 'react';
import { OverviewPage } from '../features/overview/OverviewPage';
import { AllLeadsPage } from '../features/lead-intelligence/AllLeadsPage';
import { DiscoveryPage } from '../features/lead-intelligence/DiscoveryPage';
import { ListsPage } from '../features/lead-intelligence/ListsPage';
import { ImportPage } from '../features/lead-intelligence/ImportPage';
import { EmailCampaignsPage } from '../features/outreach/EmailCampaignsPage';
import { EmailDeliveriesPage } from '../features/outreach/EmailDeliveriesPage';
import { SequencesPage } from '../features/outreach/SequencesPage';
import { TemplatesPage } from '../features/outreach/TemplatesPage';
import { SalesPipelinePage } from '../features/sales/SalesPipelinePage';
import { DealsPage } from '../features/sales/DealsPage';
import { TasksActivitiesPage } from '../features/sales/TasksActivitiesPage';
import { MeetingsCallsPage } from '../features/sales/MeetingsCallsPage';
import { AnalyticsReportsPage } from '../features/insights/AnalyticsReportsPage';
import { TeamPerformancePage } from '../features/insights/TeamPerformancePage';
import { TeamAssignmentsPage } from '../features/workspace/TeamAssignmentsPage';
import { BranchesPage } from '../features/workspace/BranchesPage';
import { IntegrationsPage } from '../features/workspace/IntegrationsPage';
import { CreditsBillingPage } from '../features/administration/CreditsBillingPage';
import { SettingsPage } from '../features/administration/SettingsPage';
import { AuditCompliancePage } from '../features/administration/AuditCompliancePage';
import { ComingSoonPage } from '../components/shared/ComingSoonPage';

import {
  Lead,
  Task,
  Campaign,
  Delivery,
  Sequence,
  Template,
  Deal,
  SalesTask,
  Activity,
  Meeting,
  BranchDetail,
  TeamMemberDetail,
  CreditTransaction,
  CreditPackage,
  AuditLog,
  WorkspaceSettings,
  ProfileSettings,
  NotificationSettings,
  SecurityPreferences,
} from '../types/crm';

export interface AppRouteProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  filteredByGlobal: Lead[];
  branch: string;
  setBranch: (b: string) => void;
  branchList: string[];
  setBranchList: React.Dispatch<React.SetStateAction<string[]>>;
  branchDetails: BranchDetail[];
  setBranchDetails: React.Dispatch<React.SetStateAction<BranchDetail[]>>;
  teamMembers: TeamMemberDetail[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMemberDetail[]>>;
  dateRange: string;
  setDateRange: (d: string) => void;
  sourceFilter: string | null;
  setSourceFilter: (s: string | null) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  lists: any[];
  setLists: React.Dispatch<React.SetStateAction<any[]>>;
  segments: any[];
  setSegments: React.Dispatch<React.SetStateAction<any[]>>;
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  deliveries: Delivery[];
  sequences: Sequence[];
  setSequences: React.Dispatch<React.SetStateAction<Sequence[]>>;
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  salesTasks: SalesTask[];
  setSalesTasks: React.Dispatch<React.SetStateAction<SalesTask[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  meetings: Meeting[];
  setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>;
  creditTransactions: CreditTransaction[];
  setCreditTransactions: React.Dispatch<React.SetStateAction<CreditTransaction[]>>;
  creditPackages: CreditPackage[];
  creditBalance: number;
  setCreditBalance: React.Dispatch<React.SetStateAction<number>>;
  auditLogs: AuditLog[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
  workspaceSettings: WorkspaceSettings;
  setWorkspaceSettings: React.Dispatch<React.SetStateAction<WorkspaceSettings>>;
  profileSettings: ProfileSettings;
  setProfileSettings: React.Dispatch<React.SetStateAction<ProfileSettings>>;
  notificationSettings: NotificationSettings;
  setNotificationSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
  securityPreferences: SecurityPreferences;
  setSecurityPreferences: React.Dispatch<React.SetStateAction<SecurityPreferences>>;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp' | 'dateLabel'>) => void;
  branches: string[];
}

export function AppRouter(props: AppRouteProps): React.ReactElement {
  const { currentPage } = props;

  switch (currentPage) {
    case 'overview':
      return (
        <OverviewPage
          leads={props.filteredByGlobal}
          branch={props.branch}
          dateRange={props.dateRange}
          setCurrentPage={props.setCurrentPage}
          setSourceFilter={props.setSourceFilter}
          tasks={props.tasks}
          setTasks={props.setTasks}
        />
      );

    case 'all-leads':
      return (
        <AllLeadsPage
          leads={props.filteredByGlobal}
          setLeads={props.setLeads}
          sourceFilter={props.sourceFilter}
          setSourceFilter={props.setSourceFilter}
          branch={props.branch}
        />
      );

    case 'discovery':
      return <DiscoveryPage leads={props.leads} setLeads={props.setLeads} />;

    case 'lists':
      return (
        <ListsPage
          leads={props.leads}
          lists={props.lists}
          setLists={props.setLists}
          segments={props.segments}
          setSegments={props.setSegments}
        />
      );

    case 'import':
      return <ImportPage leads={props.leads} setLeads={props.setLeads} />;

    case 'outreach-email-campaigns':
      return (
        <EmailCampaignsPage
          campaigns={props.campaigns}
          setCampaigns={props.setCampaigns}
          lists={props.lists}
        />
      );

    case 'outreach-email-deliveries':
      return <EmailDeliveriesPage deliveries={props.deliveries} />;

    case 'outreach-sequences':
      return (
        <SequencesPage
          sequences={props.sequences}
          setSequences={props.setSequences}
        />
      );

    case 'outreach-templates':
      return (
        <TemplatesPage
          templates={props.templates}
          setTemplates={props.setTemplates}
        />
      );

    case 'sales-pipeline':
      return (
        <SalesPipelinePage
          deals={props.deals}
          setDeals={props.setDeals}
          activities={props.activities}
          setActivities={props.setActivities}
        />
      );

    case 'sales-deals':
      return (
        <DealsPage
          deals={props.deals}
          setDeals={props.setDeals}
          leads={props.leads}
          activities={props.activities}
          meetings={props.meetings}
        />
      );

    case 'sales-tasks':
      return (
        <TasksActivitiesPage
          salesTasks={props.salesTasks}
          setSalesTasks={props.setSalesTasks}
          activities={props.activities}
          setActivities={props.setActivities}
          leads={props.leads}
          deals={props.deals}
        />
      );

    case 'sales-meetings':
      return (
        <MeetingsCallsPage
          meetings={props.meetings}
          setMeetings={props.setMeetings}
          salesTasks={props.salesTasks}
          setSalesTasks={props.setSalesTasks}
          leads={props.leads}
          deals={props.deals}
        />
      );

    case 'insights-analytics':
      return (
        <AnalyticsReportsPage
          leads={props.leads}
          deals={props.deals}
          campaigns={props.campaigns}
          deliveries={props.deliveries}
          activities={props.activities}
          meetings={props.meetings}
          salesTasks={props.salesTasks}
          branch={props.branch}
          dateRange={props.dateRange}
        />
      );

    case 'insights-team':
      return (
        <TeamPerformancePage
          leads={props.leads}
          deals={props.deals}
          campaigns={props.campaigns}
          salesTasks={props.salesTasks}
          activities={props.activities}
          meetings={props.meetings}
          branch={props.branch}
          dateRange={props.dateRange}
        />
      );

    case 'workspace-team':
      return (
        <TeamAssignmentsPage
          leads={props.leads}
          setLeads={props.setLeads}
          deals={props.deals}
          setDeals={props.setDeals}
          salesTasks={props.salesTasks}
          meetings={props.meetings}
          activities={props.activities}
          teamMembers={props.teamMembers}
          setTeamMembers={props.setTeamMembers}
          branchList={props.branchList}
        />
      );

    case 'workspace-branches':
      return (
        <BranchesPage
          leads={props.leads}
          deals={props.deals}
          branchDetails={props.branchDetails}
          setBranchDetails={props.setBranchDetails}
          branchList={props.branchList}
          setBranchList={props.setBranchList}
          teamMembers={props.teamMembers}
        />
      );

    case 'workspace-integrations':
      return <IntegrationsPage />;

    case 'admin-billing':
      return (
        <CreditsBillingPage
          transactions={props.creditTransactions}
          setTransactions={props.setCreditTransactions}
          packages={props.creditPackages}
          balance={props.creditBalance}
          setBalance={props.setCreditBalance}
          addAuditLog={props.addAuditLog}
          teamMembers={props.teamMembers}
        />
      );

    case 'admin-settings':
      return (
        <SettingsPage
          workspaceSettings={props.workspaceSettings}
          setWorkspaceSettings={props.setWorkspaceSettings}
          profileSettings={props.profileSettings}
          setProfileSettings={props.setProfileSettings}
          notificationSettings={props.notificationSettings}
          setNotificationSettings={props.setNotificationSettings}
          securityPreferences={props.securityPreferences}
          setSecurityPreferences={props.setSecurityPreferences}
          teamMembers={props.teamMembers}
          addAuditLog={props.addAuditLog}
          branches={props.branches}
        />
      );

    case 'admin-audit':
      return (
        <AuditCompliancePage
          logs={props.auditLogs}
          setLogs={props.setAuditLogs}
          teamMembers={props.teamMembers}
        />
      );

    default:
      return <ComingSoonPage title={currentPage.replace(/-/g, ' ')} />;
  }
}
