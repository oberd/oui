/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  FileDropEvent,
} from './components/file-upload/FileDropEvent';
import {
  SvgPack,
} from './components/svg/svgs';

export namespace Components {
  interface NavButton {}
  interface NavButtonName {}
  interface NavDrawer {
    'open': () => Promise<void>;
    'opened': boolean;
    'title': string;
  }
  interface NavLinks {
    'links': string[];
  }
  interface OuiCard {}
  interface OuiCardHeading {}
  interface OuiDocumentsIcon {
    'isAnimating': boolean;
    'isFannedOut': boolean;
    'isHighlighted': boolean;
  }
  interface OuiFileUpload {
    /**
    * Specify mime types to accept (unrestricted by default) Separate by spaces for multiple: `text/html text/xml`
    */
    'accept': string;
  }
  interface OuiFileUploadModal {}
  interface OuiSvg {
    'name': SvgPack;
    'scale': number;
  }
}

declare global {


  interface HTMLNavButtonElement extends Components.NavButton, HTMLStencilElement {}
  var HTMLNavButtonElement: {
    prototype: HTMLNavButtonElement;
    new (): HTMLNavButtonElement;
  };

  interface HTMLNavButtonNameElement extends Components.NavButtonName, HTMLStencilElement {}
  var HTMLNavButtonNameElement: {
    prototype: HTMLNavButtonNameElement;
    new (): HTMLNavButtonNameElement;
  };

  interface HTMLNavDrawerElement extends Components.NavDrawer, HTMLStencilElement {}
  var HTMLNavDrawerElement: {
    prototype: HTMLNavDrawerElement;
    new (): HTMLNavDrawerElement;
  };

  interface HTMLNavLinksElement extends Components.NavLinks, HTMLStencilElement {}
  var HTMLNavLinksElement: {
    prototype: HTMLNavLinksElement;
    new (): HTMLNavLinksElement;
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

  interface HTMLOuiDocumentsIconElement extends Components.OuiDocumentsIcon, HTMLStencilElement {}
  var HTMLOuiDocumentsIconElement: {
    prototype: HTMLOuiDocumentsIconElement;
    new (): HTMLOuiDocumentsIconElement;
  };

  interface HTMLOuiFileUploadElement extends Components.OuiFileUpload, HTMLStencilElement {}
  var HTMLOuiFileUploadElement: {
    prototype: HTMLOuiFileUploadElement;
    new (): HTMLOuiFileUploadElement;
  };

  interface HTMLOuiFileUploadModalElement extends Components.OuiFileUploadModal, HTMLStencilElement {}
  var HTMLOuiFileUploadModalElement: {
    prototype: HTMLOuiFileUploadModalElement;
    new (): HTMLOuiFileUploadModalElement;
  };

  interface HTMLOuiSvgElement extends Components.OuiSvg, HTMLStencilElement {}
  var HTMLOuiSvgElement: {
    prototype: HTMLOuiSvgElement;
    new (): HTMLOuiSvgElement;
  };
  interface HTMLElementTagNameMap {
    'nav-button': HTMLNavButtonElement;
    'nav-button-name': HTMLNavButtonNameElement;
    'nav-drawer': HTMLNavDrawerElement;
    'nav-links': HTMLNavLinksElement;
    'oui-card': HTMLOuiCardElement;
    'oui-card-heading': HTMLOuiCardHeadingElement;
    'oui-documents-icon': HTMLOuiDocumentsIconElement;
    'oui-file-upload': HTMLOuiFileUploadElement;
    'oui-file-upload-modal': HTMLOuiFileUploadModalElement;
    'oui-svg': HTMLOuiSvgElement;
  }
}

declare namespace LocalJSX {
  interface NavButton {}
  interface NavButtonName {}
  interface NavDrawer {
    'opened'?: boolean;
    'title'?: string;
  }
  interface NavLinks {
    'links'?: string[];
  }
  interface OuiCard {}
  interface OuiCardHeading {}
  interface OuiDocumentsIcon {
    'isAnimating'?: boolean;
    'isFannedOut'?: boolean;
    'isHighlighted'?: boolean;
  }
  interface OuiFileUpload {
    /**
    * Specify mime types to accept (unrestricted by default) Separate by spaces for multiple: `text/html text/xml`
    */
    'accept'?: string;
    /**
    * Files dropped onto page, and validated. You can use this event to perform an upload in javscript
    */
    'onDropped'?: (event: CustomEvent<FileDropEvent>) => void;
  }
  interface OuiFileUploadModal {
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
    'nav-button': NavButton;
    'nav-button-name': NavButtonName;
    'nav-drawer': NavDrawer;
    'nav-links': NavLinks;
    'oui-card': OuiCard;
    'oui-card-heading': OuiCardHeading;
    'oui-documents-icon': OuiDocumentsIcon;
    'oui-file-upload': OuiFileUpload;
    'oui-file-upload-modal': OuiFileUploadModal;
    'oui-svg': OuiSvg;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'nav-button': LocalJSX.NavButton & JSXBase.HTMLAttributes<HTMLNavButtonElement>;
      'nav-button-name': LocalJSX.NavButtonName & JSXBase.HTMLAttributes<HTMLNavButtonNameElement>;
      'nav-drawer': LocalJSX.NavDrawer & JSXBase.HTMLAttributes<HTMLNavDrawerElement>;
      'nav-links': LocalJSX.NavLinks & JSXBase.HTMLAttributes<HTMLNavLinksElement>;
      'oui-card': LocalJSX.OuiCard & JSXBase.HTMLAttributes<HTMLOuiCardElement>;
      'oui-card-heading': LocalJSX.OuiCardHeading & JSXBase.HTMLAttributes<HTMLOuiCardHeadingElement>;
      'oui-documents-icon': LocalJSX.OuiDocumentsIcon & JSXBase.HTMLAttributes<HTMLOuiDocumentsIconElement>;
      'oui-file-upload': LocalJSX.OuiFileUpload & JSXBase.HTMLAttributes<HTMLOuiFileUploadElement>;
      'oui-file-upload-modal': LocalJSX.OuiFileUploadModal & JSXBase.HTMLAttributes<HTMLOuiFileUploadModalElement>;
      'oui-svg': LocalJSX.OuiSvg & JSXBase.HTMLAttributes<HTMLOuiSvgElement>;
    }
  }
}


