/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  FileUploadHandler,
} from './components/file-upload/FileUploadHandler';
import {
  SvgPack,
} from './components/svg/svgs';

export namespace Components {
  interface OuiAccordion {}
  interface OuiCard {}
  interface OuiCardHeading {}
  interface OuiCollapsable {
    /**
    * Set drawer position to right or left
    */
    'expanded': boolean;
    /**
    * Set drawer drawerTitle
    */
    'label': string;
  }
  interface OuiDocumentsIcon {
    'isAnimating': boolean;
    'isFannedOut': boolean;
    'isHighlighted': boolean;
  }
  interface OuiDrawer {
    /**
    * Set drawer drawerTitle
    */
    'drawerTitle': string;
    /**
    * Open and close drawer
    */
    'opened': boolean;
    /**
    * Set drawer position to right or left
    */
    'position': string;
    /**
    * Set drawer size
    */
    'size': string;
  }
  interface OuiDrawerItem {
    /**
    * Open link in a new tab. Only for links
    */
    'external': boolean;
    /**
    * Set drawer item link if string will be treated as a url or as a callback if it is a function
    */
    'link': string;
  }
  interface OuiFileUpload {
    /**
    * Specify mime types to accept (unrestricted by default) Separate by spaces for multiple: `text/html text/xml`
    */
    'accept': string;
    /**
    * Specify a label for the button.
    */
    'btnLabel': string;
    /**
    * Specify a title for the modal.
    */
    'modalTitle': string;
  }
  interface OuiModal {}
  interface OuiNavBar {}
  interface OuiNotificationButton {
    /**
    * Number of unread notifications
    */
    'count': number;
    /**
    * Number of unread notifications
    */
    'unread': number;
  }
  interface OuiNotificationDrawer {
    /**
    * This property enables/disables the "Clear All" Button
    */
    'disabled': boolean;
  }
  interface OuiNotificationItem {
    /**
    * A single notification message
    */
    'detail': string;
    /**
    * Topic/Header of the notification message
    */
    'name': string;
    /**
    * A single notification object
    */
    'read': boolean;
    /**
    * Types of the linkref
    */
    'type': "link" | "info";
    /**
    * Status of the action represented by the message
    */
    'valence': "success" | "fail";
  }
  interface OuiNotificationTray {
    /**
    * Total count of the notifications
    */
    'count': number;
    /**
    * Direction of the drawer
    */
    'direction': "to-right" | "to-left";
    /**
    * Open or close the notification drawer
    */
    'opened': boolean;
    /**
    * Total count of notifications left to read
    */
    'unread': number;
  }
  interface OuiSvg {
    'name': SvgPack;
    'scale': number;
  }
  interface OuiTmSwitch {}
}

