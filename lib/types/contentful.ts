
export type AssetField = {
  fields: {
    file: {
      url: string;
      contentType: string;
    };
    title: string;
  };
};

export interface TestimonialFields {
  clientReview: string;
  clientImage: AssetField;
  reviewImageOrVideo: AssetField;
  clientName: string;
  clientRoleCompanyName: string;
}

export interface TestimonialItem {
  sys: { id: string };
  fields: TestimonialFields;
}

export interface HearClientsSuccessWorldsProps {
  posts: TestimonialItem[];
}

/** ========== EmpowerYourBusiness ========== */
export interface EmpowerBusinessItem {
  sys: { id: string };
  fields: {
    heading: string;
    description: string;
    image: AssetField;
  };
}
export interface EmpowerYourBusinessProps {
  data: EmpowerBusinessItem[];
}

/** ========== DigiRepsDifference ========== */
export interface DigiRepsDifferenceItem {
  sys: { id: string };
  fields: {
    backgroundImage: AssetField;
    popupVideo: AssetField;
  };
}
export interface DigiRepsDifferenceProps {
  data2: DigiRepsDifferenceItem[];
}

/** ========== SuccessStories ========== */
export interface SuccessStoryItem {
  sys: { id: string };
  fields: {
    logo: AssetField;
    heading: string;
    description: string;
    pdfFile: AssetField;
  };
}
export interface SuccessStoriesProps {
  data3: SuccessStoryItem[];
}

/** ========== PartnerLogos ========== */
export interface PartnerLogoItem {
  sys: { id: string };
  fields: {
    image: AssetField;
  };
}
export interface PartnerLogosProps {
  data1: PartnerLogoItem[];
}

/** ========== Stats ========== */
export interface StatItem {
  fields: {
    stat: string;
    description: string;
  };
}
export interface StatsProps {
  data4: StatItem[];
}

/** ========== Footer ========== */
export interface ContactDetailItem {
  sys: { id: string };
  fields: {
    address: string;
    email: string;
    number: string;
  };
}
export interface ReviewPlatformItem {
  sys: { id: string };
  fields: {
    logo: AssetField;
    link: string;
  };
}
export interface FooterProps {
  contactDetails: ContactDetailItem[];
  reviewPlatforms: ReviewPlatformItem[];
}

export interface VideoModalProps {

  src: string;
}

/**
 * Leadership (Our Team) section
 */
export interface LeadershipFields {
  name: string;
  role: string;
  image: AssetField;
  linkedinUrl: string;
}

export interface LeadershipItem {
  sys: { id: string };
  fields: LeadershipFields;
}

export interface LeadershipProps {
  data3: LeadershipItem[];
}

/**
 * Management (Swiper) section
 */
export interface ManagementFields {
  name: string;
  role: string;
  image: AssetField;
}

export interface ManagementItem {
  sys: { id: string };
  fields: ManagementFields;
}

export interface ManagementProps {
  data2: ManagementItem[];
}


/** ========== Marks ========== */
export interface RichTextMark {
  /** e.g. "bold", "italic", etc. */
  type: string;
}

/** ========== Text Node ========== */
export interface RichTextTextNode {
  nodeType: "text";
  /** the literal string */
  value: string;
  /** inline styles applied to this text */
  marks: RichTextMark[];
  /** usually empty, but reserved for future Contentful data */
  data: Record<string, unknown>;
}

/** ========== Paragraph Node ========== */
export interface RichTextParagraphNode {
  nodeType: "paragraph";
  /** children are *only* text nodes here */
  content: RichTextTextNode[];
  data: Record<string, unknown>;
}

/** ========== Document Root ========== */
export interface RichTextDocument {
  nodeType: "document";
  data: Record<string, unknown>;
  /** top-level blocks (we only expect paragraphs, but you can extend this union) */
  content: RichTextParagraphNode[];
}

/** ========== Our Story Fields ========== */
export interface StoryFields {
  heading: string;
  /** the full Rich-Text AST from Contentful */
  description: RichTextDocument;
}

export interface StoryItem {
  sys: { id: string };
  fields: StoryFields;
}

export interface OurStoryProps {
  data: StoryItem[];
}


/**
 * Our Evolution section
 */
export interface EvolutionFields {
  icon: AssetField;
  subHeading: string;
  heading: string;
}

export interface EvolutionItem {
  sys: { id: string };
  fields: EvolutionFields;
}

export interface OurEvolutionProps {
  data1: EvolutionItem[];
}


/**
 * Leadership (Our Team) section
 */
export interface GlimpseFields {
  image: AssetField;
}

export interface GlimpseItem {
  sys: { id: string };
  fields: GlimpseFields;
}

export interface GlimpseProps {
  data4: GlimpseItem[];
}



export interface PrivacyPolicyFields {
  policyContent: string; // assuming HTML string; if it's RichTextDocument, update this
}

export interface PrivacyPolicyItem {
  sys: { id: string };
  fields: PrivacyPolicyFields;
}

export interface PrivacyPolicyProps {
  data: PrivacyPolicyItem[];
}


export interface TermsConditionsFields {
  termsContent: string; // assuming HTML string; if it's RichTextDocument, update this
}

export interface TermsConditionsItem {
  sys: { id: string };
  fields: TermsConditionsFields;
}

export interface TermsConditionsProps {
  data: TermsConditionsItem[];
}
