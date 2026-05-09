declare global {
  interface Window {
    handleContactEdit?: (id: number) => void
    handleContactDelete?: (id: number) => void
    handleInteractionEdit?: (id: number) => void
    handleInteractionDelete?: (id: number) => void
    handleOrderView?: (id: number) => void
    handleView?: (id: number) => void
    handleEdit?: (id: number) => void
    handleDelete?: (id: number) => void
  }
}

export {}
