import { Component, h, Host, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'nav-drawer',
  styleUrl: './nav-drawer.css',
})
export class NavDrawer {
  @State() showContactInfo = false;

  @Prop({ reflect: true }) navTitle: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer = () => {
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
    
    // let mainContent = <slot />;
    // if (this.showContactInfo) {
    //   mainContent = (
    //     <div id="studies">
    //       <ul>
    //         <li>Studies Homes</li>
    //         <li>Studies Homes</li>
    //         <li>Studies Homes</li>
    //         <li>Studies Homes</li>
    //       </ul>
    //     </div>
    //   );
    

    return (
      <Host>
        <div class="backdrop" onClick={this.onCloseDrawer} />
        <aside>
          <header>
            <h1>{this.navTitle}</h1>
            <button onClick={this.onCloseDrawer}>X</button>
          </header>
          <slot  />
        </aside>
      </Host>
    );
  }
}