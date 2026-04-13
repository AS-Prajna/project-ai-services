export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  provider?: string;
  isCertified?: boolean;
}

export interface FilterState {
  providers: string[];
  services: string[];
}

export interface PageState {
  search: string;
  items: CatalogItem[];
  filters: FilterState;
}

export const ACTION_TYPES = {
  SET_SEARCH: "SET_SEARCH",
  SET_PROVIDER_FILTER: "SET_PROVIDER_FILTER",
  SET_SERVICE_FILTER: "SET_SERVICE_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
} as const;

export type PageAction =
  | { type: typeof ACTION_TYPES.SET_SEARCH; payload: string }
  | { type: typeof ACTION_TYPES.SET_PROVIDER_FILTER; payload: string[] }
  | { type: typeof ACTION_TYPES.SET_SERVICE_FILTER; payload: string[] }
  | { type: typeof ACTION_TYPES.CLEAR_FILTERS };

// Mock data
export const MOCK_ITEMS: CatalogItem[] = [
  {
    id: "1",
    title: "Digital assistant",
    description:
      "Enable digital assistants using Retrieval-Augmented Generation (RAG), including AI services that query a custom knowledge base to generate responses from custom documents and data.",
    tags: [
      "Digitize documents",
      "Find similar items",
      "Question and answer",
      "Similarity search",
      "Translation",
      "Summarization",
      "Knowledge management",
    ],
    provider: "IBM",
    isCertified: true,
  },
  {
    id: "2",
    title: "Deep process integration",
    description:
      "Infuse AI into business processes with purpose-built AI services like summarization, classification, and entity extraction to deploy AI in minutes.",
    tags: [
      "Digitize documents",
      "Find similar items",
      "Question and answer",
      "Similarity search",
    ],
    provider: "IBM",
    isCertified: true,
  },
  {
    id: "3",
    title: "Data and content management",
    description:
      "Answers questions in natural language by sourcing generic & domain-specific knowledge from your enterprise data and content repositories.",
    tags: ["Question and answer", "Find similar items", "Knowledge management"],
    provider: "IBM",
    isCertified: false,
  },
  {
    id: "4",
    title: "Fraud detection AI",
    description:
      "Detect and prevent fraudulent activities using advanced AI models that analyze patterns and anomalies in real-time transactions.",
    tags: [
      "Pattern recognition",
      "Anomaly detection",
      "Risk assessment",
      "Real-time analysis",
    ],
    provider: "IBM certified",
    isCertified: true,
  },
];

// Initial state
export const INITIAL_STATE: PageState = {
  search: "",
  items: MOCK_ITEMS,
  filters: {
    providers: [],
    services: [],
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
    case ACTION_TYPES.SET_PROVIDER_FILTER:
      return {
        ...state,
        filters: { ...state.filters, providers: action.payload },
      };
    case ACTION_TYPES.SET_SERVICE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, services: action.payload },
      };
    case ACTION_TYPES.CLEAR_FILTERS:
      return {
        ...state,
        filters: { providers: [], services: [] },
      };
    default:
      return state;
  }
};
