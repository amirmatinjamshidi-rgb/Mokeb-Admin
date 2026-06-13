"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { Calendar, DocumentText, UserAdd } from "iconsax-reactjs";
import { Search } from "lucide-react";

import {
  EntryExitTabs,
  FilterBox,
  FloatingLabelSearch,
  PageToolbar,
  Table,
  TablePagination,
  TableRowActionsMenu,
  pageToolbarActionClass,
  toPersianDigits,
  usePagination,
  type Column,
  type EntryExitTabId,
  type FilterGroup,
  type FilterValues,
} from "@admin-kit/index";
import { cn } from "@admin-kit/shared/lib/utils";

import {
  KarvanInfoEditModal,
  type KarvanInfoFormValues,
} from "./KarvanInfoEditModal";
import {
  MOCK_ENTRY_ROWS,
  MOCK_EXIT_ROWS,
  formatReservationClass,
  type EntryStatus,
  type ExitStatus,
  type ReservationRow,
} from "./mockEntryExitRows";

type TableRow = ReservationRow & { radif: number };

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: "status",
    title: "وضعیت",
    options: [
      { id: "all", label: "همه" },
      { id: "pending", label: "در انتظار" },
      { id: "delayed", label: "تاخیر" },
      { id: "done", label: "تکمیل شده" },
    ],
  },
  {
    id: "reservationType",
    title: "نوع رزرو",
    options: [
      { id: "all", label: "همه" },
      { id: "caravan", label: "کاروان" },
      { id: "family", label: "خانواده" },
    ],
  },
];

const DEFAULT_FILTERS: FilterValues = {
  status: "all",
  reservationType: "all",
};

function createIconsaxIcon(
  Icon: ComponentType<{
    className?: string;
    variant?: "Linear" | "Outline" | "Broken" | "Bold" | "Bulk" | "TwoTone";
    color?: string;
    size?: string | number;
  }>,
): ComponentType<{ className?: string }> {
  return function IconsaxMenuIcon({ className }: { className?: string }) {
    return (
      <Icon variant="Outline" className={className} color="currentColor" size={16} />
    );
  };
}

const DocumentTextIcon = createIconsaxIcon(DocumentText);
const UserAddIcon = createIconsaxIcon(UserAdd);
const CalendarIcon = createIconsaxIcon(Calendar);

function persian(value: string | number) {
  return toPersianDigits(value);
}

