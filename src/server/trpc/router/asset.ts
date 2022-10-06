import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { AssetCreateInput, AssetEditInput } from "../../common/input-types";
import { authedProcedure, t } from "../trpc";

export const assetRouter = t.router({
  findAll: authedProcedure.query(async ({ ctx }) => {
    const assets = await ctx.prisma.asset.findMany();
    return assets;
  }),
  findOne: authedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const asset = await ctx.prisma.asset.findUnique({
      where: {
        id: input,
      },
      include: {
        category: true,
        location: true,
        model: true,
        type: true,
        manufacturer: true,
        supplier: true,
      },
    });
    return asset;
  }),
  create: authedProcedure
    .input(AssetCreateInput)
    .mutation(async ({ ctx, input }) => {
      const { model, ...rest } = input;

      try {
        await ctx.prisma.$transaction(
          [
            ctx.prisma.asset.create({
              data: {
                ...rest,
              },
            }),
            ctx.prisma.asset.update({
              where: {
                number: rest.number,
              },
              data: {
                model: {
                  create: model ?? undefined,
                },
              },
            }),
          ],
          {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          }
        );

        return "Asset successfully created";
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify(error),
        });
      }
    }),
  edit: authedProcedure
    .input(AssetEditInput)
    .mutation(async ({ ctx, input }) => {
      const { model, id, ...rest } = input;

      try {
        await ctx.prisma.$transaction(
          [
            ctx.prisma.asset.update({
              where: {
                id,
              },
              data: {
                ...rest,
              },
            }),
            ctx.prisma.asset.update({
              where: {
                id,
              },
              data: {
                model: {
                  create: {
                    ...model,
                    name: model?.name ?? "",
                  },
                },
              },
            }),
          ],
          {}
        );
        return "Asset successfully edited";
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify(error),
        });
      }
    }),
  delete: authedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.asset.update({
        where: {
          id: input,
        },
        data: {
          deleted: true,
          deletedAt: new Date(),
        },
      });
      return "Asset successfully deleted";
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify(error),
      });
    }
  }),
});
