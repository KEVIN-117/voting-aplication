import { z } from "zod"

export const CharacterCreateSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "Id is required"
    }).trim(),
    name: z.string({
      required_error: "Name is required"
    }).trim().min(
      4,
      {
        message: "Name must be at least 4 characters long"
      }
    ),
    description: z.string({
      required_error: "Description is required"
    }).trim().min(
      4,
      {
        message: "Description must be at least 4 characters long"
      }
    ),
    createdAt: z.date({
      required_error: "Created at is required"
    }).default(() => new Date()),
    updatedAt: z.date({
      required_error: "Updated at is required"
    }).default(() => new Date())
  }).omit({
    createdAt: true,
    updatedAt: true,
    id: true
  }),
  query: z.object({}),
  params: z.object({})
}).omit({
  query: true,
  params: true
})

export const CharacterUpdateSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required"
    }).trim().min(
      4,
      {
        message: "Name must be at least 4 characters long"
      }
    ),
    description: z.string({
      required_error: "Description is required"
    }).trim().min(
      4,
      {
        message: "Description must be at least 4 characters long"
      }
    ),
    updatedAt: z.date({
      required_error: "Updated at is required"
    }).default(() => new Date())
  }).omit({
    updatedAt: true,
  }),
  query: z.object({}),
  params: z.object({
    id: z.string({
      required_error: "Id is required"
    }).trim()
  })
}).omit({
  query: true
})

export const CharacterGetSchema = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({
    id: z.string({
      required_error: "Id is required"
    }).trim()
  })
}).omit({
  body: true
})

export const CharacterDeleteSchema = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({
    id: z.string({
      required_error: "Id is required"
    }).trim()
  })
}).omit({
  body: true,
  query: true
})

export const CharacterFilterSchema = z.object({
  body: z.object({}),
  query: z.object({
    query: z.string({
      required_error: "Query is required"
    }).trim()
  }),
  params: z.object({})
}).omit({
  body: true,
  params: true
})
