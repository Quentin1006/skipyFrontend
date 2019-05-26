import { 
    formatDistance 
} from "date-fns";


export const timeDistance = (date, addSuffix=true) => {
    const now = Date.now();
    return formatDistance(date, now, {
        addSuffix
    })
} 
