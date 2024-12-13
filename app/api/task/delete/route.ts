import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteTaskSchema } from "@/schema/taskSchema";
import { NotifyType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    // Get the authentication session
    const session = await getAuthSession();

    // If no user is authenticated, return unauthorized
    if (!session?.user) {
      return NextResponse.json("Unauthorized", {
        status: 401,
      });
    }

    // Check if the request has a body
    const contentType = request.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json("Invalid content type", { status: 400 });
    }

    // Parse the request body
    const body = await request.json();

    // Log the body for debugging purposes
    console.log("Received request body:", body);

    // Check if the body is null or not an object
    if (!body || typeof body !== 'object') {
      return NextResponse.json("Invalid request payload", { status: 400 });
    }

    // Validate the body using the schema
    const result = deleteTaskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json("Invalid data provided", {
        status: 400,
      });
    }

    const { workspaceId, taskId } = result.data;

    // Fetch the user and their subscriptions
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscriptions: {
          where: { workspaceId },
          select: { userRole: true },
        },
      },
    });

    // If user not found, return 404
    if (!user) {
      return NextResponse.json("User  not found", {
        status: 404,
      });
    }

    // If user role is READ_ONLY, deny task deletion
    if (user.subscriptions[0]?.userRole === "READ_ONLY") {
      return NextResponse.json("No permission to delete tasks", {
        status: 403,
      });
    }

    // Find the task by its ID
    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { taskDate: true },
    });

    // If task not found, return 404
    if (!task) {
      return NextResponse.json("Task not found", {
        status: 404,
      });
    }

    // Delete the task from the database
    await db.task.delete({
      where: { id: task.id },
    });

    // Delete notifications related to the task
    await db.notification.deleteMany({
      where: {
        workspaceId,
        taskId: task.id,
        notifyType: NotifyType.NEW_TASK,
      },
    });

    // Return success message
    return NextResponse.json("Task deleted successfully", {
      status: 200,
    });
  } catch (error) {
    // Log the error for debugging purposes
    if (error instanceof Error) {
      console.error("Server Error:", error.message);
    } else {
      console.error("Server Error:", error);
    }

    // Return 500 Internal Server Error
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}