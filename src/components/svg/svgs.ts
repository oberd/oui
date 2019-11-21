export type SvgLoader = () => Promise<string>;
type ImportFn = () => Promise<any>;
export interface SvgMap {
  [key: string]: {
    loader: SvgLoader;
    width: number;
    height: number;
  };
}
const toString = (src: ImportFn): SvgLoader => {
  return async () => {
    const content: any = await src();
    return content.default.toString();
  };
};
const iconSize = { width: 24, height: 24 };
export const svgs: SvgMap = {
  logo: {
    loader: toString(() => import("./svg/oui-logo.svg")),
    width: 266,
    height: 145
  },
  "logo-light-bg": {
    loader: toString(() => import("./svg/oui-logo-light-bg.svg")),
    width: 266,
    height: 145
  },
  "icon-close": {
    loader: toString(() => import("./svg/icon-close.svg")),
    ...iconSize
  },
  "icon-filter": {
    loader: toString(() => import("./svg/icon-filter.svg")),
    ...iconSize
  },
  "noti-bell-unread": {
    loader: toString(() => import("./svg/noti-bell-unread.svg")),
    width: 150,
    height: 150
  },
  "noti-bell-read": {
    loader: toString(() => import("./svg/noti-bell-read.svg")),
    width: 150,
    height: 150
  },
  "noti-bell-unused": {
    loader: toString(() => import("./svg/noti-bell-unused.svg")),
    width: 150,
    height: 150
  }
};
export type SvgPack = keyof typeof svgs;
