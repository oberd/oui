import { Component, ComponentInterface, Host, h, State, Element, Prop } from "@stencil/core"

declare global {
    export const ResizeObserver: any
}

@Component({
    tag: "oui-sidebar",
    styleUrl: "oui-sidebar.css",
    shadow: true,
})
export class OuiSidebar implements ComponentInterface {
    @Element() el: HTMLOuiSidebarElement
    /**
     * Message to show in place of hamburger
     */
    @Prop() public menuTitle: string = "Menu"
    @State() private parentWidth: number = 480
    @State() private toggled = false
    @State() private slotWidth = 150
    private resizer
    constructor() {
        this.resizer = new ResizeObserver(this.onResize)
    }
    private onResize = (entries) => {
        this.parentWidth = entries[0].contentRect.width
    }
    connectedCallback() {
        this.resizer.observe(this.el.parentElement, { box: "content-box" })
    }
    private onToggle = () => {
        this.slotWidth = this.el.querySelector("[slot=\"sidebar\"]").scrollWidth
        this.toggled = true
        setTimeout(() => {
            window.addEventListener("click", this.untoggle)
        })
    }
    private untoggle = () => {
        this.toggled = false
        window.removeEventListener("click", this.untoggle)
    }
    render() {
        const collapsible = this.parentWidth < 768
        const collapsibleClass = collapsible ? "collapsible" : "static"
        const toggledClass = this.toggled ? "toggled" : ""
        const comboClass = [collapsibleClass, toggledClass].join(" ")
        const navStyle = collapsible
            ? {
                  width: `${this.toggled ? this.slotWidth : 0}px`,
              }
            : {}
        return (
            <Host>
                <nav style={navStyle} class={comboClass}>
                    <slot name="sidebar"></slot>
                </nav>
                <section>
                    <div class={`title-bar ${comboClass}`}>
                        <div class="sidebar-toggle">
                            <oui-btn onClick={this.onToggle}>
                                <oui-icon icon="sidebar" />
                                {this.menuTitle}
                            </oui-btn>
                        </div>
                        <div class="title-bar-slot">
                            <slot name="title-bar"></slot>
                        </div>
                    </div>
                    <main>
                        <slot />
                    </main>
                </section>
            </Host>
        )
    }
}
