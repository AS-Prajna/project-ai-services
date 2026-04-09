import type { DataTableHeader } from "@carbon/react";

export interface AiDeploymentRow {
  id: string;
  name: string;
  status: "Deploying..." | "Deleting..." | "Error" | "Stopped" | "Running";
  avgUsage: string;
  uptime: string;
  accuracy: string;
  owner: string;
  type: string;
  messages: string;
  actions: string;
}

export type ExportStatus = "idle" | "exporting" | "success" | "error";

export interface AppState {
  search: string;
  page: number;
  pageSize: number;
  isDeleteDialogOpen: boolean;
  isConfirmed: boolean;
  rowsData: AiDeploymentRow[];
  selectedRowId: string | null;
  toastOpen: boolean;
  deleteErrorMessage: string;
  deleteErrorRowName: string;
  isDeleting: boolean;
  isExportDialogOpen: boolean;
  csvFileName: string;
  exportStatus: ExportStatus;
  exportErrorMessage: string;
  hasError: boolean;
  visibleColumns: Record<string, boolean>;
}

export const ACTION_TYPES = {
  SET_SEARCH: "SET_SEARCH",
  SET_PAGE: "SET_PAGE",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  OPEN_DELETE_DIALOG: "OPEN_DELETE_DIALOG",
  CLOSE_DELETE_DIALOG: "CLOSE_DELETE_DIALOG",
  SET_CONFIRMED: "SET_CONFIRMED",
  DELETE_ROW: "DELETE_ROW",
  SHOW_ERROR: "SHOW_ERROR",
  HIDE_ERROR: "HIDE_ERROR",
  SET_IS_DELETING: "SET_IS_DELETING",
  OPEN_EXPORT_DIALOG: "OPEN_EXPORT_DIALOG",
  CLOSE_EXPORT_DIALOG: "CLOSE_EXPORT_DIALOG",
  SET_CSV_FILENAME: "SET_CSV_FILENAME",
  SET_EXPORT_STATUS: "SET_EXPORT_STATUS",
  SET_EXPORT_ERROR: "SET_EXPORT_ERROR",
  CLEAR_EXPORT_ERROR: "CLEAR_EXPORT_ERROR",
  SET_SELECTED_ROW_ID: "SET_SELECTED_ROW_ID",
  TOGGLE_COLUMN_VISIBILITY: "TOGGLE_COLUMN_VISIBILITY",
  RESET_COLUMN_VISIBILITY: "RESET_COLUMN_VISIBILITY",
} as const;

export type AppAction =
  | { type: typeof ACTION_TYPES.SET_SEARCH; payload: string }
  | { type: typeof ACTION_TYPES.SET_PAGE; payload: number }
  | { type: typeof ACTION_TYPES.SET_PAGE_SIZE; payload: number }
  | { type: typeof ACTION_TYPES.OPEN_DELETE_DIALOG; payload: string }
  | { type: typeof ACTION_TYPES.CLOSE_DELETE_DIALOG }
  | { type: typeof ACTION_TYPES.SET_CONFIRMED; payload: boolean }
  | { type: typeof ACTION_TYPES.DELETE_ROW; payload: string }
  | {
      type: typeof ACTION_TYPES.SHOW_ERROR;
      payload: { message: string; rowName?: string };
    }
  | { type: typeof ACTION_TYPES.HIDE_ERROR }
  | { type: typeof ACTION_TYPES.SET_IS_DELETING; payload: boolean }
  | { type: typeof ACTION_TYPES.OPEN_EXPORT_DIALOG }
  | { type: typeof ACTION_TYPES.CLOSE_EXPORT_DIALOG }
  | { type: typeof ACTION_TYPES.SET_CSV_FILENAME; payload: string }
  | { type: typeof ACTION_TYPES.SET_EXPORT_STATUS; payload: ExportStatus }
  | { type: typeof ACTION_TYPES.SET_EXPORT_ERROR; payload: string }
  | { type: typeof ACTION_TYPES.CLEAR_EXPORT_ERROR }
  | { type: typeof ACTION_TYPES.SET_SELECTED_ROW_ID; payload: string | null }
  | { type: typeof ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY; payload: string }
  | { type: typeof ACTION_TYPES.RESET_COLUMN_VISIBILITY };

// Constants
export const HEADERS: DataTableHeader[] = [
  { header: "Deployment name", key: "name" },
  { header: "Status", key: "status" },
  { header: "Avg usage", key: "avgUsage" },
  { header: "Uptime", key: "uptime" },
  { header: "Accuracy", key: "accuracy" },
  { header: "Owner", key: "owner" },
  { header: "Type", key: "type" },
  { header: "Messages", key: "messages" },
  { header: "", key: "actions" },
];

export const STATUS_SORT_ORDER: Record<string, number> = {
  "Deploying...": 1,
  "Deleting...": 2,
  Error: 3,
  Stopped: 4,
  Running: 5,
};

