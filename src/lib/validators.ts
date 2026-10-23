import { z } from "zod";

export const indianPinCodeSchema = z.string().regex(/^[1-9][0-9]{5}$/, "Invalid Indian PIN code");
export const indianMobileSchema = z
  .string()
  .regex(/^[6-9][0-9]{9}$/, "Invalid Indian mobile number");

export const storeSettingsSchema = z.object({
  storeName: z.string().min(2),
  supportEmail: z.string().email().optional().or(z.literal("")),
  supportPhone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  freeShippingAbove: z.number().nonnegative().optional(),
  minOrderValue: z.number().nonnegative().optional(),
  maxOrderValue: z.number().nonnegative().optional(),
  maintenanceMode: z.boolean().optional(),
  codEnabled: z.literal(true)
});

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  parentId: z.string().optional(),
  imageUrl: z.string().url().optional(),
  sortOrder: z.number().int().optional()
});

export const brandSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  logoUrl: z.string().url().optional(),
  description: z.string().optional()
});

export const productCreateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  sku: z.string().min(2),
  brandId: z.string().optional(),
  categoryId: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  variants: z
    .array(
      z.object({
        variantName: z.string().min(1),
        sku: z.string().min(1),
        mrp: z.number().positive(),
        salePrice: z.number().positive().optional(),
        stockQty: z.number().int().nonnegative(),
        lowStockThreshold: z.number().int().nonnegative().optional(),
        flavour: z.string().optional(),
        sizeLabel: z.string().optional()
      })
    )
    .min(1)
});
