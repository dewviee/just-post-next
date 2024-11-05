import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(buddhistEra);
dayjs.extend(timezone);

const dayjsEx = dayjs;

export default dayjsEx;
