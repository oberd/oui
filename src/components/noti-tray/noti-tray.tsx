import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'noti-tray',
  styleUrl: 'noti-tray.css',
  shadow: true
})
export class NotiTray {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
