export default function renderStorage({ hdd, ssd }) {
    if (hdd && ssd)
        return `${hdd} HDD + ${ssd} SSD`
    else if (hdd)
        return `${hdd} HDD`
    else
        return `${ssd} SSD`
}