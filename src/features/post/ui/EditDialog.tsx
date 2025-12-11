import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useEditDialog } from "../lib/useEditDialog"
import EditForm from "./EditForm"

const EditDialog = () => {
  const { isOpen, post, resetDialog, handleUpdate } = useEditDialog()

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        {post && <EditForm post={post} handleUpdate={handleUpdate} />}
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog
