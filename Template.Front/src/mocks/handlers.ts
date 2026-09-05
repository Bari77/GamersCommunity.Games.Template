import { createGatewayListHandler } from "@bari77/gc-msw";
import { environment } from "../environments/environment";
import { mockItems } from "./data/items";

export const handlers = [
  createGatewayListHandler({
    apiUrl: environment.apiUrl,
    microservice: "template",
    resource: "Items",
    data: mockItems,
  }),
];
