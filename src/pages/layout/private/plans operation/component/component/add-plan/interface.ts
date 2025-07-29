// Common type for simple label-value pairs
export interface DetailItemProps {
label: string;
    value: string | number;
    highlight?: boolean;
}

export interface DateItemProps {
    label: string;
    date: string | Date;
}

export interface Facility {
    id: number | string;
    facilityName: string;
    price: number;
}

export interface FacilitySectionProps {
    title: string;
    facilities: Facility[];
}

export interface ChevronIconProps {
    isExpanded: boolean;
}
