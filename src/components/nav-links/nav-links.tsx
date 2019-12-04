import { Component, Prop, h } from '@stencil/core';


@Component({
  tag: 'nav-links',
  styleUrl: 'nav-links.css',
  shadow: true
})
export class NavLinks {
  @Prop() links: string[];

  render() {
    return <div>Hello, World! I'm {this.links}</div>;
  }
}
