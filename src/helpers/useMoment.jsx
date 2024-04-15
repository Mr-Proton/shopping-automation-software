import moment from "moment/moment"

export const getCurrentTime = (format) => {
    return moment().format(format)
}