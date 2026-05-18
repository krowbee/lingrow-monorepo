export type StatusType = "PUBLISHED" | "DRAFT" | "ARCHIVED";
export const Status: { [key in StatusType]: StatusType } = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
  ARCHIVED: "ARCHIVED",
};
