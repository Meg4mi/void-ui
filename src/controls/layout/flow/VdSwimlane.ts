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
import { CreateElement, VNode } from 'vue';
import { VdControl } from '@void/controls/base/VdControl';

/**
 * Control Swimlane
 */
@Component
export class VdSwimlane extends VdControl {
  @Prop({ type: Boolean, default: false })
  public readonly oddeven!: boolean;

  private render(h: CreateElement): VNode {
    return h(
      'div',
      {
        class: [
          'vd-swimlane',
          `vdp-theme_${this.$theme}`,
          {
            'is-oddeven': this.oddeven,
          },
        ],
      },
      [this.$slots.default],
    );
  }
}
