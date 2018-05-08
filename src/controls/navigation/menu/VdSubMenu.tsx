import {
  Vue,
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';
import { VNode, CreateElement, VNodeChildrenArrayContents } from 'vue';
import { Location } from 'vue-router/types/router';
import { VdControl, IconControl } from '@void/controls/base/VdControl';
import { VdMenu } from '@void/controls/navigation/menu/VdMenu';
import { VdMenuItem } from '@void/controls/navigation/menu/VdMenuItem';
import { MenuItem, MenuItemGroup } from '@void/controls/navigation/menu/VdMenuModels';

import { easing, styler, tween } from 'popmotion';
import { Styler } from 'stylefire';
import { VdMenuItemGroup } from '@void/controls/navigation/menu/VdMenuItemGroup';

const ease: easing.Easing = easing.easeInOut;
const duration: number = 300;

/**
 * Control SubMenu
 */
@Component
export class VdSubMenu extends VdControl implements IconControl {
  // tslint:disable-next-line:no-null-keyword
  private menu: VdMenu | null = null;

  @Prop({ type: String, required: true })
  public subMenuLabel: string;

  @Prop({ type: String })
  public icon: string;

  @Prop({ type: String })
  public fa: string;

  @Prop({ type: Array, default: () => [] })
  public itemsSource: (MenuItem | MenuItemGroup)[];

  public expanded: boolean = false;

  @Watch('expanded')
  private onIsExpandedChange(value: boolean): void {
    if (value) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  public get classes(): ClassName {
    return [
      'vd-sub-menu',
      ...(this.menu ? this.menu.sharedClasses : []),
      {
        'is-expanded': this.expanded,
      },
    ];
  }

  private itemWrapper: Styler;
  private indicator: Styler;

  private collapse(): void {
    tween({
      from: {
        height: (this.$refs.itemWrapper as HTMLElement).offsetHeight,
      },
      to: 0,
      ease,
      duration,
    }).start({
      update: this.itemWrapper.set,
    });

    tween({
      from: {
        rotateX: -180,
      },
      to: 0,
      ease,
      duration,
    }).start(this.indicator.set);
  }

  private expand(): void {
    tween({
      from: 0,
      to: {
        height: this.$children
          .filter(c => c instanceof VdMenuItem || c instanceof VdMenuItemGroup)
          .reduce((acc, cur) => acc + cur.$el.offsetHeight, 0),
      },
      ease,
      duration,
    }).start({
      update: this.itemWrapper.set,
      complete: () => this.itemWrapper.set('height', 'initial'),
    });

    tween({
      from: 0,
      to: {
        rotateX: -180,
      },
      ease,
      duration,
    }).start(this.indicator.set);
  }

  private onClick(): void {
    if (this.menu) {
      this.menu.selectedSubMenu = this;
    }
    this.expanded = !this.expanded;
  }

  private beforeMount(): void {
    if (this.$parent instanceof VdMenu) {
      this.menu = this.$parent;
      this.menu.addSubMenu(this);
    }
    if (!this.menu) {
      throw new Error('VdSubMenu must be placed in VdMenu.');
    }
  }

  private mounted(): void {
    this.itemWrapper = styler(this.$refs.itemWrapper as Element, {});
    this.indicator = styler(this.$refs.indicator as Element, {});
  }

  private render(h: CreateElement): VNode {
    return (
      <li class={this.classes}>
        <div class="vd-sub-menu_header" role="menu" onClick={this.onClick}>
          <span class="vd-sub-menu_icon-container">
            <vd-icon class="vd-sub-menu_icon" icon={this.icon} fa={this.fa} />
          </span>
          <span class="vd-sub-menu_label">{this.subMenuLabel}</span>
          <span class="vd-sub-menu_icon-container vd-sub-menu_indicator" ref="indicator">
            <vd-icon class="vd-sub-menu_icon" fa="angle-down" />
          </span>
        </div>
        <ul class="vd-sub-menu_item-wrapper" ref="itemWrapper">
          {this.itemsSource.map(model => {
            if ((model as MenuItemGroup).groupLabel) {
              return (
                <vd-menu-item-group
                  groupLabel={(model as MenuItemGroup).groupLabel}
                  itemsSource={(model as MenuItemGroup).itemsSource}
                />
              );
            } else if ((model as MenuItem).label) {
              return (
                <vd-menu-item
                  label={(model as MenuItem).label}
                  icon={(model as MenuItem).icon}
                  fa={(model as MenuItem).fa}
                  to={(model as MenuItem).to}
                  href={(model as MenuItem).href}
                  target={(model as MenuItem).target}
                  onClick={(model as MenuItem).onClick || (() => undefined)}
                />
              );
            }
          })}
          {this.$slots.default}
        </ul>
      </li>
    );
  }
}
