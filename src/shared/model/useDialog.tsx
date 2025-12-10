import { create } from "zustand/react"

interface DialogContext {
  type: string | null
  id: number | null
}

interface DialogActions {
  setDialog: (dialog: DialogContext) => void
  resetDialog: () => void
}

interface DialogState {
  context: DialogContext
  actions: DialogActions
}

const initialContext: DialogContext = {
  type: null,
  id: null,
}

const useDialog = create<DialogState>((set) => ({
  context: {
    ...initialContext,
  },
  actions: {
    setDialog: (dialog) => set({ context: dialog }),
    resetDialog: () => set({ context: { ...initialContext } }),
  },
}))

export const useDialogContext = () => useDialog(({ context }) => context)
export const useDialogActions = () => useDialog(({ actions }) => actions)
