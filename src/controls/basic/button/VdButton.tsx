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
import { Location } from 'vue-router/types/router';
import { FontAwesomeIconProps } from '@void/controls/basic/icon/VdIcon';

import {
  Shape,
  VdControl,
  RouterControl,
  IconControl,
  LoadingControl,
} from '@void/controls/base/VdControl';

/**
 * Control Button
 */
@Component
export class VdButton extends VdControl
  implements IconControl, RouterControl, LoadingControl {
  @Prop({ type: String, default: 'button' })
  // tslint:disable-next-line:no-reserved-keywords
  public readonly type!: string;

  @Prop({ type: String })
  public readonly content!: string;

  @Prop({ type: Boolean, default: false })
  public readonly wide!: boolean;

  @Prop({ type: String })
  public readonly icon!: string;

  @Prop({ type: [String, Array, Object] })
  public readonly fa!: string | string[] | FontAwesomeIconProps;

  @Prop({ type: String, default: 'left' })
  public readonly iconPosition!: 'left' | 'right';

  @Prop({ type: [String, Object] })
  public readonly to!: string | Location;

  @Prop({ type: String })
  public readonly href!: string;

  @Prop({ type: String })
  public readonly target!: string;

  @Prop({ type: Boolean, default: false })
  public readonly loading!: boolean;

  public get classes(): ClassName {
    return [
      'vd-button',
      `vdp-theme_${this.$theme}`,
      `vdp-tone_${this.tone}`,
      `vdp-skin_${this.skin}`,
      `vdp-shape_${this.shape}`,
      `vdp-size_${this.size}`,
      {
        [`vda-raise_${this.raise}`]: this.raise,
        'is-disabled': this.disabled,
        'is-bordered': this.disabled,
        'is-wide': this.wide,
        'is-loading': this.loading,
      },
    ];
  }

  private onClick(event: MouseEvent): void {
    this.$emit('click', event, this);
  }

  private render(h: CreateElement): VNode {
    const icon: VNode | string =
      this.shape === Shape.rect || this.shape === Shape.pill ? (
        this.loading ? (
          <vd-icon
            class="vd-button_icon"
            fa={{ icon: ['far', 'spinner'], pulse: true }}
          />
        ) : this.icon || this.fa ? (
          <vd-icon class="vd-button_icon" icon={this.icon} fa={this.fa} />
        ) : (
          ''
        )
      ) : (
        ''
      );

    const inner: VNode =
      this.iconPosition === 'left' ? (
        <span class="vd-button_inner">
          {icon}
          <span class="vd-button_content">{this.$slots.default || this.content}</span>
        </span>
      ) : (
        <span class="vd-button_inner">
          <span class="vd-button_content">{this.$slots.default || this.content}</span>
          {icon}
        </span>
      );

    return this.to ? (
      <router-link
        class={this.classes}
        to={this.to}
        nativeOnClick={this.onClick}
        disabled={this.disabled}
      >
        {inner}
      </router-link>
    ) : this.href ? (
      <a
        class={this.classes}
        href={this.href}
        target={this.target}
        rel="noopener noreferrer"
        onClick={this.onClick}
        disabled={this.disabled}
      >
        {inner}
      </a>
    ) : (
      <button
        class={this.classes}
        type={this.type}
        onClick={this.onClick}
        disabled={this.disabled}
      >
        {inner}
      </button>
    );
  }
}

/**
 * Control ButtonGroup
 */
@Component
export class VdButtonGroup extends VdControl {
  private render(h: CreateElement): VNode {
    return (
      <div class="vd-button-group" role="group">
        {this.$slots.default}
      </div>
    );
  }
}

/**
 * Control ButtonWrapper
 */
@Component
export class VdButtonWrapper extends VdControl {
  private render(h: CreateElement): VNode {
    return (
      <div class="vd-button-wrapper" role="group">
        {this.$slots.default}
      </div>
    );
  }
}