// Mock data
export const MOCK_ROWS: AiDeploymentRow[] = [
  {
    id: "1",
    name: "Incident troubleshooting",
    status: "Deploying...",
    avgUsage: "30s ago",
    uptime: "Mar 4, 2026",
    accuracy: "95%",
    owner: "susan[j]",
    type: "Digital assistant",
    messages: "Error message goes here...",
    actions: "actions",
  },
  {
    id: "2",
    name: "Process FAQs",
    status: "Deleting...",
    avgUsage: "840K/day",
    uptime: "2 days",
    accuracy: "92%",
    owner: "susan[j]",
    type: "Deep process",
    messages: "Deploying [service]...",
    actions: "actions",
  },
  {
    id: "3",
    name: "Permission requests",
    status: "Error",
    avgUsage: "10K/day",
    uptime: "Mar 4, 2026",
    accuracy: "95%",
    owner: "ramseedickey",
    type: "Digital assistant",
    messages: "",
    actions: "actions",
  },
  {
    id: "4",
    name: "Contract analysis agent",
    status: "Running",
    avgUsage: "280K/day",
    uptime: "Mar 4, 2026",
    accuracy: "95%",
    owner: "susan[j]",
    type: "Summary",
    messages: "",
    actions: "actions",
  },
  {
    id: "5",
    name: "Case routing",
    status: "Running",
    avgUsage: "180/day",
    uptime: "12 hours",
    accuracy: "95%",
    owner: "fernando",
    type: "Translation",
    messages: "Ingest data",
    actions: "actions",
  },
  {
    id: "6",
    name: "Deals tracker",
    status: "Stopped",
    avgUsage: "114K/day",
    uptime: "12 hours",
    accuracy: "95%",
    owner: "ryan@digit",
    type: "Digital assistant",
    messages: "",
    actions: "actions",
  },
  {
    id: "7",
    name: "Privacy, redaction, audit",
    status: "Running",
    avgUsage: "290K",
    uptime: "Jan 2, 2026",
    accuracy: "95%",
    owner: "ryan@digit",
    type: "Question and an...",
    messages: "",
    actions: "actions",
  },
  {
    id: "8",
    name: "IT support triage",
    status: "Running",
    avgUsage: "1.1M/day",
    uptime: "25 minutes",
    accuracy: "95%",
    owner: "ramseedickey",
    type: "Digital assistant",
    messages: "",
    actions: "actions",
  },
  {
    id: "9",
    name: "Sales deck generator",
    status: "Running",
    avgUsage: "450K/day",
    uptime: "Nov 9, 2025",
    accuracy: "95%",
    owner: "ramseedickey",
    type: "Digital assistant",
    messages: "",
    actions: "actions",
  },
];

// Initial state
export const INITIAL_STATE: AppState = {
  search: "",
  page: 1,
  pageSize: 10,
  isDeleteDialogOpen: false,
  isConfirmed: false,
  rowsData: [...MOCK_ROWS].sort(
    (a, b) => STATUS_SORT_ORDER[a.status] - STATUS_SORT_ORDER[b.status],
  ),
  selectedRowId: null,
  toastOpen: false,
  deleteErrorMessage: "",
  deleteErrorRowName: "",
  isDeleting: false,
  hasError: false,
  isExportDialogOpen: false,
  csvFileName: "",
  exportStatus: "idle",
  exportErrorMessage: "",
  visibleColumns: {
    name: true,
    status: true,
    avgUsage: true,
    uptime: true,
    accuracy: true,
    owner: true,
    type: true,
    messages: true,
  },
};

// Reducer
export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ACTION_TYPES.SET_SEARCH:
      return { ...state, search: action.payload };

    case ACTION_TYPES.SET_PAGE:
      return { ...state, page: action.payload };

    case ACTION_TYPES.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload };

    case ACTION_TYPES.OPEN_DELETE_DIALOG:
      return {
        ...state,
        selectedRowId: action.payload,
        isDeleteDialogOpen: true,
        toastOpen: false,
      };

    case ACTION_TYPES.CLOSE_DELETE_DIALOG:
      return {
        ...state,
        isDeleteDialogOpen: false,
        isConfirmed: false,
        selectedRowId: state.hasError ? state.selectedRowId : null,
      };

    case ACTION_TYPES.SET_CONFIRMED:
      return { ...state, isConfirmed: action.payload };

    case ACTION_TYPES.DELETE_ROW:
      return {
        ...state,
        rowsData: state.rowsData.filter((r) => r.id !== action.payload),
        isDeleteDialogOpen: false,
        isConfirmed: false,
      };

    case ACTION_TYPES.SHOW_ERROR:
      return {
        ...state,
        deleteErrorMessage: action.payload.message,
        deleteErrorRowName: action.payload.rowName ?? "",
        toastOpen: true,
        isDeleting: false,
        hasError: true,
      };

    case ACTION_TYPES.HIDE_ERROR:
      return {
        ...state,
        toastOpen: false,
        selectedRowId: null,
        hasError: false,
        deleteErrorRowName: "",
      };

    case ACTION_TYPES.SET_IS_DELETING:
      return { ...state, isDeleting: action.payload };

    case ACTION_TYPES.SET_SELECTED_ROW_ID:
      return { ...state, selectedRowId: action.payload };

    case ACTION_TYPES.OPEN_EXPORT_DIALOG:
      return {
        ...state,
        isExportDialogOpen: true,
        csvFileName: "",
        exportErrorMessage: "",
        exportStatus: "idle",
      };

    case ACTION_TYPES.CLOSE_EXPORT_DIALOG:
      return {
        ...state,
        isExportDialogOpen: false,
      };

    case ACTION_TYPES.SET_CSV_FILENAME:
      return { ...state, csvFileName: action.payload };

    case ACTION_TYPES.SET_EXPORT_STATUS:
      return { ...state, exportStatus: action.payload };

    case ACTION_TYPES.SET_EXPORT_ERROR:
      return {
        ...state,
        exportErrorMessage: action.payload,
      };

    case ACTION_TYPES.CLEAR_EXPORT_ERROR:
      return {
        ...state,
        exportErrorMessage: "",
      };

    case ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY:
      return {
        ...state,
        visibleColumns: {
          ...state.visibleColumns,
          [action.payload]: !state.visibleColumns[action.payload],
        },
      };

    case ACTION_TYPES.RESET_COLUMN_VISIBILITY:
      return {
        ...state,
        visibleColumns: {
          name: true,
          status: true,
          avgUsage: true,
          uptime: true,
          accuracy: true,
          owner: true,
          type: true,
          messages: true,
        },
      };

    default:
      return state;
  }
};
