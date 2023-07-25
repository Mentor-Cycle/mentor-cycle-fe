type IError = { [K: string]: unknown };

export function logError(error: IError) {
  const errorEntries = Object.entries(error);
  errorEntries.forEach(([errorName, error]) => {
    if (!error) return;
    if (process.env.NODE_ENV === "development") {
      console.log(errorName, error);
    }
  });
}
