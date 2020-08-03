import { Component, ComponentInterface, Host, h, State, Element } from "@stencil/core"

declare global {
    export const ResizeObserver: any
}

@Component({
    tag: "oui-sidebar",
    styleUrl: "oui-sidebar.css",
    shadow: true,
})
export class OuiSidebar implements ComponentInterface {
    @Element() el: HTMLElement
    @State() private parentWidth: number = 480
    @State() private toggled = false
    private resizer
    constructor() {
        this.resizer = new ResizeObserver(this.onResize)
    }
    onResize = (entries) => {
        this.parentWidth = entries[0].contentRect.width
    }
    connectedCallback() {
        this.resizer.observe(this.el.parentElement, { box: "content-box" })
    }
    onToggle = () => {
        this.toggled = true
        setTimeout(() => {
            window.addEventListener("click", this.untoggle)
        })
    }
    untoggle = () => {
        this.toggled = false
        window.removeEventListener("click", this.untoggle)
    }
    render() {
        const collapsibleClass = this.parentWidth < 768 ? "collapsible" : "static"
        const toggledClass = this.toggled ? "toggled" : ""
        const comboClass = [collapsibleClass, toggledClass].join(" ")
        return (
            <Host>
                <nav class={comboClass}>
                    <slot name="sidebar"></slot>
                </nav>
                <section>
                    <div class={`title-bar ${comboClass}`}>
                        <div class="sidebar-toggle">
                            <oui-btn onClick={this.onToggle}>
                                <oui-icon icon="sidebar" />
                                Sidebar
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
