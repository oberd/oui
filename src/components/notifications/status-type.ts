export interface NotiMessageProps {
  notification: string
  link: string
  linkType: "href" | "info"
  info: string
  valence: "success" | "fail"
}
