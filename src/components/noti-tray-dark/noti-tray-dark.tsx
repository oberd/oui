import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'oui-noti-tray-dark',
  styleUrl: 'noti-tray-dark.css',
})
export class NotiTrayDark {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
