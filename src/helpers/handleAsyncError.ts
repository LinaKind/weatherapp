export const handleAsyncError = (error: any) => {
  const additionalErrorMessage = "Failed to do something";
  error instanceof Error
    ? console.log("Network error:", error.message)
    : console.log(additionalErrorMessage);
};
