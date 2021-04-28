import { dashboardTabs } from './constants';

export interface DashboardTab {
  key: keyof typeof dashboardTabs;
  label: string;
  index: number;
}
