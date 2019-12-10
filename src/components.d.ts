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
  interface OuiCard {}
  interface OuiCardHeading {}
  interface OuiCollapsable {
    /**
    * Set drawer position to right or left
    */
    'collapsed': boolean;
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
    * Set drawer item action if string will be treated as a url or as a callback if it is a function
    */
    'action': string | DrawerItemAction;
    /**
    * Set drawer item label
    */
    'label': string;
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
  interface OuiSvg {
    'name': SvgPack;
    'scale': number;
  }
}

declare global {


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

  interface HTMLOuiSvgElement extends Components.OuiSvg, HTMLStencilElement {}
  var HTMLOuiSvgElement: {
    prototype: HTMLOuiSvgElement;
    new (): HTMLOuiSvgElement;
  };
  interface HTMLElementTagNameMap {
    'oui-card': HTMLOuiCardElement;
    'oui-card-heading': HTMLOuiCardHeadingElement;
    'oui-collapsable': HTMLOuiCollapsableElement;
    'oui-documents-icon': HTMLOuiDocumentsIconElement;
    'oui-drawer': HTMLOuiDrawerElement;
    'oui-drawer-item': HTMLOuiDrawerItemElement;
    'oui-file-upload': HTMLOuiFileUploadElement;
    'oui-modal': HTMLOuiModalElement;
    'oui-svg': HTMLOuiSvgElement;
  }
}

declare namespace LocalJSX {
  interface OuiCard {}
  interface OuiCardHeading {}
  interface OuiCollapsable {
    /**
    * Set drawer position to right or left
    */
    'collapsed'?: boolean;
    /**
    * Set drawer drawerTitle
    */
    'label'?: string;
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
    * Set drawer item action if string will be treated as a url or as a callback if it is a function
    */
    'action'?: string | DrawerItemAction;
    /**
    * Set drawer item label
    */
    'label'?: string;
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
  interface OuiSvg {
    'name'?: SvgPack;
    'scale'?: number;
  }

  interface IntrinsicElements {
    'oui-card': OuiCard;
    'oui-card-heading': OuiCardHeading;
    'oui-collapsable': OuiCollapsable;
    'oui-documents-icon': OuiDocumentsIcon;
    'oui-drawer': OuiDrawer;
    'oui-drawer-item': OuiDrawerItem;
    'oui-file-upload': OuiFileUpload;
    'oui-modal': OuiModal;
    'oui-svg': OuiSvg;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'oui-card': LocalJSX.OuiCard & JSXBase.HTMLAttributes<HTMLOuiCardElement>;
      'oui-card-heading': LocalJSX.OuiCardHeading & JSXBase.HTMLAttributes<HTMLOuiCardHeadingElement>;
      'oui-collapsable': LocalJSX.OuiCollapsable & JSXBase.HTMLAttributes<HTMLOuiCollapsableElement>;
      'oui-documents-icon': LocalJSX.OuiDocumentsIcon & JSXBase.HTMLAttributes<HTMLOuiDocumentsIconElement>;
      'oui-drawer': LocalJSX.OuiDrawer & JSXBase.HTMLAttributes<HTMLOuiDrawerElement>;
      'oui-drawer-item': LocalJSX.OuiDrawerItem & JSXBase.HTMLAttributes<HTMLOuiDrawerItemElement>;
      'oui-file-upload': LocalJSX.OuiFileUpload & JSXBase.HTMLAttributes<HTMLOuiFileUploadElement>;
      'oui-modal': LocalJSX.OuiModal & JSXBase.HTMLAttributes<HTMLOuiModalElement>;
      'oui-svg': LocalJSX.OuiSvg & JSXBase.HTMLAttributes<HTMLOuiSvgElement>;
    }
  }
}


