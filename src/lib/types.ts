export interface Vendor {
  id: string;
  email: string;
  name: string;
  type: 'photographer' | 'caterer' | 'florist';
}

export interface Contract {
  id: string;
  vendorId: string;
  clientName: string;
  eventDate: string;
  eventVenue: string;
  servicePackage: string;
  amount: number;
  content: string;
  status: 'draft' | 'signed';
  createdAt: string;
  updatedAt: string;
  signature?: Signature;
}

export interface Signature {
  id: string;
  contractId: string;
  signatureData: string; // Base64 encoded signature image or text
  signatureType: 'drawn' | 'typed';
  signedAt: string;
  signerName: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  type: 'photographer' | 'caterer' | 'florist';
}

export const TEST_VENDORS: Vendor[] = [
  {
    id: '1',
    email: 'photographer@test.com',
    name: 'Sarah Johnson Photography',
    type: 'photographer'
  },
  {
    id: '2',
    email: 'caterer@test.com',
    name: 'Elegant Catering Co.',
    type: 'caterer'
  },
  {
    id: '3',
    email: 'florist@test.com',
    name: 'Bloom & Blossom Florals',
    type: 'florist'
  }
];

export const AI_CONTRACT_TEMPLATES = {
  photographer: {
    title: "Wedding Photography Services Contract",
    content: `**SERVICE AGREEMENT**

**Photographer:** [Your Name]
**Client:** [Client Name]
**Event Date:** [Event Date]
**Event Venue:** [Event Venue]

**SERVICES INCLUDED:**
- 8 hours of wedding day photography
- Engagement session (1 hour)
- Online gallery with 500+ edited photos
- USB drive with high-resolution images
- Rights to use images for portfolio

**TERMS & CONDITIONS:**
1. A 50% deposit is required to secure the date
2. Final payment is due 2 weeks before the wedding
3. Client will receive edited photos within 6-8 weeks
4. Photographer retains copyright to all images
5. Client may not edit or alter the photographer's work

**CANCELLATION POLICY:**
- 90+ days: Full refund minus $200 processing fee
- 60-89 days: 50% refund
- 30-59 days: 25% refund
- Less than 30 days: No refund

**TOTAL INVESTMENT:** $[Amount]

By signing below, both parties agree to the terms outlined in this contract.`
  },
  caterer: {
    title: "Wedding Catering Services Contract",
    content: `**CATERING SERVICES AGREEMENT**

**Caterer:** [Your Name]
**Client:** [Client Name]
**Event Date:** [Event Date]
**Event Venue:** [Event Venue]

**SERVICES INCLUDED:**
- Full-service catering for [Number] guests
- 3-course plated dinner
- Cocktail hour with passed hors d'oeuvres
- Open bar (beer, wine, signature cocktails)
- Linens, china, and glassware
- Professional serving staff
- Setup and breakdown

**MENU DETAILS:**
- Appetizers: [List]
- Main Course: [List]
- Desserts: [List]
- Beverages: [List]

**TERMS & CONDITIONS:**
1. Final guest count due 2 weeks before event
2. 50% deposit required to secure date
3. Final payment due 1 week before event
4. Menu changes allowed up to 1 month before event
5. Caterer will accommodate dietary restrictions with 2 weeks notice

**CANCELLATION POLICY:**
- 60+ days: Full refund minus $500 processing fee
- 30-59 days: 50% refund
- 14-29 days: 25% refund
- Less than 14 days: No refund

**TOTAL INVESTMENT:** $[Amount]

By signing below, both parties agree to the terms outlined in this contract.`
  },
  florist: {
    title: "Wedding Floral Services Contract",
    content: `**FLORAL DESIGN SERVICES AGREEMENT**

**Florist:** [Your Name]
**Client:** [Client Name]
**Event Date:** [Event Date]
**Event Venue:** [Event Venue]

**SERVICES INCLUDED:**
- Bridal bouquet
- Bridesmaids bouquets (up to 6)
- Groom and groomsmen boutonnieres
- Ceremony arrangements
- Reception centerpieces
- Delivery and setup
- Breakdown service

**FLORAL PACKAGE:**
- Bridal Bouquet: [Description]
- Bridesmaids: [Description]
- Boutonnieres: [Description]
- Ceremony: [Description]
- Reception: [Description]

**TERMS & CONDITIONS:**
1. 50% deposit required to secure date
2. Final payment due 2 weeks before event
3. Final flower selections due 1 month before event
4. Florist will substitute similar flowers if requested varieties unavailable
5. Client responsible for any venue access fees

**CANCELLATION POLICY:**
- 45+ days: Full refund minus $300 processing fee
- 30-44 days: 50% refund
- 14-29 days: 25% refund
- Less than 14 days: No refund

**TOTAL INVESTMENT:** $[Amount]

By signing below, both parties agree to the terms outlined in this contract.`
  }
};
