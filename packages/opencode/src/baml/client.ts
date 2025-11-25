import { BamlClient } from "@boundaryml/baml"

// Initialize BAML client
export const baml = new BamlClient({
  baseUrl: process.env.BAML_API_URL || "http://localhost:2024",
  apiKey: process.env.BAML_API_KEY,
})

// Type-safe wrapper for agent functions
export async function executeAgentFunction<T>(
  functionName: string,
  args: any
): Promise<T> {
  try {
    const result = await baml.call(functionName, args)
    return result as T
  } catch (error) {
    console.error(`BAML execution failed for ${functionName}:`, error)
    throw error
  }
}
