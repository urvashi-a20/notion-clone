import {create} from "zustand";

type ConverImageStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCoverImage = 
create<ConverImageStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));