declare global {


  interface HTMLOuiAccordionElement extends Components.OuiAccordion, HTMLStencilElement {}
  var HTMLOuiAccordionElement: {
    prototype: HTMLOuiAccordionElement;
    new (): HTMLOuiAccordionElement;
  };

  interface HTMLOuiCardElement extends Components.OuiCard, HTMLStencilElement {}
  var HTMLOuiCardElement: {
    prototype: HTMLOuiCardElement;
    new (): HTMLOuiCardElement;
  };

  interface HTMLOuiCardHeadingElement extends Components.OuiCardHeading, HTMLStencilElement {}
  var HTMLOuiCardHeadingElement: {
    prototype: HTMLOuiCardHeadingElement;
    new (): HTMLOuiCardHeadingElement;
  };

  interface HTMLOuiCollapsableElement extends Components.OuiCollapsable, HTMLStencilElement {}
  var HTMLOuiCollapsableElement: {
    prototype: HTMLOuiCollapsableElement;
    new (): HTMLOuiCollapsableElement;
  };

  interface HTMLOuiDocumentsIconElement extends Components.OuiDocumentsIcon, HTMLStencilElement {}
  var HTMLOuiDocumentsIconElement: {
    prototype: HTMLOuiDocumentsIconElement;
    new (): HTMLOuiDocumentsIconElement;
  };

  interface HTMLOuiDrawerElement extends Components.OuiDrawer, HTMLStencilElement {}
  var HTMLOuiDrawerElement: {
    prototype: HTMLOuiDrawerElement;
    new (): HTMLOuiDrawerElement;
  };

  interface HTMLOuiDrawerItemElement extends Components.OuiDrawerItem, HTMLStencilElement {}
  var HTMLOuiDrawerItemElement: {
    prototype: HTMLOuiDrawerItemElement;
    new (): HTMLOuiDrawerItemElement;
  };

  interface HTMLOuiFileUploadElement extends Components.OuiFileUpload, HTMLStencilElement {}
  var HTMLOuiFileUploadElement: {
    prototype: HTMLOuiFileUploadElement;
    new (): HTMLOuiFileUploadElement;
  };

  interface HTMLOuiModalElement extends Components.OuiModal, HTMLStencilElement {}
  var HTMLOuiModalElement: {
    prototype: HTMLOuiModalElement;
    new (): HTMLOuiModalElement;
  };

  interface HTMLOuiNavBarElement extends Components.OuiNavBar, HTMLStencilElement {}
  var HTMLOuiNavBarElement: {
    prototype: HTMLOuiNavBarElement;
    new (): HTMLOuiNavBarElement;
  };

  interface HTMLOuiNotificationButtonElement extends Components.OuiNotificationButton, HTMLStencilElement {}
  var HTMLOuiNotificationButtonElement: {
    prototype: HTMLOuiNotificationButtonElement;
    new (): HTMLOuiNotificationButtonElement;
  };

  interface HTMLOuiNotificationDrawerElement extends Components.OuiNotificationDrawer, HTMLStencilElement {}
  var HTMLOuiNotificationDrawerElement: {
    prototype: HTMLOuiNotificationDrawerElement;
    new (): HTMLOuiNotificationDrawerElement;
  };

  interface HTMLOuiNotificationItemElement extends Components.OuiNotificationItem, HTMLStencilElement {}
  var HTMLOuiNotificationItemElement: {
    prototype: HTMLOuiNotificationItemElement;
    new (): HTMLOuiNotificationItemElement;
  };

  interface HTMLOuiNotificationTrayElement extends Components.OuiNotificationTray, HTMLStencilElement {}
  var HTMLOuiNotificationTrayElement: {
    prototype: HTMLOuiNotificationTrayElement;
    new (): HTMLOuiNotificationTrayElement;
  };

  interface HTMLOuiSvgElement extends Components.OuiSvg, HTMLStencilElement {}
  var HTMLOuiSvgElement: {
    prototype: HTMLOuiSvgElement;
    new (): HTMLOuiSvgElement;
  };

  interface HTMLOuiTmSwitchElement extends Components.OuiTmSwitch, HTMLStencilElement {}
  var HTMLOuiTmSwitchElement: {
    prototype: HTMLOuiTmSwitchElement;
    new (): HTMLOuiTmSwitchElement;
  };
  interface HTMLElementTagNameMap {
    'oui-accordion': HTMLOuiAccordionElement;
    'oui-card': HTMLOuiCardElement;
    'oui-card-heading': HTMLOuiCardHeadingElement;
    'oui-collapsable': HTMLOuiCollapsableElement;
    'oui-documents-icon': HTMLOuiDocumentsIconElement;
    'oui-drawer': HTMLOuiDrawerElement;
    'oui-drawer-item': HTMLOuiDrawerItemElement;
    'oui-file-upload': HTMLOuiFileUploadElement;
    'oui-modal': HTMLOuiModalElement;
    'oui-nav-bar': HTMLOuiNavBarElement;
    'oui-notification-button': HTMLOuiNotificationButtonElement;
    'oui-notification-drawer': HTMLOuiNotificationDrawerElement;
    'oui-notification-item': HTMLOuiNotificationItemElement;
    'oui-notification-tray': HTMLOuiNotificationTrayElement;
    'oui-svg': HTMLOuiSvgElement;
    'oui-tm-switch': HTMLOuiTmSwitchElement;
  }
}

declare namespace LocalJSX {
  interface OuiAccordion {}
  interface OuiCard {}
  interface OuiCardHeading {}
  interface OuiCollapsable {
    /**
    * Set drawer position to right or left
    */
    'expanded'?: boolean;
    /**
    * Set drawer drawerTitle
    */
    'label'?: string;
    /**
    * Triggered when item collaspes
    */
    'onCollapse'?: (event: CustomEvent<any>) => void;
    /**
    * Triggered when the item expands
    */
    'onExpand'?: (event: CustomEvent<any>) => void;
  }
  interface OuiDocumentsIcon {
    'isAnimating'?: boolean;
    'isFannedOut'?: boolean;
    'isHighlighted'?: boolean;
  }
  interface OuiDrawer {
    /**
    * Set drawer drawerTitle
    */
    'drawerTitle'?: string;
    /**
    * Triggered when the drawer close
    */
    'onClose'?: (event: CustomEvent<any>) => void;
    /**
    * Triggered when the drawer open
    */
    'onOpen'?: (event: CustomEvent<any>) => void;
    /**
    * Open and close drawer
    */
    'opened'?: boolean;
    /**
    * Set drawer position to right or left
    */
    'position'?: string;
    /**
    * Set drawer size
    */
    'size'?: string;
  }
  interface OuiDrawerItem {
    /**
    * Open link in a new tab. Only for links
    */
    'external'?: boolean;
    /**
    * Set drawer item link if string will be treated as a url or as a callback if it is a function
    */
    'link'?: string;
  }
  interface OuiFileUpload {
    /**
    * Specify mime types to accept (unrestricted by default) Separate by spaces for multiple: `text/html text/xml`
    */
    'accept'?: string;
    /**
    * Specify a label for the button.
    */
    'btnLabel'?: string;
    /**
    * Specify a title for the modal.
    */
    'modalTitle'?: string;
    /**
    * Files dropped onto page, and validated. You can use this event to perform an upload in javscript
    */
    'onDropped'?: (event: CustomEvent<FileUploadHandler>) => void;
  }
  interface OuiModal {
    /**
    * Emitted when modal is closed via button or esc
    */
    'onClose'?: (event: CustomEvent<any>) => void;
  }
  interface OuiNavBar {}
  interface OuiNotificationButton {
    /**
    * Number of unread notifications
    */
    'count'?: number;
    /**
    * Number of unread notifications
    */
    'unread'?: number;
  }
  interface OuiNotificationDrawer {
    /**
    * This property enables/disables the "Clear All" Button
    */
    'disabled'?: boolean;
  }
  interface OuiNotificationItem {
    /**
    * A single notification message
    */
    'detail'?: string;
    /**
    * Topic/Header of the notification message
    */
    'name'?: string;
    /**
    * A single notification object
    */
    'read'?: boolean;
    /**
    * Types of the linkref
    */
    'type'?: "link" | "info";
    /**
    * Status of the action represented by the message
    */
    'valence'?: "success" | "fail";
  }
  interface OuiNotificationTray {
    /**
    * Total count of the notifications
    */
    'count'?: number;
    /**
    * Direction of the drawer
    */
    'direction'?: "to-right" | "to-left";
    /**
    * Event signifying current event has been read
    */
    'onDismiss'?: (event: CustomEvent<string>) => void;
    /**
    * Event signifying all events have been read
    */
    'onDismissall'?: (event: CustomEvent<string>) => void;
    /**
    * Open or close the notification drawer
    */
    'opened'?: boolean;
    /**
    * Total count of notifications left to read
    */
    'unread'?: number;
  }
  interface OuiSvg {
    'name'?: SvgPack;
    'scale'?: number;
  }
  interface OuiTmSwitch {}

