import { LitElement, html, css, customElement, property, TemplateResult, CSSResult, state } from 'lit-element';
import MediaPlayerObject from '../model';

import './dropdown';

interface DropdownItem {
  name: string;
  id: string;
  type: 'soundMode';
}

type ChangeEvent = CustomEvent<DropdownItem>;

@customElement('mmp-sound-menu')
export class MiniMediaPlayerSoundMenu extends LitElement {
  @property({ attribute: false }) public player!: MediaPlayerObject;

  @property({ attribute: false }) public icon!: boolean[];

  @state() private selected?: string = undefined;

  get mode(): string {
    console.log("MiniMediaPlayerSoundMenu.mode()");
    return this.player.soundMode;
  }

  get alternatives(): DropdownItem[] {
    return this.player.soundModes.map((mode) => (console.log("MiniMediaPlayerSoundMenu.alternatives()"), {
      name: mode,
      id: mode,
      type: 'soundMode',
    }));
  }

  render(): TemplateResult {
    console.log("MiniMediaPlayerSoundMenu.render()");
    return html`
      <mmp-dropdown
        @change=${this.handleChange}
        .items=${this.alternatives}
        .label=${this.mode}
        .selected=${this.selected || this.mode}
        .icon=${this.icon}
      ></mmp-dropdown>
    `;
  }

  private handleChange(ev: ChangeEvent) {
    console.log("MiniMediaPlayerSoundMenu.handleChange()");
    const { id } = ev.detail;
    this.player.setSoundMode(ev, id);
    this.selected = id;
  }

  static get styles(): CSSResult {
    console.log("MiniMediaPlayerSoundMenu.styles()");
    return css`
      :host {
        max-width: 120px;
        min-width: var(--mmp-unit);
      }
      :host([full]) {
        max-width: none;
      }
    `;
  }
}
