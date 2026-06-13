"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { CloseCircle, Eye } from "iconsax-reactjs";
import { Plus, Search } from "lucide-react";

import {
  FloatingLabelSearch,
  Table,
  TableRowActionsMenu,
  type Column,
} from "@admin-kit/index";
import { toPersianDigits } from "@admin-kit/shared/lib/format";
import { cn } from "@admin-kit/shared/lib/utils";

import { CapacityFormModal, type CapacityFormValues } from "./CapacityFormModal";
import { CapacitySummaryBar } from "./CapacitySummaryBar";
import {
  MOCK_CAPACITY_ROWS,
  type CapacityRow,
} from "./mockCapacityData";

function createIconsaxIcon(
  Icon: ComponentType<{
    className?: string;
    variant?: "Outline";
    color?: string;
    size?: string | number;
  }>,
) {
  return function IconsaxMenuIcon({ className }: { className?: string }) {
    return (
      <Icon variant="Outline" className={className} color="currentColor" size={16} />
    );
  };
}

const EyeIcon = createIconsaxIcon(Eye);
const CloseCircleIcon = createIconsaxIcon(CloseCircle);

type TableRow = CapacityRow & { radif: number };

function buildColumns(handlers: {
  onEdit: (row: TableRow) => void;
  onDelete: (row: TableRow) => void;
}): Column<TableRow>[] {
  return [
    {
      key: "radif",
      header: "ردیف",
      colClassName: "text-center",
      cell: (row) => toPersianDigits(row.radif),
    },
    {
      key: "className",
      header: "کلاس",
      colClassName: "text-center",
      cell: (row) => toPersianDigits(row.className),
    },
    {
      key: "capacity",
      header: "  ظرفیت کلاس",
      colClassName: "text-center",
      cell: (row) => toPersianDigits(row.capacity),
    },
    {
      key: "gender",
      header: "جنسیت",
      colClassName: "text-center",
      cell: (row) => row.gender,
    },
    {
      key: "reservationKind",
      header: "نوع رزرو",
      colClassName: "text-center",
      cell: (row) => row.reservationKind,
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
              label: "ویرایش جزئیات",
              icon: EyeIcon,
              onClick: () => handlers.onEdit(row),
            },
            {
              label: "حذف",
              icon: CloseCircleIcon,
              onClick: () => handlers.onDelete(row),
            },
          ]}
        />
      ),
    },
  ];
}

export function CapacityManagementTab() {
  const [rows, setRows] = useState(MOCK_CAPACITY_ROWS);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CapacityRow | null>(null);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter(
      (row) =>
        row.className.includes(query) ||
        row.gender.includes(query) ||
        row.reservationKind.includes(query),
    );
  }, [rows, search]);

  const tableRows: TableRow[] = filteredRows.map((row, index) => ({
    ...row,
    radif: index + 1,
  }));

  const columns = useMemo(
    () =>
      buildColumns({
        onEdit: setEditTarget,
        onDelete: (row) =>
          setRows((prev) => prev.filter((item) => item.id !== row.id)),
      }),
    [],
  );

  const handleAdd = (values: CapacityFormValues) => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        className: values.classLevel || values.classLabel,
        capacity: Number(values.capacity) || 0,
        gender: values.gender,
        reservationKind: "کاروان",
      },
    ]);
  };

  const handleEdit = (values: CapacityFormValues) => {
    if (!editTarget) return;
    setRows((prev) =>
      prev.map((row) =>
        row.id === editTarget.id
          ? {
              ...row,
              className: values.classLevel,
              capacity: Number(values.capacity) || row.capacity,
              gender: values.gender,
            }
          : row,
      ),
    );
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <CapacitySummaryBar />

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch">
        <FloatingLabelSearch
          id="capacity-search"
          label="جستجو"
          value={search}
          onChange={setSearch}
          icon={<Search className="size-5" aria-hidden />}
          containerClassName="min-w-0 flex-[2] shadow-sm shadow-gray-300 border-white"
        />

        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#175E47] text-sm font-semibold text-white transition-colors hover:bg-[#1F7E5F]"
        >
          <Plus className="size-5" aria-hidden />
          افزودن ظرفیت
        </button>
      </div>

      <Table data={tableRows} columns={columns} size="lg" className="w-full" />

      <CapacityFormModal
        mode="add"
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      <CapacityFormModal
        mode="edit"
        open={Boolean(editTarget)}
        row={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEdit}
      />
    </div>
  );
}
