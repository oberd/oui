import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'oui-noti-tray-light',
  styleUrl: 'noti-tray-light.css',
})
export class NotiTrayLight {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
