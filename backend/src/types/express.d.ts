declare namespace Express {
  interface Request {
    userId?: string;
    user?: import("@prisma/client").User;
  }
}
