"use client";
import { usePathname } from "next/navigation";
import Settings from "./settingsOptions/Settings";
import CreatedWorkspacesInfo from "@/components/common/CreatedWorkspacesInfo";
import { Workspace } from "@prisma/client";
import WorkspaceOptions from "./workspaceOptions/WorkspaceOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import PomodoroLinks from "./pomodro/PomodoroLinks";
import AssignedToMeFilter from "./assignedToMeFilter/AssignedToMeFilter";

interface Props {
  createdWorkspaces: number;
  userAdminWorkspaces: Workspace[];
  userWorkspaces: Workspace[];
}

export const OptionsSidebar = ({
  createdWorkspaces,
  userAdminWorkspaces,
  userWorkspaces,
}: Props) => {
  const pathname = usePathname();

  // Split the pathname into segments
  const segments = pathname.split("/");
  const hasLangSegment = segments[1]?.length === 2; // Check for language code
  const baseIndex = hasLangSegment ? 2 : 1;

  const urlWorkspaceId: string | undefined = segments[baseIndex + 2];
  const urlAdditionalId: string | undefined = segments[baseIndex + 5];
  const chatId: string | undefined = segments[baseIndex + 4];
  const workspaceId = urlWorkspaceId || "";

  // Debugging logs
  console.log({ pathname, segments, urlWorkspaceId, urlAdditionalId, chatId, workspaceId });

  // Adjust path comparisons to account for language segment
  const basePath = hasLangSegment ? `/${segments[1]}` : "";

  if (
    pathname === `${basePath}/dashboard` ||
    pathname === `${basePath}/dashboard/starred` ||
    pathname === `${basePath}/dashboard/calendar` ||
    (urlAdditionalId &&
      pathname ===
        `${basePath}/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}/edit`) ||
    (urlAdditionalId &&
      pathname ===
        `${basePath}/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}/edit`)
  ) {
    return null;
  }

  return (
    <div className="border-r sm:w-64 w-52 h-full p-4 sm:py-6 flex flex-col justify-between">
      <ScrollArea className="h-full">
        {pathname.includes(`${basePath}/dashboard/settings`) && (
          <Settings userAdminWorkspaces={userAdminWorkspaces} />
        )}
        {(pathname === `${basePath}/dashboard/workspace/${workspaceId}` ||
          pathname ===
            `${basePath}/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}` ||
          pathname ===
            `${basePath}/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}` ||
          pathname === `${basePath}/dashboard/workspace/${workspaceId}/chat/${chatId}`)  && (
          <WorkspaceOptions workspaceId={workspaceId} />
        ) }

{(pathname === `${basePath}/dashboard/pomodoro` ||
          pathname === `${basePath}/dashboard/pomodoro/settings`) && <PomodoroLinks />}
          {pathname === `${basePath}/dashboard/assigned-to-me` && (
          <AssignedToMeFilter userWorkspaces={userWorkspaces} />
        )}
      </ScrollArea>

      <CreatedWorkspacesInfo createNumber={createdWorkspaces} />
    </div>
  );
};
