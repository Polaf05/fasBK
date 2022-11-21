import { Pagination, Select, Tabs } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import Link from "next/link";
import React, { useState } from "react"
//import { downloadExcel } from "../../lib/functions";
import { disposalColumn } from "../../lib/table";
import { disposeTMP } from "../../pages/transactions/disposal";
//import { ExcelExportType } from "../../types/employee";
import FilterPopOver from "../atoms/popover/FilterPopOver";
import PaginationPopOver from "../atoms/popover/PaginationPopOver";
import DisposalTable from "../atoms/table/DisposalTable";
import Modal from "../headless/modal/modal";
type SearchType = {
    value: string
    label: string
}

const Search = (props: { data: SearchType[] }) => {
    const [value, setValue] = useState<string | null>(null)
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
    )
}


const Dispose = (props: {
    total: number
    asset: disposeTMP[]
    assetPage: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    limit: number
    setLimit: React.Dispatch<React.SetStateAction<number>>
}) => {
    const [checkboxes, setCheckboxes] = useState<number[]>([])
    const [openPopover, setOpenPopover] = useState<boolean>(false)
    const [paginationPopover, setPaginationPopover] = useState<boolean>(false)
    const [filterBy, setFilterBy] = useState<string[]>(disposalColumn.map((i) => i.value))

    const [activeTab, setActiveTab] = useState<string | null>('pending');

    console.log(props.asset);

    return (
        <div className="space-y-4">
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex w-fit items-center gap-2">
                            <div className="flex-1">
                                <Search
                                    data={[
                                        ...props.asset?.map((obj) => {
                                            return {
                                                value: obj?.id.toString() ?? "",
                                                label: obj?.assetName ?? "",
                                            }
                                        }),
                                    ]}
                                />
                            </div>
                            <FilterPopOver
                                openPopover={openPopover}
                                setOpenPopover={setOpenPopover}
                                filterBy={filterBy}
                                setFilterBy={setFilterBy}
                                columns={disposalColumn}
                            />
                        </div>
                        {checkboxes.length > 0 && (
                            <button className="-md flex gap-2 p-2 text-xs font-medium  text-red-500 underline underline-offset-4 outline-none focus:outline-none">
                                {checkboxes.includes(-1)
                                    ? `Delete all record/s ( ${props.asset.length} ) ?`
                                    : `Delete selected record/s ( ${checkboxes.length} )`}
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="-md flex gap-2 bg-tangerine-500 py-2 px-4 text-xs rounded-md text-neutral-50 outline-none hover:bg-tangerine-600 focus:outline-none"
                        >
                            <i className="fa-solid fa-print text-xs" />
                            Generate CVs
                        </button>
                        <Link href={"/transactions/disposal/create"}>
                            <div className="flex cursor-pointer gap-2 rounded-md border-2 border-tangerine-500 py-2 px-4 text-center text-xs font-medium text-tangerine-600 outline-none hover:bg-tangerine-200 focus:outline-none">

                                <i className="fa-regular fa-plus text-xs" />
                                <p>Add New</p>

                            </div>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-md drop-shadow-lg w-full">
                    <div className="px-4">
                        <Tabs value={activeTab} onTabChange={setActiveTab} color="yellow">
                            <Tabs.List>
                                <Tabs.Tab value="pending"><div className="w-full flex flex-row"><p className={"text-lg uppercase py-2 px-4 " + `${activeTab === 'pending' ? "text-tangerine-500 font-semibold" : "text-[#8F8F8F] font-semibold "}`}>Pending</p> <div><p className="text-white rounded-full px-2 py-0.5 bg-tangerine-500">1</p></div></div></Tabs.Tab>
                                <Tabs.Tab value="approved"><div className="w-full flex flex-row"><p className={"text-lg uppercase py-2 px-4 " + `${activeTab === 'approved' ? "text-tangerine-500 font-semibold" : "text-[#8F8F8F] font-semibold "}`}>Approved</p> <div><p className="text-white rounded-full px-2 py-0.5 bg-tangerine-500">1</p></div></div></Tabs.Tab>
                                <Tabs.Tab value="rejected"><div className="w-full flex flex-row"><p className={"text-lg uppercase py-2 px-4 " + `${activeTab === 'rejected' ? "text-tangerine-500 font-semibold" : "text-[#8F8F8F] font-semibold "}`}>Rejected</p> <div><p className="text-white rounded-full px-2 py-0.5 bg-tangerine-500">1</p></div></div></Tabs.Tab>
                                <Tabs.Tab value="cancelled"><div className="w-full flex flex-row"><p className={"text-lg uppercase py-2 px-4 " + `${activeTab === 'cancelled' ? "text-tangerine-500 font-semibold" : "text-[#8F8F8F] font-semibold "}`}>Cancelled</p> <div><p className="text-white rounded-full px-2 py-0.5 bg-tangerine-500">1</p></div></div></Tabs.Tab>
                            </Tabs.List>
                        </Tabs>
                        <div className="py-4">
                            <DisposalTable
                                checkboxes={checkboxes}
                                setCheckboxes={setCheckboxes}
                                rows={props.asset}
                                filterBy={filterBy}
                                columns={disposalColumn.filter((col) => filterBy.includes(col.value))}
                            // status={activeTab ?? "pending"}
                            />
                        </div>
                    </div>
                </div>

                {/* <EmployeeTable
                    checkboxes={checkboxes}
                    setCheckboxes={setCheckboxes}
                    rows={props.employees}
                    filterBy={filterBy}
                    columns={disposalColumn.filter((col) => filterBy.includes(col.value))}
                /> */}
            </section>
            <section className="mt-8 flex justify-between px-4">
                <div className="flex items-center gap-2">
                    <p>Showing </p>
                    <PaginationPopOver
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
                    total={props.assetPage}
                    classNames={{
                        item: "bg-transparent selected-page:bg-tangerine-500 border-none",
                    }}
                />
            </section>
        </div>
    )

}

export default Dispose




