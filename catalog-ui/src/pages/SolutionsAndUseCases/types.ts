export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  domain?: string;
  asset?: string;
}

export interface FilterState {
  domains: string[];
  assets: string[];
}

export interface PageState {
  search: string;
  items: CatalogItem[];
  filters: FilterState;
}

export const ACTION_TYPES = {
  SET_SEARCH: "SET_SEARCH",
  SET_DOMAIN_FILTER: "SET_DOMAIN_FILTER",
  SET_ASSET_FILTER: "SET_ASSET_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
} as const;

export type PageAction =
  | { type: typeof ACTION_TYPES.SET_SEARCH; payload: string }
  | { type: typeof ACTION_TYPES.SET_DOMAIN_FILTER; payload: string[] }
  | { type: typeof ACTION_TYPES.SET_ASSET_FILTER; payload: string[] }
  | { type: typeof ACTION_TYPES.CLEAR_FILTERS };

// Mock data
export const MOCK_ITEMS: CatalogItem[] = [
  {
    id: "1",
    title: "Agriculture assistant",
    description:
      "Provides farmers with accurate, validated crop-growing guidance tailored to their region and preferred language.",
    tags: [
      "Digital assistant",
      "Knowledge management",
      "Question and answer",
      "Find similar items",
      "Similarity search",
    ],
    category: "Agriculture",
    domain: "IT Ops",
  },
  {
    id: "2",
    title: "Analyst assistant",
    description:
      "Enables teams to ask a question to analyze their data, understand what's happening, why it matters, and what they should do about it.",
    tags: ["Digital assistant"],
    category: "Banking and Finance",
    domain: "IT Ops",
  },
  {
    id: "3",
    title: "BI assistant",
    description:
      "Enables teams to ask a question to analyze their data, understand what's happening, why it matters, and what they should do about it.",
    tags: ["Digital assistant"],
    category: "Banking and Finance",
    domain: "IT Ops",
  },
  {
    id: "4",
    title: "Claims & policy mgmt agent",
    description:
      "Helps customers create accurate claims by analyzing their policy, identifying high-value claims, and whether they are performing well, and guiding them through next steps.",
    tags: ["Digital assistant"],
    category: "Insurance",
    domain: "IT Ops",
  },
  {
    id: "5",
    title: "Conference slide search",
    description:
      "Simplifies conference experiences by enabling fast access to presentation slides and content, making it easier to find relevant information.",
    tags: ["Digital assistant"],
    category: "Professional services",
    domain: "Development operations",
  },
  {
    id: "6",
    title: "Financial document assistant",
    description:
      "Enables conversational self-service for financial document analysis, helping users understand complex financial documents.",
    tags: ["Digital assistant"],
    category: "Banking and Finance",
    domain: "IT Ops",
  },
];

// Initial state
export const INITIAL_STATE: PageState = {
  search: "",
  items: MOCK_ITEMS,
  filters: {
    domains: [],
    assets: [],
  },
};

// Reducer
export const pageReducer = (
  state: PageState,
  action: PageAction,
): PageState => {
  switch (action.type) {
    case ACTION_TYPES.SET_SEARCH:
      return { ...state, search: action.payload };
    case ACTION_TYPES.SET_DOMAIN_FILTER:
      return {
        ...state,
        filters: { ...state.filters, domains: action.payload },
      };
    case ACTION_TYPES.SET_ASSET_FILTER:
      return {
        ...state,
        filters: { ...state.filters, assets: action.payload },
      };
    case ACTION_TYPES.CLEAR_FILTERS:
      return {
        ...state,
        filters: { domains: [], assets: [] },
      };
    default:
      return state;
  }
};
