const logger = require('./utils/logger');

// ...existing code...

// Example of improved logging
logger.debug('Debugging information', { additional: 'context' });
logger.info('Informational message');
logger.warn('Warning message');
logger.error('Error message', { error: new Error('Something went wrong') });

// ...existing code...
