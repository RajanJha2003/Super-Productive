import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

// Function to initialize Prisma Client
function initializePrisma() {
  if (process.env.NODE_ENV !== "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}

// Initialize Prisma Client
initializePrisma();

// Connect to the database
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

// Call the connect function immediately
connectToDatabase();

// Export the db instance for use throughout the project
export const db = prisma;