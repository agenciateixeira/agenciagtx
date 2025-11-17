import type { Prisma, PrismaClient } from '@prisma/client';

export function normalizePhone(phone: string): string {
  if (!phone) {
    return '';
  }

  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('55')) {
    return digits;
  }

  return `55${digits}`;
}

export function normalizeEmail(email: string): string {
  return email?.trim().toLowerCase() ?? '';
}

export function normalizeRegion(region: string): string {
  return region?.trim().toLowerCase().replace(/\s+/g, '-') ?? '';
}

export function sanitizeText(text: string): string {
  return text?.replace(/<\/?[^>]+(>|$)/g, '').replace(/\s+/g, ' ').trim() ?? '';
}

export async function removeLeadDuplicates(prisma: PrismaClient, email?: string, phone?: string) {
  if (!email && !phone) {
    return;
  }

  const orClauses: Prisma.LeadWhereInput[] = [];
  if (email) {
    orClauses.push({ email: normalizeEmail(email) });
  }
  if (phone) {
    orClauses.push({ phone: normalizePhone(phone) });
  }

  const duplicates = await prisma.lead.findMany({
    where: {
      OR: orClauses,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (duplicates.length <= 1) {
    return duplicates.at(0);
  }

  const [newest, ...rest] = duplicates;
  await prisma.lead.deleteMany({
    where: { id: { in: rest.map((lead) => lead.id) } },
  });

  return newest;
}
