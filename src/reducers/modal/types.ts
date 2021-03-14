export type ModalState = 'create' | 'edit' | 'hide';

export interface ModalStore {
    state: ModalState
}