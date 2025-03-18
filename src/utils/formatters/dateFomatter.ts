export function dateFormatter(date: Date | string | undefined) {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } else if (typeof date === 'string') {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
      }
      return date;
    } else {
      return '';
    }
}
