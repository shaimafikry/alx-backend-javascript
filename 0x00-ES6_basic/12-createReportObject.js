export default function createReportObject(employeesList) {
  const data = {
    allEmployees: { ...employeesList },
    getNumberOfDepartments() { return Object.keys(this.allEmployees).length; },
  };
  return data;
}
