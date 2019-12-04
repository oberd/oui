import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'nav-button',
  styleUrl: 'nav-button',
  shadow: true
})
export class NavButton {
  @Prop() buttonName: string;

  render() {
    return <div>{this.buttonName}</div>;
  }
}
