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
  "noti-bell": {
      loader: toString(() => import("./svg/Font_Awesome_5_regular_bell.svg")),
      width: 150,
      height: 150
  }
};
export type SvgPack = keyof typeof svgs;
