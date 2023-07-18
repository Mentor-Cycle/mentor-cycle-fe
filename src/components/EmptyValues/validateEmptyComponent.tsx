import { IUserSession } from "types/user.types";
import MentorDashboard from "./MentorDashboard";
import StudentDashboard from "./StudentDashboard";
import { TGET_EVENTS_queryResponseSchema as IEvents } from "services/apollo/queries/queries-properties";
import { IStatusOption } from "types/dashboard.types";
import { OptionStatus } from "schemas/create_event_output";

export type EmptyValueProps = {
  user?: IUserSession;
  statusOptions: IStatusOption[];
  selectedFilter: OptionStatus | "";
  data?: IEvents | null;
};

const validateEmptyComponent = ({
  user,
  statusOptions,
  selectedFilter,
  data,
}: EmptyValueProps) => {
  if (user?.isMentor) {
    return (
      <MentorDashboard
        statusOptions={statusOptions}
        selectedFilter={selectedFilter}
        data={data}
      />
    );
  } else {
    return (
      <StudentDashboard
        statusOptions={statusOptions}
        selectedFilter={selectedFilter}
        data={data}
      />
    );
  }
};

export default validateEmptyComponent;