function entryStatusClass(status: EntryStatus) {
  switch (status) {
    case "در انتظار":
      return "text-[#61756F]";
    case "تاخیر در ورود":
      return "text-[#D8B648]";
    case "پذیرش شده":
      return "text-[#279F78]";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function exitStatusClass(status: ExitStatus) {
  switch (status) {
    case "در انتظار خروج":
      return "text-[#61756F]";
    case "تاخیر در خروج":
      return "text-[#D8B648]";
    case "عدم خروج":
      return "text-[#D22B23]";
    case "خروج ثبت شده":
      return "text-[#279F78]";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function StatusBadge({
  status,
  tab,
}: {
  status: EntryStatus | ExitStatus;
  tab: EntryExitTabId;
}) {
  const className =
    tab === "entry"
      ? entryStatusClass(status as EntryStatus)
      : exitStatusClass(status as ExitStatus);

  return <span className={cn("font-medium", className)}>{status}</span>;
}

function matchesFilters(
  row: ReservationRow,
  filters: FilterValues,
  tab: EntryExitTabId,
): boolean {
  if (filters.reservationType !== "all") {
    const typeMap: Record<string, string> = {
      caravan: "کاروان",
      family: "خانواده",
    };
    if (row.reservationType !== typeMap[filters.reservationType]) return false;
  }

  if (filters.status === "all") return true;

  if (tab === "entry") {
    const status = row.status as EntryStatus;
    if (filters.status === "pending") return status === "در انتظار";
    if (filters.status === "delayed") return status === "تاخیر در ورود";
    if (filters.status === "done") return status === "پذیرش شده";
    return true;
  }

  const status = row.status as ExitStatus;
  if (filters.status === "pending") return status === "در انتظار خروج";
  if (filters.status === "delayed") return status === "تاخیر در خروج";
  if (filters.status === "done") return status === "خروج ثبت شده";
  return true;
}

function buildColumns(handlers: {
  tab: EntryExitTabId;
  selectedIds: Set<number>;
  onToggleRow: (id: number) => void;
  onViewKarvan: (row: TableRow) => void;
  onChangeMembers: (row: TableRow) => void;
  onChangeEntryDate: (row: TableRow) => void;
}): Column<TableRow>[] {
  return [
    {
      key: "radif",
      header: "ردیف",
      colClassName: "text-center",
      cellClassName: "overflow-visible",
      cell: (row) => (
        <div className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            checked={handlers.selectedIds.has(row.id)}
            onChange={() => handlers.onToggleRow(row.id)}
            aria-label={`انتخاب ردیف ${row.radif}`}
            className="size-4 shrink-0 cursor-pointer accent-[#175E47]"
          />
          <span>{persian(row.radif)}</span>
        </div>
      ),
    },
    {
      key: "supervisorName",
      header: "نام سرپرست",
      colClassName: "text-center",
      cell: (row) => row.supervisorName,
    },
    {
      key: "reservationType",
      header: "نوع رزرو",
      colClassName: "text-center",
      cell: (row) => row.reservationType,
    },
    {
      key: "reservationClass",
      header: "کلاس",
      colClassName: "text-center",
      cell: (row) => formatReservationClass(row.reservationClass),
    },
    {
      key: "totalCount",
      header: "تعداد کل",
      colClassName: "text-center",
      cell: (row) => persian(row.totalCount),
    },
    {
      key: "maleCount",
      header: "آقایان",
      colClassName: "text-center",
      cell: (row) => persian(row.maleCount),
    },
    {
      key: "femaleCount",
      header: "بانوان",
      colClassName: "text-center",
      cell: (row) => persian(row.femaleCount),
    },
    {
      key: "status",
      header: "وضعیت",
      colClassName: "text-center",
      cell: (row) => (
        <StatusBadge status={row.status} tab={handlers.tab} />
      ),
    },
    {
      key: "reservationCode",
      header: "کد رزرو",
      colClassName: "text-center",
      cell: (row) => persian(row.reservationCode),
    },
    {
      key: "actions",
      header: "عملیات",
      colClassName: "text-center",
      cellClassName: "overflow-visible",
      cell: (row) => (
        <TableRowActionsMenu
          items={[
            {
              label: "مشاهده اطلاعات کاروان",
              icon: DocumentTextIcon,
              onClick: () => handlers.onViewKarvan(row),
            },
            {
              label: "تغییر تعداد اعضا",
              icon: UserAddIcon,
              onClick: () => handlers.onChangeMembers(row),
            },
            {
              label: "تغییر تاریخ ورود",
              icon: CalendarIcon,
              onClick: () => handlers.onChangeEntryDate(row),
            },
          ]}
        />
      ),
    },
  ];
}

export function OnsiteRegistrationContent() {
  const [tab, setTab] = useState<EntryExitTabId>("entry");
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterValues>(DEFAULT_FILTERS);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [entryRows, setEntryRows] = useState(MOCK_ENTRY_ROWS);
  const [exitRows, setExitRows] = useState(MOCK_EXIT_ROWS);
  const [karvanModalRow, setKarvanModalRow] = useState<ReservationRow | null>(
    null,
  );

  const sourceRows = tab === "entry" ? entryRows : exitRows;

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sourceRows.filter((row) => {
      const matchesSearch =
        !query ||
        row.supervisorName.toLowerCase().includes(query) ||
        row.reservationCode.includes(query);

      return matchesSearch && matchesFilters(row, appliedFilters, tab);
    });
  }, [appliedFilters, search, sourceRows, tab]);

  const {
    currentPage,
    totalPages,
    pageSize,
    paginatedItems,
    setPage,
    setSize,
  } = usePagination(filteredRows, 10);

  useEffect(() => {
    setPage(1);
    setSelectedIds(new Set());
  }, [search, appliedFilters, tab, setPage]);

  const tableRows: TableRow[] = paginatedItems.map((row, index) => ({
    ...row,
    radif: (currentPage - 1) * pageSize + index + 1,
  }));

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasSelection = selectedIds.size > 0;

  const columns = useMemo(
    () =>
      buildColumns({
        tab,
        selectedIds,
        onToggleRow: toggleRow,
        onViewKarvan: setKarvanModalRow,
        onChangeMembers: (row) => console.log("change members", row.id),
        onChangeEntryDate: (row) => console.log("change entry date", row.id),
      }),
    [selectedIds, tab],
  );

  const handleKarvanSave = (id: number, values: KarvanInfoFormValues) => {
    const updater = (rows: ReservationRow[]) =>
      rows.map((row) =>
        row.id === id
          ? {
              ...row,
              representativeFirstName: values.representativeFirstName,
              representativeLastName: values.representativeLastName,
              entryDate: values.entryDate,
              exitDate: values.exitDate,
              mobile: values.mobile,
              stayDuration: values.stayDuration,
              maleCount: Number(values.maleCount) || row.maleCount,
              femaleCount: Number(values.femaleCount) || row.femaleCount,
              totalCount:
                (Number(values.maleCount) || row.maleCount) +
                (Number(values.femaleCount) || row.femaleCount),
            }
          : row,
      );

    if (tab === "entry") setEntryRows(updater);
    else setExitRows(updater);
  };

  const actionButtonClass =
    "flex h-12 w-full min-w-0 sm:flex-1 items-center justify-center rounded-lg border text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex w-full flex-col gap-12">
      <EntryExitTabs value={tab} onValueChange={setTab} />

      <div className="flex w-full flex-col gap-4">
        <PageToolbar
          search={
            <FloatingLabelSearch
              id="onsite-supervisor-search"
              label="جستجو نام سرپرست یا کد رزرو"
              value={search}
              onChange={setSearch}
              icon={<Search className="size-5" aria-hidden />}
              containerClassName="w-full shadow-sm shadow-gray-300 border-white"
            />
          }
          actions={
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className={cn(
                pageToolbarActionClass,
                "border border-[#175E47] bg-white text-[#175E47] hover:bg-[#F5F9F6]",
              )}
            >
              فیلتر
            </button>
          }
        />

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch">
          <button
            type="button"
            disabled={!hasSelection}
            className={cn(
              actionButtonClass,
              "w-full sm:flex-1",
              "border-[#D8B648] bg-white text-[#D8B648] hover:bg-[#FFFBF0]",
            )}
            onClick={() => console.log("register delay", [...selectedIds])}
          >
            ثبت تاخیر
          </button>
          <button
            type="button"
            disabled={!hasSelection}
            className={cn(
              actionButtonClass,
              "border-[#175E47] bg-[#175E47] text-white hover:bg-[#1F7E5F]",
            )}
            onClick={() =>
              console.log(
                tab === "entry" ? "register entry" : "register exit",
                [...selectedIds],
              )
            }
          >
            {tab === "entry" ? "ثبت ورودی" : "ثبت خروجی"}
          </button>
        </div>
      </div>

      <Table data={tableRows} columns={columns} size="lg" className="w-full" />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setSize}
      />

      <FilterBox
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={FILTER_GROUPS}
        defaultValue={appliedFilters}
        onApply={setAppliedFilters}
      />

      <KarvanInfoEditModal
        row={karvanModalRow}
        onClose={() => setKarvanModalRow(null)}
        onSave={handleKarvanSave}
      />
    </div>
  );
}
