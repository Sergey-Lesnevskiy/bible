function isNetworkError(error: any): boolean {
  if (!error) return false;

  const msg = error.message || '';
  const code = error.code || '';

  return (
    code === 'unavailable' || // Firestore
    code === 'NETWORK_ERROR' || // RTDB
    code === 'auth/network-request-failed' || // Auth
    msg.includes('Failed to fetch') ||
    msg.includes('Network Error') ||
    !navigator.onLine
  );
}

export { isNetworkError };
