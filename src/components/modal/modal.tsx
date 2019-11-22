import { Component, Event, EventEmitter, h, Host } from "@stencil/core"
import { onEscape } from "../../lib/keyboard/KeyCodes"

@Component({
  tag: "oui-modal",
  styleUrl: "modal.css",
})
export class Modal {
  /**
   * Emitted when modal is closed via button or esc
   */
  @Event() public close: EventEmitter

  private subscriptions: Array<() => void> = []

  public render() {
    return (
      <Host>
        <section class="oui-modal__content">
          <heading>
            <span class="oui-modal__title"><slot name="title" /></span>
            <a onClick={this.handleClose}>Close (esc)</a>
          </heading>

          <div><slot /></div>
        </section>
      </Host>
    )
  }

  public connectedCallback() {
    this.subscriptions.push(onEscape(this.handleClose))
  }

  public disconnectedCallback() {
    this.subscriptions.forEach((sub) => sub())
    this.subscriptions = []
  }

  private handleClose = () => this.close.emit()
}
