import { XMLParser } from "fast-xml-parser"

export interface POMLNode {
    tag: string
    attributes: Record<string, string>
    content: string | POMLNode[]
}

export class POMLParser {
    private parser: XMLParser

    constructor() {
        this.parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "",
        })
    }

    parse(pomlContent: string): POMLNode {
        try {
            const result = this.parser.parse(pomlContent)
            return this.transformToNode(result)
        } catch (error) {
            throw new Error(`Failed to parse POML: ${error}`)
        }
    }

    private transformToNode(obj: any): POMLNode {
        // Simplified transformation logic for prototype
        const keys = Object.keys(obj)
        if (keys.length === 0) return { tag: "root", attributes: {}, content: "" }

        const tag = keys[0]
        const value = obj[tag]

        // Handle attributes and content...
        // This is a simplified mock implementation for the prototype
        return {
            tag,
            attributes: {},
            content: typeof value === "string" ? value : JSON.stringify(value)
        }
    }

    render(node: POMLNode): string {
        // Basic renderer
        return `<${node.tag}>${node.content}</${node.tag}>`
    }
}