  interface IntrinsicElements {
    'oui-accordion': OuiAccordion;
    'oui-card': OuiCard;
    'oui-card-heading': OuiCardHeading;
    'oui-collapsable': OuiCollapsable;
    'oui-documents-icon': OuiDocumentsIcon;
    'oui-drawer': OuiDrawer;
    'oui-drawer-item': OuiDrawerItem;
    'oui-file-upload': OuiFileUpload;
    'oui-modal': OuiModal;
    'oui-nav-bar': OuiNavBar;
    'oui-notification-button': OuiNotificationButton;
    'oui-notification-drawer': OuiNotificationDrawer;
    'oui-notification-item': OuiNotificationItem;
    'oui-notification-tray': OuiNotificationTray;
    'oui-svg': OuiSvg;
    'oui-tm-switch': OuiTmSwitch;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'oui-accordion': LocalJSX.OuiAccordion & JSXBase.HTMLAttributes<HTMLOuiAccordionElement>;
      'oui-card': LocalJSX.OuiCard & JSXBase.HTMLAttributes<HTMLOuiCardElement>;
      'oui-card-heading': LocalJSX.OuiCardHeading & JSXBase.HTMLAttributes<HTMLOuiCardHeadingElement>;
      'oui-collapsable': LocalJSX.OuiCollapsable & JSXBase.HTMLAttributes<HTMLOuiCollapsableElement>;
      'oui-documents-icon': LocalJSX.OuiDocumentsIcon & JSXBase.HTMLAttributes<HTMLOuiDocumentsIconElement>;
      'oui-drawer': LocalJSX.OuiDrawer & JSXBase.HTMLAttributes<HTMLOuiDrawerElement>;
      'oui-drawer-item': LocalJSX.OuiDrawerItem & JSXBase.HTMLAttributes<HTMLOuiDrawerItemElement>;
      'oui-file-upload': LocalJSX.OuiFileUpload & JSXBase.HTMLAttributes<HTMLOuiFileUploadElement>;
      'oui-modal': LocalJSX.OuiModal & JSXBase.HTMLAttributes<HTMLOuiModalElement>;
      'oui-nav-bar': LocalJSX.OuiNavBar & JSXBase.HTMLAttributes<HTMLOuiNavBarElement>;
      'oui-notification-button': LocalJSX.OuiNotificationButton & JSXBase.HTMLAttributes<HTMLOuiNotificationButtonElement>;
      'oui-notification-drawer': LocalJSX.OuiNotificationDrawer & JSXBase.HTMLAttributes<HTMLOuiNotificationDrawerElement>;
      'oui-notification-item': LocalJSX.OuiNotificationItem & JSXBase.HTMLAttributes<HTMLOuiNotificationItemElement>;
      'oui-notification-tray': LocalJSX.OuiNotificationTray & JSXBase.HTMLAttributes<HTMLOuiNotificationTrayElement>;
      'oui-svg': LocalJSX.OuiSvg & JSXBase.HTMLAttributes<HTMLOuiSvgElement>;
      'oui-tm-switch': LocalJSX.OuiTmSwitch & JSXBase.HTMLAttributes<HTMLOuiTmSwitchElement>;
    }
  }
}


