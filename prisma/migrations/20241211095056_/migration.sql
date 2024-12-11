-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('ADMIN', 'CAN_EDIT', 'READ_ONLY', 'OWNER');

-- CreateEnum
CREATE TYPE "UseCase" AS ENUM ('WORK', 'STUDY', 'PERSONAL_USE');

-- CreateEnum
CREATE TYPE "NotifyType" AS ENUM ('NEW_USER_IN_WORKSPACE', 'USER_LEFT_WORKSPACE', 'NEW_TASK', 'NEW_MIND_MAP', 'NEW_ROLE', 'NEW_ASSIGNMENT_TASK', 'NEW_ASSIGNMENT_MIND_MAP');

-- CreateEnum
CREATE TYPE "AdditionalResourceTypes" AS ENUM ('PDF', 'IMAGE');

-- CreateEnum
CREATE TYPE "PomodoroSoundEffect" AS ENUM ('ANALOG', 'BIRD', 'CHURCH_BELL', 'DIGITAL', 'FANCY', 'BELL');

-- CreateEnum
CREATE TYPE "CustomColors" AS ENUM ('PURPLE', 'RED', 'GREEN', 'BLUE', 'PINK', 'YELLOW', 'ORANGE', 'CYAN', 'LIME', 'EMERALD', 'INDIGO', 'FUCHSIA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "surname" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "hashedPassword" TEXT,
    "image" TEXT,
    "completedOnboarding" BOOLEAN NOT NULL DEFAULT false,
    "lastTimeActive" TIMESTAMP(3),
    "useCase" "UseCase",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savedMindMaps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mindMapId" TEXT NOT NULL,

    CONSTRAINT "savedMindMaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notifyCreatorId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "clicked" BOOLEAN NOT NULL DEFAULT false,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notifyType" "NotifyType" NOT NULL,
    "newUserRole" "UserPermission",
    "taskId" TEXT,
    "mindMapId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additionalResource" (
    "id" TEXT NOT NULL,
    "messageId" TEXT,
    "type" "AdditionalResourceTypes" NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "additionalResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT,
    "image" TEXT,
    "color" "CustomColors" NOT NULL DEFAULT 'BLUE',
    "inviteCode" TEXT NOT NULL,
    "adminCode" TEXT NOT NULL,
    "canEditCode" TEXT NOT NULL,
    "readOnlyCode" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedUserId" TEXT,
    "creatorId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '1f9e0',
    "content" JSONB,
    "dateId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savedTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "savedTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PomodoroSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workDuration" INTEGER NOT NULL DEFAULT 25,
    "shortBreakDuration" INTEGER NOT NULL DEFAULT 5,
    "longBreakDuration" INTEGER NOT NULL DEFAULT 15,
    "longBreakInterval" INTEGER NOT NULL DEFAULT 2,
    "rounds" INTEGER NOT NULL DEFAULT 3,
    "soundEffect" "PomodoroSoundEffect" NOT NULL DEFAULT 'BELL',
    "soundEffectVolume" DOUBLE PRECISION NOT NULL DEFAULT 0.5,

    CONSTRAINT "PomodoroSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignedToTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "assignedToTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignedToMindMap" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mindMapId" TEXT NOT NULL,

    CONSTRAINT "assignedToMindMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" "CustomColors" NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskDate" (
    "id" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,

    CONSTRAINT "TaskDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userRole" "UserPermission" NOT NULL DEFAULT 'READ_ONLY',

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("userId","workspaceId")
);

-- CreateTable
CREATE TABLE "MindMap" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,
    "updatedUserId" TEXT,
    "workspaceId" TEXT NOT NULL,
    "content" JSONB,
    "title" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '1f9e0',

    CONSTRAINT "MindMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTask" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MindMapToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_workspaceId_key" ON "Conversation"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_inviteCode_key" ON "Workspace"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_adminCode_key" ON "Workspace"("adminCode");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_canEditCode_key" ON "Workspace"("canEditCode");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_readOnlyCode_key" ON "Workspace"("readOnlyCode");

-- CreateIndex
CREATE INDEX "MindMap_workspaceId_idx" ON "MindMap"("workspaceId");

-- CreateIndex
CREATE INDEX "MindMap_updatedUserId_idx" ON "MindMap"("updatedUserId");

-- CreateIndex
CREATE INDEX "MindMap_creatorId_idx" ON "MindMap"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTask_AB_unique" ON "_TagToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTask_B_index" ON "_TagToTask"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MindMapToTag_AB_unique" ON "_MindMapToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MindMapToTag_B_index" ON "_MindMapToTag"("B");

-- AddForeignKey
ALTER TABLE "savedMindMaps" ADD CONSTRAINT "savedMindMaps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedMindMaps" ADD CONSTRAINT "savedMindMaps_mindMapId_fkey" FOREIGN KEY ("mindMapId") REFERENCES "MindMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notifyCreatorId_fkey" FOREIGN KEY ("notifyCreatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additionalResource" ADD CONSTRAINT "additionalResource_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_updatedUserId_fkey" FOREIGN KEY ("updatedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "TaskDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedTask" ADD CONSTRAINT "savedTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedTask" ADD CONSTRAINT "savedTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PomodoroSettings" ADD CONSTRAINT "PomodoroSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedToTask" ADD CONSTRAINT "assignedToTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedToTask" ADD CONSTRAINT "assignedToTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedToMindMap" ADD CONSTRAINT "assignedToMindMap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedToMindMap" ADD CONSTRAINT "assignedToMindMap_mindMapId_fkey" FOREIGN KEY ("mindMapId") REFERENCES "MindMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindMap" ADD CONSTRAINT "MindMap_updatedUserId_fkey" FOREIGN KEY ("updatedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindMap" ADD CONSTRAINT "MindMap_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindMap" ADD CONSTRAINT "MindMap_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTask" ADD CONSTRAINT "_TagToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTask" ADD CONSTRAINT "_TagToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MindMapToTag" ADD CONSTRAINT "_MindMapToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "MindMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MindMapToTag" ADD CONSTRAINT "_MindMapToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
