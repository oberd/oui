import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'oui-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button {

  render() {
    return (
      <Host>
        <button class="oui-button">
          <slot />
        </button>
      </Host>
    );
  }

}
