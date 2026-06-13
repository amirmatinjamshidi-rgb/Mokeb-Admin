"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { CloseCircle, Eye } from "iconsax-reactjs";
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

import {
  MOCK_ADMIN_USERS,
  REGISTRATION_YEARS,
  type AdminUser,
  type AdminUserRegistrationYear,
  type AdminUserStatus,
} from "./mockUsers";
import { UserViewModal } from "./UserViewModal";

export type { AdminUser, AdminUserRegistrationYear, AdminUserStatus };

type AdminUserRow = AdminUser & { radif: number };

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
      ...REGISTRATION_YEARS.map((year) => ({ id: year, label: year })),
    ],
  },
];

const DEFAULT_FILTERS: FilterValues = {
  status: "all",
  year: "all",
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

const EyeIcon = createIconsaxIcon(Eye);
const CloseCircleIcon = createIconsaxIcon(CloseCircle);

function persian(value: string | number) {
  return toPersianDigits(value);
}

function StatusBadge({ status }: { status: AdminUserStatus }) {
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
  onView: (row: AdminUserRow) => void;
  onToggleStatus: (row: AdminUserRow) => void;
}): Column<AdminUserRow>[] {
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
              label: "مشاهده اطلاعات کاربر",
              icon: EyeIcon,
              onClick: () => handlers.onView(row),
            },
            {
              label:
                row.status === "فعال"
                  ? "غیر فعال کردن"
                  : "فعال کردن",
              icon: CloseCircleIcon,
              onClick: () => handlers.onToggleStatus(row),
            },
          ]}
        />
      ),
    },
  ];
}

type Props = {
  users?: AdminUser[];
};

export function ManageUsersContent({ users = MOCK_ADMIN_USERS }: Props) {
  const [items, setItems] = useState(users);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterValues>(DEFAULT_FILTERS);
  const [viewTarget, setViewTarget] = useState<AdminUser | null>(null);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((user) => {
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
  }, [appliedFilters, items, search]);

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

  const tableRows: AdminUserRow[] = paginatedItems.map((user, index) => ({
    ...user,
    radif: (currentPage - 1) * pageSize + index + 1,
  }));

  const handleToggleStatus = (row: AdminUserRow) => {
    setItems((prev) =>
      prev.map((user) =>
        user.id === row.id
          ? {
              ...user,
              status: user.status === "فعال" ? "غیر فعال" : "فعال",
            }
          : user,
      ),
    );
  };

  const columns = useMemo(
    () =>
      buildColumns({
        onView: setViewTarget,
        onToggleStatus: handleToggleStatus,
      }),
    [],
  );

  return (
    <div className="flex w-full flex-col gap-12">
      <PageToolbar
        search={
          <FloatingLabelSearch
            id="admin-user-search"
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

      <UserViewModal user={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  );
}
