import { FontAwesomeIconProps } from '@void/controls/basic/icon/VdIcon';
import { VdMenuItem } from '@void/controls/navigation/menu/VdMenuItem';
/**
 * Model for menu item.
 */
export interface MenuItem {
  label: string;
  icon?: string;
  fa?: string | string[] | FontAwesomeIconProps;
  to?: string | Location;
  href?: string;
  target?: string;
  onClick?(event?: MouseEvent, sender?: VdMenuItem): void;
}

/**
 * Model for menu item group.
 */
export interface MenuItemGroup {
  groupLabel: string;
  itemsSource: MenuItem[];
}

/**
 * Model for sub menu.
 */
export interface SubMenu {
  subMenuLabel: string;
  icon?: string;
  fa?: string;
  itemsSource: (MenuItem | MenuItemGroup)[];
}
