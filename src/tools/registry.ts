import type { Tool, ToolRegistry, ToolType } from "../types/Tool";
import { FillTool } from "./FillTool";
import { ShapeTool } from "./ShapeTool";

let registry: ToolRegistry | null = null;

const createRegistry = (): ToolRegistry => ({
  shape: new ShapeTool(),
  fill: new FillTool(),
});

export const getToolRegistry = (): ToolRegistry => {
  if (!registry) {
    registry = createRegistry();
  }
  return registry;
};

export const getToolByType = (toolType: ToolType | null): Tool | null => {
  if (!toolType) {
    return null;
  }

  const tools = getToolRegistry();
  return tools[toolType] ?? null;
};

export const registerTool = (toolType: ToolType, toolInstance: Tool) => {
  registry = {
    ...getToolRegistry(),
    [toolType]: toolInstance,
  };
};
