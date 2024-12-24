import { defineSchema, defineTable} from 'convex/server';
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({ // Table name is "documents"
      title: v.string(),
      userId: v.string(),
      isArchived: v.boolean(),
      parentDocument: v.optional(v.id("documents")), // Matches "documents"
      content: v.optional(v.string()),
      coverImage: v.optional(v.string()),
      icon: v.optional(v.string()),
      isPublished: v.boolean(),
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"])
});