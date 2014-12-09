Package.describe({
  name: 'csv-storage',
  summary: 'Read and write csv files',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('csv-storage.js');
  api.export('CsvStorage', 'server');
});
