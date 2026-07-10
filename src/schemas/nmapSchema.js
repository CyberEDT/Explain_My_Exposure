import { z } from 'zod';

const portSchema = z.object({
  port: z.number().int().positive(),
  protocol: z.string(),
  service: z.string().optional().default('unknown'),
  version: z.string().optional().default(''),
  extraInfo: z.string().optional().default('')
});

const hostSchema = z.object({
  ip: z.string().min(1, { message: "IP address is required" }),
  mac: z.string().optional().default(''),
  hostnames: z.array(z.string()).optional().default([]),
  os: z.string().optional().default('Unknown OS'),
  ports: z.array(portSchema).optional().default([])
});

export const nmapDataSchema = z.object({
  hosts: z.array(hostSchema).min(1, { message: "No active hosts discovered in scan data" }),
  scanTime: z.string().optional(),
  type: z.string().optional()
});
