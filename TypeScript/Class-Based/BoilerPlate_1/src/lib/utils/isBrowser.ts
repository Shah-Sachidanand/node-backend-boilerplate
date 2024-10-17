const isBrowser = (userAgent: string) => {
  return /Mozilla|Chrome|Safari|Firefox/i.test(userAgent);
};
export default isBrowser;
