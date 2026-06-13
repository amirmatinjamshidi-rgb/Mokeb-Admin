"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { CloseCircle, ReceiptSearch, TickCircle } from "iconsax-reactjs";
import { Filter, Search } from "lucide-react";

import {
  FilterBox,
  FloatingLabelSearch,
  PageToolbar,
  Table,
  TablePagination,
  TableRowActionsMenu,
  pageToolbarActionClass,
  usePagination,
  type Column,
  type FilterGroup,
  type FilterValues,
} from "@admin-kit/index";
import { toPersianDigits } from "@admin-kit/shared/lib/format";
import { cn } from "@admin-kit/shared/lib/utils";

import { KarvanRequestReviewModal } from "./KarvanRequestReviewModal";
import {
  MOCK_KARVAN_REQUESTS,
  type KarvanRequest,
  type KarvanRequestStatus,
} from "./mockManageRequests";

type KarvanRequestRow = KarvanRequest & { radif: number };

const STATUS_FILTER_MAP: Record<string, KarvanRequestStatus> = {
  pending: "در انتظار بررسی",
  approved: "تایید شده",
  rejected: "رد شده",
};

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: "status",
    title: "وضعیت درخواست",
    options: [
      { id: "all", label: "همه" },
      { id: "pending", label: "در انتظار بررسی" },
      { id: "approved", label: "تایید شده" },
      { id: "rejected", label: "رد شده" },
    ],
  },
];

const DEFAULT_FILTERS: FilterValues = {
  status: "all",
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

const ReceiptSearchIcon = createIconsaxIcon(ReceiptSearch);
const TickCircleIcon = createIconsaxIcon(TickCircle);
const CloseCircleIcon = createIconsaxIcon(CloseCircle);

function persian(value: string | number) {
  return toPersianDigits(value);
}

function requestStatusClass(status: KarvanRequestStatus) {
  switch (status) {
    case "در انتظار بررسی":
      return "text-[#D8B648]";
    case "رد شده":
      return "text-[#D22B23]";
    case "تایید شده":
      return "text-[#279F78]";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function StatusBadge({ status }: { status: KarvanRequestStatus }) {
  return (
    <span className={cn("font-medium", requestStatusClass(status))}>
      {status}
    </span>
  );
}

function buildColumns(handlers: {
  onReview: (row: KarvanRequestRow) => void;
  onApprove: (row: KarvanRequestRow) => void;
  onReject: (row: KarvanRequestRow) => void;
}): Column<KarvanRequestRow>[] {
  return [
    {
      key: "radif",
      header: "ردیف",
      colClassName: "text-center",
      cell: (row) => persian(row.radif),
    },
    {
      key: "supervisorName",
      header: "نام سرپرست",
      colClassName: "text-center",
      cell: (row) => row.supervisorName,
    },
    {
      key: "totalCapacity",
      header: "ظرفیت کل",
      colClassName: "text-center",
      cell: (row) => persian(row.totalCapacity),
    },
    {
      key: "maleCount",
      header: "تعداد آقایان",
      colClassName: "text-center",
      cell: (row) => persian(row.maleCount),
    },
    {
      key: "femaleCount",
      header: "تعداد بانوان",
      colClassName: "text-center",
      cell: (row) => persian(row.femaleCount),
    },
    {
      key: "entryDate",
      header: "تاریخ ورود",
      colClassName: "text-center",
      cell: (row) => persian(row.entryDate),
    },
    {
      key: "exitDate",
      header: "تاریخ خروج",
      colClassName: "text-center",
      cell: (row) => persian(row.exitDate),
    },
    {
      key: "status",
      header: "وضعیت",
      colClassName: "text-center",
      cell: (row) => <StatusBadge status={row.status} />,
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
              label: "بررسی اطلاعات کاروان",
              icon: ReceiptSearchIcon,
              onClick: () => handlers.onReview(row),
            },
            {
              label: "تایید درخواست",
              icon: TickCircleIcon,
              onClick: () => {
                if (row.status !== "تایید شده") {
                  handlers.onApprove(row);
                }
              },
            },
            {
              label: "رد درخواست",
              icon: CloseCircleIcon,
              onClick: () => {
                if (row.status !== "رد شده") {
                  handlers.onReject(row);
                }
              },
            },
          ]}
        />
      ),
    },
  ];
}

type Props = {
  requests?: KarvanRequest[];
};

export function ManageRequestsContent({
  requests = MOCK_KARVAN_REQUESTS,
}: Props) {
  const [items, setItems] = useState(requests);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterValues>(DEFAULT_FILTERS);
  const [reviewTarget, setReviewTarget] = useState<KarvanRequest | null>(null);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((request) => {
      const matchesSearch =
        !query ||
        request.supervisorName.toLowerCase().includes(query) ||
        request.entryDate.includes(query) ||
        request.exitDate.includes(query) ||
        request.status.includes(query) ||
        String(request.totalCapacity).includes(query);

      const matchesStatus =
        appliedFilters.status === "all" ||
        request.status === STATUS_FILTER_MAP[appliedFilters.status];

      return matchesSearch && matchesStatus;
    });
  }, [appliedFilters, items, search]);

  const {
    currentPage,
    totalPages,
    pageSize,
    paginatedItems,
    setPage,
    setSize,
  } = usePagination(filteredRequests, 10);

  useEffect(() => {
    setPage(1);
  }, [search, appliedFilters, setPage]);

  const tableRows: KarvanRequestRow[] = paginatedItems.map((request, index) => ({
    ...request,
    radif: (currentPage - 1) * pageSize + index + 1,
  }));

  const updateStatus = (id: number, status: KarvanRequestStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  const columns = useMemo(
    () =>
      buildColumns({
        onReview: setReviewTarget,
        onApprove: (row) => updateStatus(row.id, "تایید شده"),
        onReject: (row) => updateStatus(row.id, "رد شده"),
      }),
    [],
  );

  return (
    <div className="flex w-full flex-col gap-12">
      <PageToolbar
        search={
          <FloatingLabelSearch
            id="manage-requests-search"
            label="جستجو"
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
            <Filter className="size-5" aria-hidden />
            فیلتر
          </button>
        }
      />

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

      <KarvanRequestReviewModal
        request={reviewTarget}
        onClose={() => setReviewTarget(null)}
      />
    </div>
  );
}
