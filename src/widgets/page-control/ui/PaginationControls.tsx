import LimitSelect from "../../../features/limit/ui/LimitSelect"
import Pagination from "../../../features/skip/ui/Pagination"

const PaginationControls = ({ total }: { total: number }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <LimitSelect />
        <span>항목</span>
      </div>
      <Pagination total={total} />
    </div>
  )
}

export default PaginationControls
