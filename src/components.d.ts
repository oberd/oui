/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface OuiBtn {
        /**
          * standard html button type property
         */
        "type": "button" | "submit";
    }
    interface OuiIcon {
        /**
          * one of the svg icons exported from assets/svg
         */
        "icon": string;
    }
    interface OuiSidebar {
        /**
          * Message to show in place of hamburger
         */
        "menuTitle": string;
    }
}
declare global {
    interface HTMLOuiBtnElement extends Components.OuiBtn, HTMLStencilElement {
    }
    var HTMLOuiBtnElement: {
        prototype: HTMLOuiBtnElement;
        new (): HTMLOuiBtnElement;
    };
    interface HTMLOuiIconElement extends Components.OuiIcon, HTMLStencilElement {
    }
    var HTMLOuiIconElement: {
        prototype: HTMLOuiIconElement;
        new (): HTMLOuiIconElement;
    };
    interface HTMLOuiSidebarElement extends Components.OuiSidebar, HTMLStencilElement {
    }
    var HTMLOuiSidebarElement: {
        prototype: HTMLOuiSidebarElement;
        new (): HTMLOuiSidebarElement;
    };
    interface HTMLElementTagNameMap {
        "oui-btn": HTMLOuiBtnElement;
        "oui-icon": HTMLOuiIconElement;
        "oui-sidebar": HTMLOuiSidebarElement;
    }
}
declare namespace LocalJSX {
    interface OuiBtn {
        /**
          * standard html button type property
         */
        "type"?: "button" | "submit";
    }
    interface OuiIcon {
        /**
          * one of the svg icons exported from assets/svg
         */
        "icon": string;
    }
    interface OuiSidebar {
        /**
          * Message to show in place of hamburger
         */
        "menuTitle"?: string;
    }
    interface IntrinsicElements {
        "oui-btn": OuiBtn;
        "oui-icon": OuiIcon;
        "oui-sidebar": OuiSidebar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "oui-btn": LocalJSX.OuiBtn & JSXBase.HTMLAttributes<HTMLOuiBtnElement>;
            "oui-icon": LocalJSX.OuiIcon & JSXBase.HTMLAttributes<HTMLOuiIconElement>;
            "oui-sidebar": LocalJSX.OuiSidebar & JSXBase.HTMLAttributes<HTMLOuiSidebarElement>;
        }
    }
}
