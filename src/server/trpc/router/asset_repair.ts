import { z } from "zod"
import { authedProcedure, t } from "../trpc"
import {
  AssetRepairCreateInput,
  AssetRepairEditInput,
} from "../../schemas/asset"
import { TRPCError } from "@trpc/server"

export const assetRepairRouter = t.router({
  findOne: authedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const assetRepair = await ctx.prisma.assetRepair.findUnique({
      where: {
        id: input,
      },
      include: {
        asset: true,
      },
    })
    return assetRepair
  }),
  findAsset: authedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const assetRepair = await ctx.prisma.assetRepair.findUnique({
      where: {
        assetId: input,
      },
    })
    return assetRepair
  }),
  findAll: authedProcedure
    .input(
      z
        .object({
          page: z.number().optional(),
          limit: z.number().optional(),
          search: z
            .object({
              description: z.string().optional(),
              assetPart: z.string().optional(),
              notes: z.string().optional(),
              repairStatus: z.string().optional(),
              assetId: z.number().optional(),
              remarks: z.string().optional(),
            })
            .optional(),
          filter: z
            .object({
              updatedAt: z.date().optional(),
            })
            .optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const [assetRepairs, count] = await ctx.prisma.$transaction([
        ctx.prisma.assetRepair.findMany({
          orderBy: {
            createdAt: "asc",
          },
          include: {
            asset: true,
          },
          where: {
            repairStatus: input?.search?.repairStatus,
            NOT: {
              deleted: true,
            },
          },
          skip: input?.page
            ? (input.page - 1) * (input.limit ?? 10)
            : undefined,
          take: input?.limit ?? 10,
        }),
        ctx.prisma.assetRepair.count({
          where: {
            NOT: {
              deleted: true,
            },
          },
        }),
      ])

      return {
        assetRepairs,
        count,
        pages: Math.ceil(count / (input?.limit ?? 0)),
        total: count,
      }
    }),
  create: authedProcedure
    .input(AssetRepairCreateInput)
    .mutation(async ({ ctx, input }) => {
      const { assetId, ...rest } = input

      const assetRepair = await ctx.prisma.assetRepair.create({
        data: {
          asset: {
            connect: {
              id: assetId,
            },
          },
          ...rest,
        },
        include: {
          asset: true,
        },
      })
      return assetRepair
    }),
  edit: authedProcedure
    .input(AssetRepairEditInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      try {
        await ctx.prisma.assetRepair.update({
          where: {
            id,
          },
          data: {
            ...rest,
          },
        })

        return "Asset updated successfully"
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify(error),
        })
      }
    }),
})
