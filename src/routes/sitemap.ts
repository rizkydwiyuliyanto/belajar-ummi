
export interface SubMenuItem {
  name?: string;
  pathName?: string;
  path?: string;
  icon?: string;
  id?: string;
  // active?: boolean;
  children?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  // active?: boolean;
  items?: SubMenuItem[];
}