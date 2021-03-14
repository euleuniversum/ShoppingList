import { ModalStore } from "../modal/types";
import {PurchasesStore} from "../purchases/types";

export interface RootStore {
    purchases: PurchasesStore,
    modal: ModalStore
}