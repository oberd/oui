import { Component, h, Prop, State } from "@stencil/core"
import { SvgPack, svgs } from "./svgs"

@Component({
  tag: "oui-svg",
  styleUrl: "svg.css",
})
export class Svg {
  @State() public content: string = "<svg></svg>"
  @Prop() public name: SvgPack
  @Prop() public scale: number = 1.0

  public componentWillLoad() {
    return svgs[this.name].loader().then((data) => this.content = data)
  }

  public render() {
    const { width, height } = svgs[this.name]
    const style = {
      width: this.calculateDimension(width),
      height: this.calculateDimension(height),
    }

    return <div class="oui-svg is-sized" innerHTML={this.content} style={style} />
  }

  private calculateDimension(val: number): string {
    return (val * this.scale) + "px"
  }
}
