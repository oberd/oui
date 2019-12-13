export interface NotiMessageProps {
  title: string
  link?: string
  type: "link" | "info"
  detail: string
  valence: "success" | "fail"
}
