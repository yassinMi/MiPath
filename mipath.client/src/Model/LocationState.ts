import type { ProjectStatus } from "./ProjectStatus";

export interface LocationState {
    projectId?:number,
    projectName?:string,
    projectStatus?:ProjectStatus,
    taskName?:string,
    pageType: "home"|"projectOverview"|"projectTasks"|"todayOverview"|"thisweekOverview"|"about"|"projects"|"tasks"|"login"
}