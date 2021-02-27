export type Factory<Shape> = (state?: Partial<Shape>) => Shape;

export type ApiErrorResponse = { message: string };
