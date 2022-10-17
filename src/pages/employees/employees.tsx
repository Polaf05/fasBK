import React, { useState } from "react"
import { Select, Popover, Checkbox, Loader, Pagination, Image, Text } from "@mantine/core"
import EmployeeTable from "../../components/atoms/table/EmployeeTable"
import { EmployeeType } from "../../types/assets"
import { columns } from "../../lib/employeeTable"
import { ImageJSON } from "../../types/table"
import Modal from "../../components/headless/modal/modal"
import { CreateEmployeeModal } from "../../components/employee/createEmployee"
import { downloadExcel } from "../../lib/functions"

type SearchType = {
  value: string
  label: string
}

const Search = (props: { data: SearchType[] }) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select
      value={value}
      placeholder="Search"
      searchable
      nothingFound={`Cannot find option`}
      onChange={setValue}
      clearable
      data={[...props.data]}
      icon={<i className="fa-solid fa-magnifying-glass text-xs"></i>}
    />
  );
};

const showAssetsBy = [5, 10, 20, 50];

const FilterPopover = (props: {
  openPopover: boolean;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  filterBy: string[];
  setFilterBy: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <Popover
      opened={props.openPopover}
      onClose={() => props.setOpenPopover(false)}
      trapFocus={false}
      position="bottom"
      zIndex={20}
      classNames={{
        dropdown: "p-0 w-80 -md-lg",
      }}
    >
      <Popover.Target>
        <button
          onClick={() => {
            props.setOpenPopover(!props.openPopover);
          }}
          className="group flex w-7 gap-2 -md bg-tangerine-500 p-2 text-xs  text-neutral-50 outline-none transition-width duration-200 hover:w-16 hover:bg-tangerine-400 focus:outline-none"
        >
          <i className="fa-regular fa-bars-filter text-xs" />
          <span className="invisible group-hover:visible">Filter</span>
        </button>
      </Popover.Target>{" "}
      <Popover.Dropdown>
        <div className="h-2 -t-md bg-gradient-to-r from-tangerine-500 via-tangerine-300 to-tangerine-500"></div>
        <div className="px-4 py-2">
          <Checkbox.Group
            orientation="vertical"
            description="Filter by"
            value={props.filterBy}
            onChange={props.setFilterBy}
          >
            <div className="grid grid-cols-2 gap-2">
              {columns.map((col) => (
                <Checkbox
                  color={"orange"}
                  key={col.name}
                  disabled={
                    props.filterBy.length === 1 &&
                      props.filterBy.includes(col.value)
                      ? true
                      : false
                  }
                  value={col.value}
                  label={col.name}
                  classNames={{
                    input:
                      "border-2 border-neutral-400 checked:bg-tangerine-500 checked:bg-tangerine-500 focus:outline-none outline-none",
                  }}
                />
              ))}
            </div>
          </Checkbox.Group>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

const PaginationPopover = (props: {
  paginationPopover: boolean;
  setPaginationPopover: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Popover
      opened={props.paginationPopover}
      onClose={() => props.setPaginationPopover(false)}
      trapFocus={false}
      position="top"
      zIndex={10}
      classNames={{
        dropdown: "p-0 -md-lg",
      }}
    >
      <Popover.Target>
        <button
          onClick={() => {
            props.setPaginationPopover(!props.paginationPopover);
          }}
          className="flex items-center justify-center gap-2 -lg bg-gradient-to-r from-tangerine-300 to-tangerine-500 py-1 px-3 text-neutral-50"
        >
          <p className="font-medium">{props.limit}</p>
          <i className="fa-regular fa-chevron-down" />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="h-2 -t-md bg-gradient-to-r from-tangerine-500 via-tangerine-300 to-tangerine-500"></div>
        <ul className="px-4 py-2">
          {showAssetsBy.map((i) => (
            <li
              key={i}
              className="cursor-pointer hover:bg-tangerine-50"
              onClick={() => {
                props.setLimit(i);
                props.setPage(1);
              }}
            >
              {i}
            </li>
          ))}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
};

const DisplayEmployees = (props: {
  total: number;
  employees: EmployeeType[];
  employeePage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [checkboxes, setCheckboxes] = useState<number[]>([])
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [paginationPopover, setPaginationPopover] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string[]>([
    ...columns.map((i) => i.value),
  ]);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const value = (new Date())
  const [image, setImage] = useState<ImageJSON>({
    name: "",
    size: 0,
    file: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <div>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex w-fit items-center gap-2">
              <div className="flex-1">
                <Search
                  data={[
                    ...props.employees?.map((obj) => {
                      return {
                        value: obj.id.toString(),
                        label: obj.name.toString(),
                      };
                    }),
                  ]}
                />
              </div>
              <FilterPopover
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>
            {checkboxes.length > 0 && (
              <button className="flex gap-2 -md p-2 text-xs font-medium  text-red-500 underline underline-offset-4 outline-none focus:outline-none">
                {checkboxes.includes(-1)
                  ? `Delete all record/s ( ${props.employees.length} ) ?`
                  : `Delete selected record/s ( ${checkboxes.length} )`}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { downloadExcel(props.employees) }}
              className="flex gap-2 -md bg-tangerine-500 py-2 px-4 text-xs text-neutral-50 outline-none hover:bg-tangerine-600 focus:outline-none">
              <i className="fa-solid fa-print text-xs" />
              Generate CVs
            </button>
            <button
              onClick={() => {
                setIsVisible(true)
              }}
              className="flex gap-2 -md border-2 border-tangerine-500 py-2 px-4 text-center text-xs font-medium text-tangerine-600 outline-none hover:bg-tangerine-200 focus:outline-none"
            >
              <i className="fa-regular fa-plus text-xs" />
              Add New
            </button>
          </div>
        </div>

        <EmployeeTable
          checkboxes={checkboxes}
          setCheckboxes={setCheckboxes}
          rows={props.employees}
          filterBy={filterBy}
          columns={columns.filter((col) => filterBy.includes(col.value))}
        />
      </section>
      <section className="mt-8 flex justify-between px-4">
        <div className="flex items-center gap-2">
          <p>Showing </p>
          <PaginationPopover
            paginationPopover={paginationPopover}
            setPaginationPopover={setPaginationPopover}
            page={props.page}
            setPage={props.setPage}
            limit={props.limit}
            setLimit={props.setLimit}
          />
          <p> of {props.total ?? 0} entries</p>
        </div>
        <Pagination
          page={props.page}
          onChange={props.setPage}
          total={props.employeePage}
          classNames={{
            item: "bg-transparent selected-page:bg-tangerine-500 border-none",
          }}
        />

      </section>

      <Modal
        title="Add New Employee"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        className="max-w-4xl"
      >
        <CreateEmployeeModal value={value} setImage={setImage} image={image} setIsLoading={setIsLoading} isLoading={isLoading} />
      </Modal>
    </div>
  )
}

export default DisplayEmployees
