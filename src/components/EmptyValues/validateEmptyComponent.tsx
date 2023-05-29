import MentorDashboard from "./MentorDashboard";
import StudentDashboard from "./StudentDashboard";

type User = {
  isMentor: boolean;
};

export type EmptyValueProps = {
  user?: User;
  statusOptions: { value: string; label: string }[];
  selectedFilter: string;
  data?: any;
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
