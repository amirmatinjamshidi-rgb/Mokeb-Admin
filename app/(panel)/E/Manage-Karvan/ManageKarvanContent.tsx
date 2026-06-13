"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";

import {
  FilterBox,
  FloatingLabelSearch,
  Table,
  TablePagination,
  TableRowActionsMenu,
  usePagination,
  type Column,
  type FilterGroup,
  type FilterValues,
} from "@admin-kit/index";
import { toPersianDigits } from "@admin-kit/shared/lib/format";
import { cn } from "@admin-kit/shared/lib/utils";

import { MOCK_KARVAN_USERS } from "./mockKarvanUsers";

export type KarvanUserStatus = "فعال" | "غیر فعال";

export type KarvanUser = {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
  registeredAt: string;
  registrationYear: "1404" | "1405";
  status: KarvanUserStatus;
};

type KarvanUserRow = KarvanUser & { radif: number };

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: "status",
    title: "وضعیت کاربران",
    options: [
      { id: "all", label: "همه" },
      { id: "active", label: "فعال" },
      { id: "inactive", label: "غیر فعال" },
    ],
  },
  {
    id: "year",
    title: "سال ثبت نام",
    options: [
      { id: "all", label: "همه" },
      { id: "1404", label: "1404" },
      { id: "1405", label: "1405" },
    ],
  },
];

const DEFAULT_FILTERS: FilterValues = {
  status: "all",
  year: "all",
};

function persian(value: string | number) {
  return toPersianDigits(value);
}

function StatusBadge({ status }: { status: KarvanUserStatus }) {
  return (
    <span
      className={cn(
        "font-medium",
        status === "فعال" ? "text-[#279F78]" : "text-[#D22B23]",
      )}
    >
      {status}
    </span>
  );
}

function buildColumns(handlers: {
  onView: (row: KarvanUserRow) => void;
  onEdit: (row: KarvanUserRow) => void;
  onDelete: (row: KarvanUserRow) => void;
}): Column<KarvanUserRow>[] {
  return [
    {
      key: "radif",
      header: "ردیف",
      colClassName: "text-center",
      cell: (row) => persian(row.radif),
    },
    {
      key: "firstName",
      header: "نام",
      colClassName: "text-center",
      cell: (row) => row.firstName,
    },
    {
      key: "lastName",
      header: "نام خانوادگی",
      colClassName: "text-center",
      cell: (row) => row.lastName,
    },
    {
      key: "nationalCode",
      header: "کد ملی",
      colClassName: "text-center",
      cell: (row) => persian(row.nationalCode),
    },
    {
      key: "mobile",
      header: "شماره موبایل",
      colClassName: "text-center",
      cell: (row) => persian(row.mobile),
    },
    {
      key: "registeredAt",
      header: "تاریخ ثبت نام",
      colClassName: "text-center",
      cell: (row) => persian(row.registeredAt),
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
              label: "مشاهده",
              icon: Eye,
              onClick: () => handlers.onView(row),
            },
            {
              label: "ویرایش",
              icon: Pencil,
              onClick: () => handlers.onEdit(row),
            },
            {
              label: "حذف",
              icon: Trash2,
              onClick: () => handlers.onDelete(row),
            },
          ]}
        />
      ),
    },
  ];
}

type Props = {
  users?: KarvanUser[];
};

export function ManageKarvanContent({ users = MOCK_KARVAN_USERS }: Props) {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterValues>(DEFAULT_FILTERS);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.nationalCode.includes(query) ||
        user.mobile.includes(query);

      const matchesStatus =
        appliedFilters.status === "all" ||
        (appliedFilters.status === "active" && user.status === "فعال") ||
        (appliedFilters.status === "inactive" && user.status === "غیر فعال");

      const matchesYear =
        appliedFilters.year === "all" ||
        user.registrationYear === appliedFilters.year;

      return matchesSearch && matchesStatus && matchesYear;
    });
  }, [appliedFilters, search, users]);

  const {
    currentPage,
    totalPages,
    pageSize,
    paginatedItems,
    setPage,
    setSize,
  } = usePagination(filteredUsers, 10);

  useEffect(() => {
    setPage(1);
  }, [search, appliedFilters, setPage]);

  const tableRows: KarvanUserRow[] = paginatedItems.map((user, index) => ({
    ...user,
    radif: (currentPage - 1) * pageSize + index + 1,
  }));

  const columns = useMemo(
    () =>
      buildColumns({
        onView: (row) => console.log("view", row.id),
        onEdit: (row) => console.log("edit", row.id),
        onDelete: (row) => console.log("delete", row.id),
      }),
    [],
  );

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex w-full items-stretch gap-4">
        <FloatingLabelSearch
          id="karvan-user-search"
          label="جستجو"
          value={search}
          onChange={setSearch}
          icon={<Search className="size-5" aria-hidden />}
          containerClassName="min-w-0 flex-[2] shadow-sm shadow-gray-300 border-white"
        />

        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-lg border border-[#175E47] bg-white text-sm font-semibold text-[#175E47] transition-colors hover:bg-[#F5F9F6]"
        >
          فیلتر
        </button>
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
    </div>
  );
}
