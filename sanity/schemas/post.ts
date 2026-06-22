import { DocumentTextIcon, ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const POST_CATEGORIES = [
  "Inventory Accuracy",
  "Warehouse Workflows",
  "Manual Reporting",
  "Custom vs Off-the-Shelf",
  "Multi-Location Operations",
  "Software Audits",
] as const;

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Metadata" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "meta",
      options: {
        list: POST_CATEGORIES.map((value) => ({ title: value, value })),
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) =>
        rule.required().max(200).warning("Keep the excerpt under 200 characters."),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      group: "meta",
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          name: "codeBlock",
          title: "Code block",
          type: "object",
          icon: ImageIcon,
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "Plain text", value: "text" },
                  { title: "TypeScript", value: "typescript" },
                  { title: "JavaScript", value: "javascript" },
                  { title: "TSX", value: "tsx" },
                  { title: "JSX", value: "jsx" },
                  { title: "JSON", value: "json" },
                  { title: "Bash", value: "bash" },
                  { title: "CSS", value: "css" },
                  { title: "HTML", value: "html" },
                  { title: "Python", value: "python" },
                  { title: "Go", value: "go" },
                  { title: "SQL", value: "sql" },
                ],
                layout: "dropdown",
              },
              initialValue: "text",
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
              rows: 8,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "language", subtitle: "code" },
          },
        }),
        defineArrayMember({
          name: "inlineImage",
          title: "Image",
          type: "object",
          icon: ImageIcon,
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", subtitle: "alt", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Falls back to the post title.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "Falls back to the excerpt.",
    }),
  ],
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "category" },
  },
});
