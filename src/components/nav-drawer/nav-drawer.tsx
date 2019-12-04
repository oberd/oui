import { Component, h, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'nav-drawer',
  styleUrl: './nav-drawer.css',
  shadow: true
})
export class NavDrawer {
  @State() showContactInfo = false;

  @Prop({ reflect: true }) navTitle: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="studies">
          <ul>
            <li>Studies Homes</li>
            <li>Studies Homes</li>
            <li>Studies Homes</li>
            <li>Studies Homes</li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
      <aside>
        <header>
          <h1>{this.navTitle}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
          >
            Home
          </button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}
          >
            Studies
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>
    ];
  }
}